# Get  ASC-20 Market Info

## Get ticker market info.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/market/info`

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
        "tick": "avav",
        "number": "22126343",
        "holders": "41436",
        "floorPrice": "0.00000001577228444",
        "totalVolume": "31013830.758424205396674506",
        "volumeDay": "40577.389786695415001844",
        "floorPriceAVAX": "0.000000000573913049",
        "totalVolumeAVAX": "1048101.506875225192549648",
        "volumeDayAVAX": "1858.278052244297984612",
        "perMint": "69696969",
        "totalSales": "63991",
        "salesDay": "152",
        "maxSupply": "1463636349000000",
        "marketCap": "23084888.8135325331925494",
        "marketCapAVAX": "779099.999781727197",
        "listed": "1721"
    }
}
```

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
