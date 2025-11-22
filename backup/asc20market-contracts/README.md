# ASC20 Marketplace Contracts

## Overview

ASC20 Marketplace Smart Contracts. Check out our [documents](https://docs.avascriptions.com/) for more information.

## Security and Liability

All contracts are WITHOUT ANY WARRANTY, without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

## Usage

### Install

```bash
npm i
```

### Compile

```bash
npx hardhat compile
```

### Deploy

```bash
npx hardhat --network avax run scripts/deploy.ts
```

---

## 补充

### 文件夹作用

`asc20market-contracts` 文件夹主要用于开发和管理 ASC20 Marketplace 的智能合约。它包括：

1. **智能合约**：位于 `contracts/` 文件夹中，定义了 ASC20 Marketplace 的核心逻辑。
2. **接口**：位于 `contracts/interfaces/`，定义了智能合约的接口规范。
3. **库**：位于 `contracts/lib/`，包含了智能合约中使用的辅助工具或数据结构。
4. **脚本**：位于 `scripts/`，用于部署和升级智能合约。
5. **配置文件**：如 `hardhat.config.ts` 和 `tsconfig.json`，用于配置 Hardhat 和 TypeScript。

### 核心功能

1. **订单匹配与执行**：

   - 支持单个订单的执行（`executeOrder`）。
   - 支持批量订单匹配（`batchMatchOrders`），允许用户一次性处理多个订单。

2. **订单取消**：

   - 用户可以取消单个订单（`cancelOrder`）。
   - 支持批量取消多个订单（`cancelOrders`）。

3. **订单验证**：

   - 验证订单的有效性，包括签名验证、时间戳检查、订单状态等（`_verifyOrder` 和 `_verifyOrderHash`）。

4. **资金管理**：

   - 处理订单的资金转移，包括支付卖家、扣除协议费用等（`_transferEths`）。
   - 支持合约所有者提取合约中的 ETH 或意外接收的 ERC20 代币（`withdrawETH` 和 `withdrawUnexpectedERC20`）。

5. **批量操作**：

   - 提供批量订单处理功能（`batchMatchOrders`），但需要管理员启用。

6. **安全性**：
   - 使用了 OpenZeppelin 的模块（如 `ReentrancyGuardUpgradeable` 和 `PausableUpgradeable`）来防止重入攻击和支持合约暂停功能。

### 事件

- `ASC20OrderExecuted`：记录订单的执行信息。
- `ASC20OrderCanceled`：记录订单的取消信息。
- `avascriptions_protocol_TransferASC20TokenForListing`：记录 ASC20 代币的转移。

### 管理员功能

- 更新可信验证者地址（`updateTrustedVerifier`）。
- 启用或禁用批量订单处理（`updateAllowBatch`）。
- 提取合约中的资金或意外接收的代币。

### 使用场景

该合约适用于去中心化的 ASC20 代币交易市场，用户可以通过提交订单来买卖 ASC20 代币，管理员可以管理市场的运行状态和资金。

### 使用方法

以下是如何使用该文件夹的步骤：

#### 1. 安装依赖

在文件夹根目录下运行以下命令安装所需的依赖：

```bash
npm install
```

#### 2. 编译智能合约

使用 Hardhat 编译智能合约：

```bash
npx hardhat compile
```

#### 3. 部署智能合约

运行以下命令部署智能合约到指定网络（例如 `avax` 网络）：

```bash
npx hardhat --network avax run scripts/deploy.ts
```

#### 4. 升级智能合约

如果需要升级智能合约，可以运行以下脚本：

```bash
npx hardhat --network avax run scripts/upgrade.ts
```

### 注意事项

- **安全性**：所有合约均不提供任何形式的担保，包括适销性或特定用途的适用性。
- **文档**：更多信息可以参考 [官方文档](https://docs.avascriptions.com/)。
