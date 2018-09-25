# Atn Client Develop

## 简介

`atn-node-js`是一个面向开发者使用的node js版本的轻客户端程序包，该包在web3的基础之上结合ATN生态系统封装了对 `ATN链`的调用，从而为开发者提供一个友好而简便的链上操作以及DBotServer服务的调用。
  本项目将示范如何使用 `atn-node-js`


## 快速起步
 1.  
 2. 本地启动`DBotServer`（DBotServer相关可参阅：[dbot-server](https://github.com/ATNIO/dbot-server)），或者 [`AI Market`](https://market-test.atnio.net)上找到可使用`DBotServer`，记录DBotServer地址 ,例如： 百度NLP词法分析 address：0xe4640e4005903e147ebb54dd9ddf17e85ce53303
 
 
### Node setup on macOS

```sh
# Update Homebrew before installing all dependencies
brew update

# Install Node (+npm) with Homebrew
brew install node

# Install npm dependencies in project folder
npm install
```

### MongoDB setup on macOS

```sh
# Install MongoDB with Homebrew
brew install mongodb

# Create directory for MongoDB data
mkdir -p ./data/mongo

# Run MongoDB daemon process with path to data directory
mongod --dbpath ./data/mongo
```

### Run server

```sh
npm start
# alias for
node bin/www
```

### Create demo data

```sh
npm run-script generate
# alias for
node generateData.js
```

## Docker

You need to have [Docker](https://www.docker.com/community-edition) installed.

### Run server

```sh
docker-compose up -d --build
```

### Create demo data

```sh
docker exec nodeapi_node_api_1 node generateData.js
```

## Make Requests

Create and refresh access tokens:

```sh
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[REFRESH_TOKEN]
```

Create your article data:

```sh
http POST http://localhost:1337/api/articles title='New Article' author='John Doe' description='Lorem ipsum dolar sit amet' images:='[{"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"}, {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}]' Authorization:'Bearer ACCESS_TOKEN'
```

Update your article data:

```sh
http PUT http://localhost:1337/api/articles/EXISTING_ARTICLE_ID title='Updated Article' author='Jane Doe' description='This is now updated' Authorization:'Bearer ACCESS_TOKEN'
```

Get your data:

```sh
http http://localhost:1337/api/users/info Authorization:'Bearer ACCESS_TOKEN'
http http://localhost:1337/api/articles Authorization:'Bearer ACCESS_TOKEN'
```

## Tests

```sh
npm test
# alias for
node ./test/server.test.js
```

## Modules used

Some of non-standard modules used:

* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nconf](https://www.npmjs.com/package/nconf)
* [winston](https://www.npmjs.com/package/winston)
* [faker](https://www.npmjs.com/package/faker)
* [oauth2orize](https://www.npmjs.com/package/oauth2orize)
* [passport](https://www.npmjs.com/package/passport)

Test modules:

* [tape](https://www.npmjs.com/package/tape)
* [superagent](https://www.npmjs.com/package/superagent)

## Tools used

* [httpie](https://github.com/jkbr/httpie) - command line HTTP client

### JSHint

```sh
npm install jshint -g
jshint libs/**/*.js generateData.js
```
## debug
if you debug this example, use the webstorm you should 

## Author

Created and maintained by Evgeny Aleksandrov ([@ealeksandrov](https://twitter.com/ealeksandrov)).

Updated by:

* [Istock Jared](https://github.com/IstockJared)
* [Marko Arsić](https://marsic.info/)
* and other [contributors](https://github.com/ealeksandrov/NodeAPI/graphs/contributors)

## License

`NodeAPI` is available under the MIT license. See the [LICENSE.md](LICENSE.md) file for more info.
