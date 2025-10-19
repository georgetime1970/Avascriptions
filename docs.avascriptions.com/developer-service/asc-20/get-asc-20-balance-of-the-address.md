# Get  ASC-20 Balance Of  The Address

## Get balance of  the address

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/balance`

#### Query Parameters

| Name                                      | Type    | Description                                    |
| ----------------------------------------- | ------- | ---------------------------------------------- |
| ticker                                    | string  | Token ticker                                   |
| address<mark style="color:red;">\*</mark> | string  | Address                                        |
| page                                      | integer | Start page, default 1                          |
| limit                                     | integer | Number of token returned, Up to 50, default 50 |

{% tabs %}
{% tab title="200: OK Successful operation" %}

```json
{
  "status": 200,
  "data": {
    "list": [
      {
        "address": "0xaaaaa6972e56c3c12345caaaaaabaaaaa9999999",
        "tick": "avav",
        "amount": "69696969"
      }
    ],
    "total": 1
  }
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
