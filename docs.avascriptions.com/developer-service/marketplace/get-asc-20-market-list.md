# Get ASC-20 Market List

## Get ASC-20 market list.

<mark style="color:green;">`POST`</mark> `https://open-api.avascriptions.com/v1/market/list`

#### Query Parameters

| Name  | Type    | Description                        |
| ----- | ------- | ---------------------------------- |
| page  | integer | Start page, default 1              |
| limit | integer | Number of token returned, Up to 50 |

{% tabs %}
{% tab title="200: OK Successful operation" %}

<pre class="language-json" data-full-width="false"><code class="lang-json">{
    "status": 200,
    "data": {
        "list": [
             {
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
            },
            {
<strong>                "tick": "dino",
</strong>                "number": "26179229",
                "holders": "37615",
                "floorPrice": "0.0000000018963328",
                "totalVolume": "12625100.154351679662983155",
                "volumeDay": "3379.2489672081680648",
                "floorPriceAVAX": "0.000000000063",
                "totalVolumeAVAX": "426285.848264429737229876",
                "volumeDayAVAX": "241.70706915788058",
                "perMint": "100000000",
                "totalSales": "44264",
                "salesDay": "51",
                "maxSupply": "2100000000000000",
                "marketCap": "3982298.88",
                "marketCapAVAX": "134400.0",
                "listed": "721"
            },
            {
                "tick": "avas",
                "number": "1",
                "holders": "8188",
                "floorPrice": "0.09481664",
                "totalVolume": "2467059.670634595982484207",
                "volumeDay": "6811.686678",
                "floorPriceAVAX": "0.000000000573913049",
                "totalVolumeAVAX": "1048101.506875225192549648",
                "volumeDayAVAX": "1858.278052244297984612",
                "perMint": "0",
                "totalSales": "7489",
                "salesDay": "13",
                "maxSupply": "21000000",
                "marketCap": "1991149.44",
                "marketCapAVAX": "67200.0",
                "listed": "121"
            }
        ],
        "total": 1000
    }
}
</code></pre>

{% endtab %}

{% tab title="401: Unauthorized Invalid API Key" %}

{% endtab %}
{% endtabs %}
