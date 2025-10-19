# ASIP-1: Smart Contract Avascription ASC-20 Transfers

### Specification

Incorporate one new smart contract event into the Avascriptions Protocol:

```solidity
event avascriptions_protocol_TransferASC20Token(
    address indexed from,
    address indexed to,
    string indexed ticker,
    uint256 amount
)
```

Event signature:

```solidity
// "0x8cdf9e10a7b20e7a9c4e778fc3eb28f2766e438a9856a62eac39fbd2be98cbc2"
keccak256("avascriptions_protocol_TransferASC20Token(address,address,string,uint256)")
```

When a contract emits the avascriptions\_protocol\_TransferASC20Token event, it signifies that the protocol is registering a valid ASC-20 token transfer from the emitting contract to the recipient. This transfer is valid if the emitting contract possesses a sufficient number of corresponding tokens at the time of emitting the event, and the event is emitted in block number 38896000 or a later block.

In the case of multiple valid events, they should be sequentially processed based on their log index. Additionally, if the input data of the transaction also represents a valid transfer, this transfer will take precedence and be processed before any event-based transfers.

### Rationale

ASC-20 Tokens are transferable to any address, enabling their ownership by smart contracts. However, the current limitation exists wherein smart contracts are unable to directly transfer or create these avascriptions themselves. This restriction hampers the development of protocol dApps relying on smart contracts, such as marketplaces.&#x20;

To address this, the proposal outlines a direct and cost-effective mechanism that enables smart contracts to carry out ASC-20 token transfers.

{% hint style="info" %} <mark style="color:red;">Important note:</mark> ticker must be converted to lowercase or the indexer will not recognize it!
{% endhint %}

####
