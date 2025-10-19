# Get  ASC-20 Holders

## Get holders by ticker

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/holders`

#### Query Parameters

| Name                                     | Type    | Description                                     |
| ---------------------------------------- | ------- | ----------------------------------------------- |
| ticker<mark style="color:red;">\*</mark> | string  | Token ticker                                    |
| page                                     | integer | Start page, default 1                           |
| limit                                    | integer | Number of holder returned, Up to 50, default 50 |

{% tabs %}
{% tab title="200: OK Successful operation" %}

```json
{
  "status": 200,
  "data": {
    "list": [
        {
           "address": "0x1ab4973a48dc892cd9971ece8e01dcc7688f8f23",
           "tick": "avav",
           "amount": "227625700239746"
        },
        {
            "address": "0xa9453b8844e407159e09a9c2dc47b8be873a6cda",
            "tick": "avav",
            "amount": "39154660836491"
        }
    ],
    "total": 77584
  }
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
