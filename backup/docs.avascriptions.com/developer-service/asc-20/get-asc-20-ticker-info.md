# Get  ASC-20 Ticker Info

## Get ticker info.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/asc20/info`

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
        "id": "0x3fcf9252b5b0b940080f4f318208221e34691340f0a9a53d1b107b0a61b0cf10",
        "tick": "avav",
        "max": "1463636349000000",
        "minted": "1463636349000000",
        "limit": "69696969",
        "precision": 0,
        "deployBy": "0x364af27a926c472cdaae251c8eedf6af7e39d234",
        "createdAt": 1700888064,
        "creator": "0x364af27a926c472cdaae251c8eedf6af7e39d234",
        "holders": 39669,
        "trxs": 21138544,
        "completedAt": 1702782070
    }
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
