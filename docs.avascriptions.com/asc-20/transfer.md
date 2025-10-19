# Transfer

```
{ 
  "p": "asc-20",
  "op": "transfer",
  "tick": "avav",
  "amt": "69696969"
}
```

<table><thead><tr><th width="99">Key</th><th width="127">Required?</th><th>Description</th></tr></thead><tbody><tr><td>p</td><td>Yes</td><td>Protocol: Helps other systems identify and process asc-20 events</td></tr><tr><td>op</td><td>Yes</td><td>Operation: Type of event (Deploy, Mint, Transfer,List)</td></tr><tr><td>tick</td><td>Yes</td><td>Ticker: Identifier of the asc-20</td></tr><tr><td>amt</td><td>Yes</td><td>Amount to transfer: States the amount of the asc-20 to transfer.</td></tr></tbody></table>

Initiate a transaction with the above rules as data, and the to address of the transaction will be the recipient of asc20 tokens.
