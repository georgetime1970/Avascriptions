# Get  ASC-20 Records By TxId

## Get ASC-20 records by transaction id.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/records-by-trxid`

#### Query Parameters

| Name                                   | Type   | Description    |
| -------------------------------------- | ------ | -------------- |
| txid<mark style="color:red;">\*</mark> | string | Transaction id |

{% tabs %}
{% tab title="200: OK Successful operation" %}

```json
{
    "status": 200,
    "data": [
        {
            "id": 1131,
            "tick": "avav",
            "operation": "transfer",
            "from": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
            "to": "0xbaaaa6972e56c3c12345caaaaaabaaaaa9999910",
            "amount": "69696969",
            "valid": 1,
            "block": "28752030",
            "hash": "0xe73bd4c4ccc8bd86cbe361ff05815d077a97d7f7bcfd4f46bd46ccc20d225811",
            "timestamp": 1703218684
        }
    ]
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}

{% hint style="info" %}
Please make sure that records's valid is 1, if it is -1 it means that the operation is not successful, it may be that the balance is not enough or other parameters are wrong.

Because some operation events (e.g., transfers) are emited by contracts, there may be multiple ASC20 records within the same transaction.
{% endhint %}
