# Transaction process

Following the above rules, assemble JSON content. For example, the content for a transfer is as follows:

```
{"p":"asc-20","op":"transfer","tick":"avav","amt":"69696969"}
```

After adding the prefix:

```
data:,{"p":"asc-20","op":"transfer","tick":"avav","amt":"69696969"}
```

After converting it to hexadecimal:

```
646174613a2c7b2270223a226173632d3230222c226f70223a227472616e73666572222c227469636b223a2261766176222c22616d74223a223639363936393639227d
```

Finally, send this hexadecimal data as the transaction's data.\
\
Here is an example JavaScript code:

<pre class="language-javascript"><code class="lang-javascript">// Transfer data
<strong>const transfer = { 
</strong>  p: 'asc-20',
  op: 'transfer',
  tick: 'avav',
  amt: '69696969'
};
// Add the prefix
const asc20Data = 'data:,' + JSON.stringify(transfer);
// Convert to hexadecimal
const uint8Array = new TextEncoder().encode(asc20Data);
const hexData = Array.from(uint8Array).map(byte => byte.toString(16)).join('');

// Example code for sending a transaction
const transaction = {
  from: 'sender_address', // Replace with the actual sender address
  to: 'recipient_address', // Replace with the actual recipient address
  value: 0,
  gas: 'gas_amount', // Replace with the actual gas amount
  gasPrice: 'gas_price', // Replace with the actual gas price
  data: '0x' + hexData // Add hexadecimal data as the transaction's data
};

// Transaction sending logic, this is just an example, actual implementation may depend on the blockchain library or tool used
web3.eth.sendTransaction(transaction, (error, hash) => {
   if (!error) {
     console.log('Transaction hash:', hash);
   } else {
     console.error('Transaction error:', error);
   }
});
</code></pre>
