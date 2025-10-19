# List

```
{ 
  "p": "asc-20",
  "op": "list",
  "tick": "avav",
  "amt": "69696969"
}
```

<table><thead><tr><th width="99">Key</th><th width="127">Required?</th><th>Description</th></tr></thead><tbody><tr><td>p</td><td>Yes</td><td>Protocol: Helps other systems identify and process asc-20 events</td></tr><tr><td>op</td><td>Yes</td><td>Operation: Type of event (Deploy, Mint, Transfer,List)</td></tr><tr><td>tick</td><td>Yes</td><td>Ticker: Identifier of the asc-20</td></tr><tr><td>amt</td><td>Yes</td><td>Amount to transfer: States the amount of the asc-20 to transfer.</td></tr></tbody></table>

Initiate a transaction with the above rules as data, and the to address of the transaction is the address of the exchange contract, so that the contract can process these tokens through log events.

<mark style="color:red;">In particular, if the contract does not have the ability to process these ASC-20 tokens, the ASC-20 tokens will be permanently lost.</mark>
