// fetchData.js
// 这个文件的作用是从区块链中抓取数据（包括区块、交易和日志），并将其存储到 MongoDB 数据库中。
// 它使用了配置文件中的 RPC 接口和 MongoDB 连接字符串。
// 主要功能包括：
// 1. 从指定的区块高度开始抓取区块数据。
// 2. 解析区块中的交易和日志。
// 3. 将抓取的数据存储到 MongoDB 中。

import mongoose from 'mongoose'
import { config, sleep, Transaction, Evmlog, Status, getLastBlockNumber, getBlockByNumber, getEvmLogs, getStatusId } from './global.js' // 导入全局工具函数和模型

const inputPrefix = '0x646174613a' // 交易输入数据的前缀，用于过滤特定类型的交易
const topicTransfer = '0x8cdf9e10a7b20e7a9c4e778fc3eb28f2766e438a9856a62eac39fbd2be98cbc2' // 转账事件的主题哈希
const topicExchange = '0xe2750d6418e3719830794d3db788aa72febcd657bcd18ed8f1facdbf61a69a9a' // 交易事件的主题哈希

let fetchBlockNumber = 0 // 当前正在抓取的区块号
let lastBlockNumber = 0 // 链上最新的区块号

let statusId = '' // 状态记录的 ID

export async function fetchData() {
  const start = Date.now() // 记录开始时间

  if (statusId == '') {
    statusId = await getStatusId() // 获取或初始化状态记录的 ID
  }

  // 获取链上最新的区块号,这里只会执行一次
  if (lastBlockNumber == 0) {
    lastBlockNumber = await getLastBlockNumber()
  }

  try {
    if (fetchBlockNumber == 0) {
      const statusRow = await Status.findOne({}) // 查询状态记录
      fetchBlockNumber = statusRow.block // 从状态记录的区块号开始

      if (fetchBlockNumber == 0) {
        fetchBlockNumber = parseInt(config.FROM_LOG_BLOCK || '0') // 如果状态记录为空，从配置的起始区块号开始
        console.log('no records found in the databse, start from', fetchBlockNumber)
      } else {
        console.log('start with the latest block in the database', fetchBlockNumber)
      }
    }

    fetchBlockNumber++ // 处理下一个区块
    if (fetchBlockNumber > lastBlockNumber) {
      lastBlockNumber = await getLastBlockNumber() // 更新最新区块号
      if (fetchBlockNumber > lastBlockNumber) {
        throw new Error('block readed') // 如果超出最新区块号，抛出错误
      }
    }
    console.log('fetch at block:', fetchBlockNumber, 'newest:', lastBlockNumber)

    // 并行获取区块数据和日志数据
    const result = await new Promise((resolve, reject) => {
      const result = {
        transactions: [], // 存储交易数据
        evmLogs: [], // 存储日志数据
        timestamp: 0, // 区块时间戳
        count: 0, // 请求完成计数
      }
      getBlockByNumber(fetchBlockNumber)
        .then((block) => {
          result.timestamp = parseInt(block.timestamp) // 设置区块时间戳
          if (block.transactions && block.transactions.length > 0) {
            for (const transaction of block.transactions) {
              if (transaction.input.startsWith(inputPrefix)) {
                // 过滤特定类型的交易
                result.transactions.push({
                  id: transaction.hash, // 交易哈希
                  from: transaction.from, // 发送地址
                  to: transaction.to, // 接收地址
                  block: parseInt(transaction.blockNumber), // 区块号
                  idx: parseInt(transaction.transactionIndex), // 交易索引
                  timestamp: result.timestamp, // 时间戳
                  input: transaction.input, // 输入数据
                })
              }
            }
          }
          if (++result.count == 2) {
            resolve(result) // 如果两个请求都完成，返回结果
          }
        })
        .catch(reject)

      getEvmLogs(fetchBlockNumber, fetchBlockNumber)
        .then((txLogs) => {
          if (txLogs && txLogs.length > 0) {
            for (const tx of txLogs) {
              if (tx.topics && (tx.topics[0] == topicTransfer || tx.topics[0] == topicExchange)) {
                // 过滤特定主题的日志
                result.evmLogs.push({
                  hash: tx.transactionHash, // 交易哈希
                  address: tx.address, // 合约地址
                  topics: tx.topics, // 日志主题
                  data: tx.data, // 日志数据
                  block: parseInt(tx.blockNumber), // 区块号
                  trxIndex: parseInt(tx.transactionIndex), // 交易索引
                  logIndex: parseInt(tx.logIndex), // 日志索引
                  timestamp: 0, // 时间戳（稍后设置）
                })
              }
            }
          }
          if (++result.count == 2) {
            resolve(result) // 如果两个请求都完成，返回结果
          }
        })
        .catch(reject)
    })

    // 将数据保存到数据库
    let session = null
    try {
      session = await mongoose.startSession() // 开启 MongoDB 会话
      session.startTransaction() // 开启事务
      if (result.transactions.length > 0) {
        await Transaction.insertMany(result.transactions, { session }) // 插入交易数据
      }
      if (result.evmLogs.length > 0) {
        for (const evmLog of result.evmLogs) {
          evmLog.timestamp = result.timestamp // 设置日志的时间戳
        }
        await Evmlog.insertMany(result.evmLogs, { session }) // 插入日志数据
      }
      await Status.updateOne({ _id: statusId }, { block: fetchBlockNumber }, { session }) // 更新状态记录

      await session.commitTransaction() // 提交事务
      await session.endSession() // 结束会话
    } catch (e) {
      if (session) {
        await session.abortTransaction() // 回滚事务
        await session.endSession() // 结束会话
      }
      throw e
    }

    console.log('fetch completed,', result.transactions.length, 'trxs,', result.evmLogs.length, 'logs, cost time:', Date.now() - start, 'ms')
  } catch (error) {
    fetchBlockNumber-- // 回退区块号
    console.error('fetch error', error.message) // 打印错误信息
    await sleep(2000) // 等待 2 秒后重试
  } finally {
    fetchData() // 递归调用，继续抓取下一个区块
  }
}
