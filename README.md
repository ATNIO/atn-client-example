# Atn Client Example 

---

## 目录
* [项目结构](#项目结构)
* [简介](#简介)
* [项目启动](#项目启动)
* [示例调用](#示例调用)
    * [简单流程示例](#简单流程示例)
    * [具体流程示例](#具体流程示例)
* [测试](#测试)
* [项目依赖](#项目依赖) 
* [工具使用](#工具使用) 
    * [调试](#调试)

---

## 项目结构
```sh
.
├── bin
│   └── www
├── libs
│   ├── app.js
│   ├── atnconfig
│   │   ├── ai
│   │   │   ├── baidu
│   │   │   ├── facepp
│   │   │   ├── xfyun
│   │   │   └── xiaoai
│   │   └── user1.json
│   ├── auth
│   │   ├── auth.js
│   │   └── oauth2.js
│   ├── config.js
│   ├── db
│   │   └── mongoose.js
│   ├── log.js
│   ├── model
│   │   ├── accessToken.js
│   │   ├── article.js
│   │   ├── atnClient.js
│   │   ├── client.js
│   │   ├── refreshToken.js
│   │   └── user.js
│   └── routes
│       ├── api.js
│       ├── articles.js
│       ├── atnclient.js
│       ├── oauth.js
│       └── users.js
├── logs
│   └── all.log
├── config.json
├── package-lock.json
├── package.json
└── test
    └── server.test.js
```
                    
## 简介

&emsp;&emsp; ***Atn Client Example*** 是使用[atn-node-js](https://www.npmjs.com/package/atn-node-js)客户端的 **Node Server API** 的示例，通过该示例你可以更深入了解
**atn-node-js**是一个面向开发者使用的Node版本的轻客户端程序包。`Atn Client Example` 示范了`atn-node-js`如何调用 `DBotServer AI`接口的示范流程，为应用开发者提供一个快速上手示例。
  
---

## 项目启动  
&emsp;&emsp;本地启动之前需要安装[Node.js](https://nodejs.org) 和 [MongoDB](https://www.mongodb.com)
* 1.Node安装
```sh 

# 使用 Homebrew 安装 Node (+npm) 
$ brew install node
```
```sh
# 在项目根目录
$ npm install
```

* 2.MongoDB安装
```sh
# 使用 Homebrew 安装 mongodb
$ brew install mongodb
```
```sh
# 创建MongoDB数据文件目录
$ mkdir -p ./data/mongo
```
```sh
# 设置MongoDB运行的进程到data目录
$ mongod --dbpath ./data/mongo
```

* 3.本地启动
```sh
npm start
# alias for
node bin/www
```

* 4.初始化示例数据脚本
```sh
npm run-script generate  
# alias for
node generateData.js
```


---

## 示例调用
&emsp;&emsp; 调用示例之前请到[`AI Market`](https://market-test.atnio.net)上找到可使用`DBotServer`并记录DBotServer地址。（如使用自己开发的AI服务本地，可参阅DBotServer相关：[Dbot Develop Guide](https://github.com/ATNIO/dbot-server)））  
例如： 百度NLP词法分析 address："0xe4640e4005903e147ebb54dd9ddf17e85ce53303"

### 简单流程示例：
1. 初始化调用
```sh

```
### 具体流程示例：
1. 给账户增加调用额度
```curl
curl -X POST \
  http://localhost:4080/api/atn/client/faucet \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: bad7ad08-11d7-4d0c-b052-cf1ef6c83ebc' \
  -d '{
	"accountAddress":"0xC030cF0A83D3A7C0a52d32239c3AE332809Ca0d1"
}'
```
成功返回
```json
{
    "status": 1,
    "data": "https://explorer-test.atnio.net/transactions/0xf9bdfab820bf1394c704355d568367f1b9dde68bcebc64997e2622761c58d577"
}
```

2. 创建**DBotServer**和**应用开发者**之间的调用通道(http请求)
```curl
curl -X POST \
  http://localhost:4080/api/atn/client/createChannel \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: f4b364fb-06e5-455b-a707-1085cf4ce896' \
  -d '{
	"dbotAddress":"0xe4640e4005903e147ebb54dd9ddf17e85ce53303",
	"deposit":3e18
}'
``` 
成功返回
```json
{
    "status": 1,
    "data": {
        "blockHash": "0x49812601d2589db03a08c2f9edf89c889b277e83dae0bc2f9080aff34ddab4f7",
        "blockNumber": 350761,
        "contractAddress": null,
        "cumulativeGasUsed": 66603,
        "from": "0x33385dde384f4128fd14e5779f30d0089dda3675",
        "gasUsed": 66603,
        "logs": [
            {
                "address": "0x0000000000000000000000000000000000000012",
                "topics": [
                    "0xa55ac5ebdb9bee5da90c5d4a6f104e5e2c116f97967ae2eb73f5fdfbdbb75bcb",
                    "0x00000000000000000000000033385dde384f4128fd14e5779f30d0089dda3675",
                    "0x000000000000000000000000e4640e4005903e147ebb54dd9ddf17e85ce53303"
                ],
                "data": "0x00000000000000000000000000000000000000000000000029a2241af62c0000",
                "blockNumber": 350761,
                "transactionHash": "0x9f4030fd39ba28d5a4b9501f02e013430836ec41724f6e1b80263a8bdfd8f44a",
                "transactionIndex": 0,
                "blockHash": "0x49812601d2589db03a08c2f9edf89c889b277e83dae0bc2f9080aff34ddab4f7",
                "logIndex": 0,
                "removed": false,
                "id": "log_4e8a8aef"
            }
        ],
        "logsBloom": "0x00000000000000000000020000000000000000000000000000000000000000000000000000000000000100000008000000020000000000000000000000000000000400000000000000000000000000000000000000101000000000000001000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000002000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": true,
        "to": "0x0000000000000000000000000000000000000012",
        "transactionHash": "0x9f4030fd39ba28d5a4b9501f02e013430836ec41724f6e1b80263a8bdfd8f44a",
        "transactionIndex": 0
    }
}
```
失败返回
```json
{
    "status": 0,
    "error": "Error: Channel has exist."
}
```

3. 获取调用通道信息
```curl
curl -X GET \
  http://localhost:4080/api/atn/client/getChannelDetail/0xe4640e4005903e147ebb54dd9ddf17e85ce53303 \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'

```

成功返回结果
```json
{
    "status": 1,
    "data": {
        "receiver": "0xE4640e4005903e147EbB54dd9DDf17e85Ce53303",
        "sender": "0xA474A12B81B443854414C3C3928B0eC44AdFdE06",
        "open_block_number": "353401",
        "deposit": "3000000000000000000",
        "balance": "0",
        "state": "OPEN",
        "settle_block_number": "-1",
        "confirmed": true,
        "unconfirmed_topups": {},
        "domain": "https://dbot02.atnio.net"
    }
}
```

4. 增加通道调用次数
```curl
curl -X POST \
  http://localhost:4080/api/atn/client/topupChannel \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"dbotAddress":"0xe4640e4005903e147ebb54dd9ddf17e85ce53303",
	"value":2e18
}'
```


返回结果
```json
{
    "status": 1,
    "data": {
        "blockHash": "0x9840cc8c1f3cf98e6c53fe1b6d8a0b2e15e582b820d6548d344425311ef12806",
        "blockNumber": 364122,
        "contractAddress": null,
        "cumulativeGasUsed": 32501,
        "from": "0xa474a12b81b443854414c3c3928b0ec44adfde06",
        "gasUsed": 32501,
        "logs": [
            {
                "address": "0x0000000000000000000000000000000000000012",
                "topics": [
                    "0x19034e235e9fae58965e705631a9e662529152bc990b7db2aca8aeb6389f006f",
                    "0x000000000000000000000000a474a12b81b443854414c3c3928b0ec44adfde06",
                    "0x000000000000000000000000e4640e4005903e147ebb54dd9ddf17e85ce53303",
                    "0x0000000000000000000000000000000000000000000000000000000000056479"
                ],
                "data": "0x0000000000000000000000000000000000000000000000001bc16d674ec80000",
                "blockNumber": 364122,
                "transactionHash": "0x5b1110f8a9d82d74bf2cd664520a4e5db74223717b7648c4f66ae503b8fbe146",
                "transactionIndex": 0,
                "blockHash": "0x9840cc8c1f3cf98e6c53fe1b6d8a0b2e15e582b820d6548d344425311ef12806",
                "logIndex": 0,
                "removed": false,
                "id": "log_213e316a"
            }
        ],
        "logsBloom": "0x00000000000000000000020000000000000000000000000000000000000010000000000000000000000100000000000000000000000000000000000000000400000000008000000000000000000000000000000000001000200000000001000000000000000000000080000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000100000000000000000000000000002000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000",
        "status": true,
        "to": "0x0000000000000000000000000000000000000012",
        "transactionHash": "0x5b1110f8a9d82d74bf2cd664520a4e5db74223717b7648c4f66ae503b8fbe146",
        "transactionIndex": 0
    }
}

```


5. 关闭调用通道
```curl
curl -X POST \
  http://localhost:4080/api/atn/client/closeChannel \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"dbotAddress":"0xfd4f504f373f0af5ff36d9fbe1050e6300699230"
}'
```

返回结果
```json
{
    "status": 1,
    "data": {
        "blockHash": "0x692a619c17eb886f94f1d1eee2a8398b792ee68433849b5c052f65049b79878a",
        "blockNumber": 363999,
        "contractAddress": null,
        "cumulativeGasUsed": 49620,
        "from": "0xa474a12b81b443854414c3c3928b0ec44adfde06",
        "gasUsed": 49620,
        "logs": [
            {
                "address": "0x0000000000000000000000000000000000000012",
                "topics": [
                    "0x883e5ff9c28a5ae8ed235b3581f8b97392b91531c0a085fb53120e8d46cc8021",
                    "0x000000000000000000000000a474a12b81b443854414c3c3928b0ec44adfde06",
                    "0x000000000000000000000000fd4f504f373f0af5ff36d9fbe1050e6300699230",
                    "0x00000000000000000000000000000000000000000000000000000000000566b0"
                ],
                "data": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "blockNumber": 363999,
                "transactionHash": "0x5e458d4941a5f693fcfb3c9a740d2648c3c8ac0b2588bf5ae6f19ea58c3a3fef",
                "transactionIndex": 0,
                "blockHash": "0x692a619c17eb886f94f1d1eee2a8398b792ee68433849b5c052f65049b79878a",
                "logIndex": 0,
                "removed": false,
                "id": "log_a3c3201c"
            }
        ],
        "logsBloom": "0x00000000000000000000020001000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000010000000400000000008000000000000000000000000000000000000010000000000001000000000000000008000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000100000000000000000000000000000000004000000000000000000000000000000000080000000000000000000000000000000000",
        "status": true,
        "to": "0x0000000000000000000000000000000000000012",
        "transactionHash": "0x5e458d4941a5f693fcfb3c9a740d2648c3c8ac0b2588bf5ae6f19ea58c3a3fef",
        "transactionIndex": 0
    }
}
```


6. 调用DBotServer AI服务  
例(1) ：百度NLP词法分析
```curl
curl -X POST \
  http://localhost:4080/api/atn/client/callAI/baidu \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"dbotAddress":"0xe4640e4005903e147ebb54dd9ddf17e85ce53303",
	"method":"post",
	"uri":"/lexer",
	"option":{
		 "headers": {
         "Content-Type": "application/x-www-form-urlencoded"
         ""
       },
    "data":"text=百度是一家高科技公司" 
	}
}'
```

返回结果 
```json
{
    "status": 1,
    "data": {
        "log_id": 4536855503572087000,
        "text": "百度是一家高科技公司",
        "items": [
            {
                "loc_details": [],
                "byte_offset": 0,
                "uri": "",
                "pos": "",
                "ne": "ORG",
                "item": "百度",
                "basic_words": [
                    "百度"
                ],
                "byte_length": 4,
                "formal": ""
            },
            {
                "loc_details": [],
                "byte_offset": 4,
                "uri": "",
                "pos": "v",
                "ne": "",
                "item": "是",
                "basic_words": [
                    "是"
                ],
                "byte_length": 2,
                "formal": ""
            },
            {
                "loc_details": [],
                "byte_offset": 6,
                "uri": "",
                "pos": "m",
                "ne": "",
                "item": "一家",
                "basic_words": [
                    "一",
                    "家"
                ],
                "byte_length": 4,
                "formal": ""
            },
            {
                "loc_details": [],
                "byte_offset": 10,
                "uri": "",
                "pos": "n",
                "ne": "",
                "item": "高科技",
                "basic_words": [
                    "高",
                    "科技"
                ],
                "byte_length": 6,
                "formal": ""
            },
            {
                "loc_details": [],
                "byte_offset": 16,
                "uri": "",
                "pos": "n",
                "ne": "",
                "item": "公司",
                "basic_words": [
                    "公司"
                ],
                "byte_length": 4,
                "formal": ""
            }
        ]
    }
}

```

---

## 测试

```sh
npm test
# alias for
node ./test/server.test.js
```

---

## 项目依赖
依赖使用模块:
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nconf](https://www.npmjs.com/package/nconf)
* [winston](https://www.npmjs.com/package/winston)
* [faker](https://www.npmjs.com/package/faker)
* [oauth2orize](https://www.npmjs.com/package/oauth2orize)
* [passport](https://www.npmjs.com/package/passport)

测试模块:
* [tape](https://www.npmjs.com/package/tape)
* [superagent](https://www.npmjs.com/package/superagent)

---
 
## 工具使用
* [httpie](https://github.com/jkbr/httpie) - command line HTTP client
### 调试
 如果本地需要调试，可以使用webstorm插件Node.js debug模式启动，如图所示：
 ![](http://p5vswdxl9.bkt.clouddn.com/1538153027368.jpg)

---

## License

`ATN Clietn Example` is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
