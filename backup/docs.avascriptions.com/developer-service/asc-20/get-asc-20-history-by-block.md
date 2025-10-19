# Get  ASC-20 History By Block

## Get the full history of ASC20 by block.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/history-by-block`

#### Query Parameters

| Name                                    | Type    | Description                                      |
| --------------------------------------- | ------- | ------------------------------------------------ |
| ticker                                  | string  | Token ticker                                     |
| start                                   | integer | Start offset  (list.id)                          |
| limit                                   | integer | Number of history returned, Up to 50, default 50 |
| block<mark style="color:red;">\*</mark> | integer | Block Height                                     |

{% tabs %}
{% tab title="200: OK Successful operation" %}

```json
{
    "status": 200,
    "data": [
        {
            "id": 1196,
            "tick": "avav",
            "operation": "mint",
            "from": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
            "to": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
            "amount": "69696969",
            "valid": 1,
            "block": "28753000",
            "hash": "0xa64c6fac991c54a9062bae35dc2d6f6baa1f3eaafba695dc5477301c39edd108",
            "timestamp": 1703245230
        },
        {
            "id": 1130,
            "tick": "avav",
            "operation": "transfer",
            "from": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
            "to": "0xaaaaa6972e56c3c12345caaaaaabaaaaa99999100",
            "amount": "69696969",
            "valid": 1,
            "block": "28753031",
            "hash": "0xe73bd4c4ccc8bd86cbe361ff05815d077a97d7f7bcfd4f46bd46ccc20d225811",
            "timestamp": 1703218684
        },
        {
            "id": 1131,
            "tick": "avav",
            "operation": "list",
            "from": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
            "to": "0x1abc2ad33a5bc7f03c1f8cf71a94817888808008",
            "amount": "69696969",
            "valid": 1,
            "block": "28753031",
            "hash": "0xe73bd4c4ccc8bd86cbe361ff05815d077a97d7f7bcfd4f46bd46ccc20d225811",
            "timestamp": 1703238684
        },
        {
            "id": 1132,
            "tick": "avav",
            "operation": "exchange",
            "from": "0x1abc2ad33a5bc7f03c1f8cf71a94817888808008",
            "to": "0xbbbbb6972e56c12345caaaaaabbbbbbb88888888",
            "amount": "69696969",
            "valid": 1,
            "block": "28753032",
            "hash": "0x82bba1d6df3959c91643c16af786208b70ac43932f95218e2e82d2b6a9eeb35a",
            "timestamp": 1703248777
        }
    ]
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
