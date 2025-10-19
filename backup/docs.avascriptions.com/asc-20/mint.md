# Mint

```
{ 
  "p": "asc-20",
  "op": "mint",
  "tick": "avav",
  "amt": "69696969"
}
```

<table><thead><tr><th width="85">Key</th><th width="126">Required?</th><th>Description</th></tr></thead><tbody><tr><td>p</td><td>Yes</td><td>Protocol: Helps other systems identify and process asc-20 events</td></tr><tr><td>op</td><td>Yes</td><td>Operation: Type of event (Deploy, Mint, Transfer,List)</td></tr><tr><td>tick</td><td>Yes</td><td>Ticker: Identifier of the asc-20</td></tr><tr><td>amt</td><td>Yes</td><td>Amount to mint: States the amount of the asc-20 to mint. Has to be less or equal to "lim" </td></tr></tbody></table>
