# Developer Service

{% hint style="info" %} <mark style="color:orange;">Please read</mark>[ Avascriptions Developer Service Legal Disclaimer](https://docs.avascriptions.com/developer-service/legal-disclaimer) <mark style="color:orange;">before using Avascriptions Open</mark> <mark style="color:orange;">API Service.</mark>
{% endhint %}

## Overview

Avascriptions Developer Service is open to community developers, allowing you to explore the world of Bitcoin and ordinals. You can deploy your own inscribing services, build wallet applications, develop browsers, and much more using the API.

## Getting an API Key

To use the OpenAPI, please request an API\_KEY from us by sending an email to <dev@avascriptions.com> with the name and description of your project and the reason for using it. After we review it, we will send you the API\_KEY.

When you obtain the API key, please add it to the request header with the `Authorization` format as follows:

```
curl --location 'http://open-api.avascriptions.com/v1/asc20/info' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "ticker":"avav"
}'
```
