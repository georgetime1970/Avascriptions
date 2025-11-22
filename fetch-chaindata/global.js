import dotenv from 'dotenv' // 用于加载环境变量
import mongoose from 'mongoose' // MongoDB 的对象建模工具
import axios from 'axios' // HTTP 请求库

axios.defaults.timeout = 5000 // 设置全局的 HTTP 请求超时时间为 5 秒

const config = dotenv.config().parsed // 加载 .env 文件中的环境变量

const { model, Schema } = mongoose // 从 mongoose 中解构出 model 和 Schema，用于定义数据模型

// 定义交易数据的 Schema
// 用于存储区块链中的交易数据,每条记录代表一笔链上的交易，包含交易的详细信息。
const TransactionSchema = new Schema({
  id: {
    type: String,
    unique: true, // 唯一索引，确保每个交易的 id 唯一
  },
  from: String, // 交易发起地址
  to: String, // 交易接收地址
  block: {
    // 交易所在的区块号
    type: Number,
    index: true, // 为 block 字段创建索引，加速查询
  },
  idx: Number, // 交易在区块中的索引
  timestamp: Number, // 交易的时间戳
  input: String, // 交易的输入数据,这里就是铭文的内容
})

/**
示例交易数据：
 {
    _id: ObjectId('68f499cc20caa5bd2df4e2c6'),
    id: '0x7ffc56b2bf20f4f3474c1fd503fc3f1fb9066c8b0665d6da11185cac892108a5',
    from: '0xe0eccfe34c367cbe0b6b261011b6781229942552',
    to: '0xe0eccfe34c367cbe0b6b261011b6781229942552',
    block: 31918263,
    idx: 8,
    timestamp: 1687969025,
    input: '0x646174613a2c7b2270223a226173632d3230222c226f70223a226465706c6f79222c227469636b223a2261766173222c226d6178223a223231303030303030222c226c696d223a2231303030227d',
    __v: 0
  }

  这里的 input 字段存储了交易的输入数据，通常是以十六进制字符串形式表示的。
  解码后是: data:,{"p":"asc-20","op":"deploy","tick":"avas","max":"21000000","lim":"1000"}
  表示该交易是一个 ASC-20 代币的部署操作，代币符号为 "avas"，最大供应量为 21,000,000，初始流通量为 1,000。
 */

// 定义 EVM 日志数据的 Schema
// 用于记录和查询链上合约触发的事件,可能用于监听特定事件（如代币转账、合约调用）并进行进一步处理。每条记录代表一个日志事件，包含日志的详细信息。
const EvmlogSchema = new Schema({
  hash: String, // 交易哈希
  address: String, // 合约地址
  topics: [String], // 日志主题数组
  data: String, // 日志数据
  block: {
    type: Number,
    index: true, // 为 block 字段创建索引
  },
  trxIndex: Number, // 交易索引
  logIndex: Number, // 日志索引
  timestamp: Number, // 日志的时间戳
})

// 定义状态数据的 Schema
// 用于断点续跑功能,存储程序的运行状态,主要用于记录程序当前处理到的区块高度
const StatusSchema = new Schema({
  block: Number, // 当前处理到的区块高度
})
/**
 * 示例状态数据：
  {
    _id: ObjectId('68f499c920caa5bd2df4e2be'),
    block: 31918328,
    __v: 0
  }
  这里的 block 字段表示程序当前已经处理到的区块高度，可以用于在程序重启后继续从该区块开始处理，避免重复处理已经处理过的区块数据。
 */

// 创建模型，用于操作 MongoDB 中的集合
const Transaction = model('transaction', TransactionSchema, 'transactions') // 交易集合
const Evmlog = model('evmlog', EvmlogSchema, 'evmlogs') // 日志集合
const Status = model('status', StatusSchema, 'status') // 状态集合

// 连接 MongoDB 数据库
const connectMongo = async () => {
  await mongoose.connect(config.MONGO_DSN) // 使用配置中的 MongoDB 连接字符串
}

// 延迟函数，用于异步操作中的等待
const sleep = (ms) => new Promise((f) => setTimeout(f, ms))

// 获取链上最新的区块号
async function getLastBlockNumber() {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_blockNumber', // JSON-RPC 方法：获取最新区块号
    params: [],
  }
  let arc = {
    method: 'post',
    maxBodyLength: Infinity, // 设置最大请求体长度
    url: config.RPC_URL, // 使用配置中的 RPC URL
    data: data,
  }
  const response = await axios.request(arc) // 发送 HTTP 请求
  if (response.status === 200) {
    if (response.data && typeof response.data.result == 'string') {
      return parseInt(response.data.result, 16) - 2 // 返回最新区块号，减去 2 防止回滚
    }
    throw new Error('empty result') // 如果结果为空，抛出错误
  } else {
    throw new Error('getLastBlockNumber error') // 请求失败时抛出错误
  }
}

// 根据区块号获取区块数据
async function getBlockByNumber(blockNumber) {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBlockByNumber', // JSON-RPC 方法：获取区块数据
    params: ['0x' + blockNumber.toString(16), true], // 参数：区块号（十六进制）和是否返回完整交易数据
  }
  let arc = {
    method: 'post',
    maxBodyLength: Infinity,
    url: config.RPC_URL,
    data: data,
  }
  const response = await axios.request(arc)
  if (response.status === 200) {
    if (response.data && response.data.result) {
      return response.data.result // 返回区块数据
    }
    throw new Error('Empty result') // 如果结果为空，抛出错误
  } else {
    throw new Error('getBlockByNumber error') // 请求失败时抛出错误
  }
}

// 获取指定区块范围内的 EVM 日志
async function getEvmLogs(fromBlock, toBlock) {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getLogs', // JSON-RPC 方法：获取日志
    params: [
      {
        fromBlock: '0x' + fromBlock.toString(16), // 起始区块号（十六进制）
        toBlock: '0x' + toBlock.toString(16), // 结束区块号（十六进制）
      },
    ],
  }
  let arc = {
    method: 'post',
    maxBodyLength: Infinity,
    url: config.RPC_URL,
    data: data,
  }
  const response = await axios.request(arc)
  if (response.status === 200) {
    if (response.data && response.data.result) {
      return response.data.result // 返回日志数据
    }
    throw new Error('Empty result') // 如果结果为空，抛出错误
  } else {
    throw new Error('getEvmLogs error') // 请求失败时抛出错误
  }
}

// 获取或初始化状态 ID
async function getStatusId() {
  let statusRow = await Status.findOne({}) // 查询状态集合中的第一条记录
  if (!statusRow) {
    let lastBlock = 0 // 默认从区块 0 开始
    const lastTrx = await Transaction.findOne({}, null, { sort: { _id: -1 } }) // 查询最新的交易记录
    if (lastTrx) {
      lastBlock = parseInt(lastTrx.block) // 更新为最新交易的区块号
    }
    const lastLog = await Evmlog.findOne({}, null, { sort: { _id: -1 } }) // 查询最新的日志记录
    if (lastLog) {
      const blockNumber = parseInt(lastLog.block)
      if (blockNumber > lastBlock) {
        lastBlock = blockNumber // 更新为最新日志的区块号
      }
    }
    const result = await Status.create([{ block: lastBlock }]) // 创建新的状态记录
    if (!result || !result.length) {
      throw new Error('insert block error') // 如果插入失败，抛出错误
    }
    statusRow = result[0] // 获取新创建的状态记录
  }
  console.log('statusId', statusRow._id, 'lastBlock', statusRow.block) // 打印状态 ID 和区块号
  return statusRow._id // 返回状态 ID
}

export { config, connectMongo, sleep, Transaction, Evmlog, Status, getLastBlockNumber, getBlockByNumber, getEvmLogs, getStatusId }
