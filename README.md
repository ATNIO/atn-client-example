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


```


例(2) ：旷视  dbotAddress : 0xcda3b6051630b0baffc70385bcfca9c0882508d7
```curl

```

返回结果
```json
{
  "image_id": "O2alrpeRIXFejHWe6WlRqw==",
  "request_id": "1538016529,e87981e1-1850-4bec-8234-e4dcbb91c1c3",
  "time_used": 1134,
  "faces": [
    {
      "landmark": {
        "mouth_upper_lip_left_contour2": {
          "y": 489,
          "x": 520
        },
        "mouth_upper_lip_top": {
          "y": 482,
          "x": 530
        },
        "mouth_upper_lip_left_contour1": {
          "y": 481,
          "x": 524
        },
        "left_eye_upper_left_quarter": {
          "y": 412,
          "x": 512
        },
        "left_eyebrow_lower_middle": {
          "y": 394,
          "x": 513
        },
        "mouth_upper_lip_left_contour3": {
          "y": 493,
          "x": 525
        },
        "right_eye_top": {
          "y": 404,
          "x": 579
        },
        "left_eye_bottom": {
          "y": 420,
          "x": 519
        },
        "right_eyebrow_lower_left_quarter": {
          "y": 392,
          "x": 568
        },
        "right_eye_pupil": {
          "y": 409,
          "x": 578
        },
        "mouth_lower_lip_right_contour1": {
          "y": 495,
          "x": 549
        },
        "mouth_lower_lip_right_contour3": {
          "y": 505,
          "x": 545
        },
        "mouth_lower_lip_right_contour2": {
          "y": 502,
          "x": 556
        },
        "contour_chin": {
          "y": 544,
          "x": 537
        },
        "contour_left9": {
          "y": 536,
          "x": 524
        },
        "left_eye_lower_right_quarter": {
          "y": 418,
          "x": 525
        },
        "mouth_lower_lip_top": {
          "y": 495,
          "x": 533
        },
        "right_eyebrow_upper_middle": {
          "y": 380,
          "x": 582
        },
        "left_eyebrow_left_corner": {
          "y": 396,
          "x": 501
        },
        "right_eye_bottom": {
          "y": 417,
          "x": 581
        },
        "contour_left7": {
          "y": 508,
          "x": 513
        },
        "contour_left6": {
          "y": 494,
          "x": 510
        },
        "contour_left5": {
          "y": 479,
          "x": 508
        },
        "contour_left4": {
          "y": 464,
          "x": 506
        },
        "contour_left3": {
          "y": 450,
          "x": 506
        },
        "contour_left2": {
          "y": 436,
          "x": 508
        },
        "contour_left1": {
          "y": 422,
          "x": 509
        },
        "left_eye_lower_left_quarter": {
          "y": 419,
          "x": 513
        },
        "contour_right1": {
          "y": 416,
          "x": 665
        },
        "contour_right3": {
          "y": 461,
          "x": 664
        },
        "contour_right2": {
          "y": 438,
          "x": 665
        },
        "mouth_left_corner": {
          "y": 499,
          "x": 522
        },
        "contour_right4": {
          "y": 484,
          "x": 658
        },
        "contour_right7": {
          "y": 531,
          "x": 609
        },
        "right_eyebrow_left_corner": {
          "y": 392,
          "x": 553
        },
        "nose_right": {
          "y": 460,
          "x": 554
        },
        "nose_tip": {
          "y": 446,
          "x": 518
        },
        "contour_right5": {
          "y": 504,
          "x": 648
        },
        "nose_contour_lower_middle": {
          "y": 464,
          "x": 526
        },
        "left_eyebrow_lower_left_quarter": {
          "y": 394,
          "x": 506
        },
        "mouth_lower_lip_left_contour3": {
          "y": 506,
          "x": 527
        },
        "right_eye_right_corner": {
          "y": 411,
          "x": 597
        },
        "right_eye_lower_right_quarter": {
          "y": 415,
          "x": 590
        },
        "mouth_upper_lip_right_contour2": {
          "y": 487,
          "x": 552
        },
        "right_eyebrow_lower_right_quarter": {
          "y": 391,
          "x": 597
        },
        "left_eye_left_corner": {
          "y": 416,
          "x": 509
        },
        "mouth_right_corner": {
          "y": 496,
          "x": 566
        },
        "mouth_upper_lip_right_contour3": {
          "y": 491,
          "x": 548
        },
        "right_eye_lower_left_quarter": {
          "y": 416,
          "x": 572
        },
        "left_eyebrow_right_corner": {
          "y": 396,
          "x": 529
        },
        "left_eyebrow_lower_right_quarter": {
          "y": 396,
          "x": 521
        },
        "right_eye_center": {
          "y": 411,
          "x": 580
        },
        "nose_left": {
          "y": 453,
          "x": 511
        },
        "mouth_lower_lip_left_contour1": {
          "y": 496,
          "x": 527
        },
        "left_eye_upper_right_quarter": {
          "y": 411,
          "x": 525
        },
        "right_eyebrow_lower_middle": {
          "y": 390,
          "x": 583
        },
        "left_eye_top": {
          "y": 410,
          "x": 518
        },
        "left_eye_center": {
          "y": 415,
          "x": 519
        },
        "contour_left8": {
          "y": 522,
          "x": 518
        },
        "contour_right9": {
          "y": 545,
          "x": 561
        },
        "right_eye_left_corner": {
          "y": 414,
          "x": 564
        },
        "mouth_lower_lip_bottom": {
          "y": 507,
          "x": 534
        },
        "left_eyebrow_upper_left_quarter": {
          "y": 388,
          "x": 505
        },
        "left_eye_pupil": {
          "y": 414,
          "x": 519
        },
        "right_eyebrow_upper_left_quarter": {
          "y": 383,
          "x": 566
        },
        "contour_right8": {
          "y": 539,
          "x": 586
        },
        "right_eyebrow_right_corner": {
          "y": 393,
          "x": 613
        },
        "right_eye_upper_left_quarter": {
          "y": 407,
          "x": 570
        },
        "left_eyebrow_upper_middle": {
          "y": 386,
          "x": 513
        },
        "right_eyebrow_upper_right_quarter": {
          "y": 383,
          "x": 599
        },
        "nose_contour_left1": {
          "y": 414,
          "x": 528
        },
        "nose_contour_left2": {
          "y": 440,
          "x": 516
        },
        "mouth_upper_lip_right_contour1": {
          "y": 480,
          "x": 536
        },
        "nose_contour_right1": {
          "y": 414,
          "x": 552
        },
        "nose_contour_right2": {
          "y": 444,
          "x": 550
        },
        "mouth_lower_lip_left_contour2": {
          "y": 502,
          "x": 524
        },
        "contour_right6": {
          "y": 519,
          "x": 631
        },
        "nose_contour_right3": {
          "y": 464,
          "x": 540
        },
        "nose_contour_left3": {
          "y": 460,
          "x": 517
        },
        "left_eye_right_corner": {
          "y": 415,
          "x": 530
        },
        "left_eyebrow_upper_right_quarter": {
          "y": 389,
          "x": 522
        },
        "right_eye_upper_right_quarter": {
          "y": 406,
          "x": 589
        },
        "mouth_upper_lip_bottom": {
          "y": 490,
          "x": 532
        }
      },
      "attributes": {
        "gender": {
          "value": "Female"
        },
        "age": {
          "value": 24
        }
      },
      "face_rectangle": {
        "width": 162,
        "top": 379,
        "left": 506,
        "height": 162
      },
      "face_token": "7900f6fb3637d7bcbe0792e995ca7dc5"
    }
  ]
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
if you debug this example, use the webstorm you should 

---

## License

`ATN Clietn Example` is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
