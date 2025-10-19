# Get  ASC-20 Ticker Last History

## Get the last item of ASC20.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/last`

#### Query Parameters

| Name                                     | Type   | Description  |
| ---------------------------------------- | ------ | ------------ |
| ticker<mark style="color:red;">\*</mark> | string | Token ticker |

{% tabs %}
{% tab title="200: OK Successful operation" %}

```json
{
    "status": 200,
    "data": {
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
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
