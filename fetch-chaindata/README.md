# fetch-chaindata

A simple program to grab the data on the chain and store it into mongodb

1. reanme sample.env to .env
2. run npm install
3. run node ./index.js

## 注意

- 这个程序只是简单采集了符合`0x646174613a`开头的区块数据,解码后就是`data:`开头的数据
- 没有对数据进行检查,存在无效或错误数据
