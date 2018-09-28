var express = require('express');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var Atn = require('atn-node-js');
var key = require('../atnconfig/user');
var axios = require('axios')
var AtnClient = require(libs + 'model/atnClient');
var iconv = require("iconv-lite");
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

const atn = new Atn(key.key)

let db = require(libs + 'db/mongoose');


// 交易查询地址
const exploreLink = "https://explorer-test.atnio.net/transactions/"
// 水龙头服务地址
const faucetLink = "http://119.3.57.66:4111/faucet/"


/**
 * atn-node-js Channel通道创建示例
 */
router.post('/createChannel', async function (req, res) {
    console.log('-----------STEP 1 : createChannel start--------------', JSON.stringify(req.body))
    let accountAddress = await atn.privateKeyToAccount(key.key)
    try {
        let data = req.body
        console.log('---------------', data)
        if (data && data.dbotAddress && data.deposit) {
            const result = await atn.createChannel(data.dbotAddress, data.deposit)
            console.log('-----------createChannel end  --------------', accountAddress.address)
            return res.json({
                status: 1,
                data: result
            })
        } else {
            console.log('-----------createChannel data error  --------------')
        }
    } catch (e) {
        console.log('-------exception-----------', e)
        return res.json({
            status: 0,
            error: e.toString()
        })
    }
    return
})

/**
 * atn-node-js 水龙头服务示例
 */
router.post('/faucet', async function (req, res) {
    console.log('-----------faucet start--------------', JSON.stringify(req.body))
    let accountAddress = await atn.privateKeyToAccount(key.key)
    let data = req.body
    console.log('---------------------------', accountAddress.address)
    console.log('accountAddress.address', accountAddress.address)
    let url = faucetLink.concat(accountAddress.address)
    if (data && data.accountAddress) {
        console.log('data.accountAddress', data.accountAddress)
        url = faucetLink.concat(data.accountAddress)
    }
    console.log('-----------faucet url-----------------', url)
    try {
        const option = {
            headers: {'Content-Type': 'text/plain; charset=utf-8'},
            method: "post",
            url: url
        }
        console.log('option', JSON.stringify(option))
        const resource = await axios(option)
        console.log('-----------resource', resource)
        // return res.json({status: 1, data: resource})
        return res.json({
            status: 1,
            data: exploreLink.concat(resource.data)
        })
    } catch (e) {
        return res.json({
            status: 0,
            error: "faucet server error"
        })
    }
    console.log('-----------faucet end --------------', JSON.stringify(req.body))
})


/**
 * atn-node-js Channel通道信息获取
 */
router.get('/getChannelDetail/:dbotAddress', async function (req, res) {
    let accountAddress = await atn.privateKeyToAccount(key.key)
    console.log('-----------closeChannel getChannelDetail start--------------', JSON.stringify(req.body))
    const data = req.params
    try {
        const result = await atn.getChannelDetail(data.dbotAddress)
        return res.json({
            status: 1,
            data: result
        })
    } catch (e) {
        res.statusCode = 200
        return res.json({
            status: 0,
            error: "get channelDetail error"
        })
    }
    console.log('-----------closeChannel getChannelDetail end  --------------', accountAddress.address)

})

/**
 *  atn-node-js Channel通道关闭示例
 */
router.post('/closeChannel', async function (req, res) {
        console.log('-----------closeChannel start--------------', JSON.stringify(req.body))
        let data = req.body
        let accountAddress = await atn.privateKeyToAccount(key.key)
        try {
            if (data && data.dbotAddress) {
                let channelInfo = await atn.getChannelInfo(data.dbotAddress);
                let channelDetail = await atn.getChannelDetail(data.dbotAddress)
                if (!(channelInfo && channelDetail)) {
                    let retryCnt = 3
                    while (channelDetail.deposit != channelInfo.deposit && retryCnt > 0) {
                        --retryCnt
                        console.log('ChannelToppedUp up has not synced by dbot server, retry in 5s')
                        sleep.sleep(5)
                        channelDetail = await atn.getChannelDetail(data.dbotAddress)
                    }
                }
                console.log('-------------channelInfo, channelDetail------------------', channelInfo, channelDetail)
                if (channelDetail.deposit == channelInfo.deposit) {
                    let closeSig = await atn.requestCloseSignature(data.dbotAddress, channelDetail.balance, accountAddress.address)
                    console.log('-------------getCloseSig------------------', closeSig)
                    let receipt = await atn.closeChannel(data.dbotAddress, channelDetail.balance, accountAddress.address)
                    return res.json({
                        status: 1,
                        data: receipt
                    })
                } else {
                    return res.json({
                        status: 0,
                        data: accountAddress,
                        msg: "try it later"
                    })
                }
                console.log('-----------closeChannel end  --------------', accountAddress.address.toLowerCase())

            } else {
                return res.json({
                    status: 0,
                    msg: 'data invalid'
                })
            }
        } catch (e) {
            res.statusCode = 200
            return res.json({
                status: 0,
                error: e.toString()
            })
        }
    }
)

/**
 * atn-node-js Channel通道增加存款示例
 */
router.post('/topupChannel', async function (req, res) {
    console.log('-----------closeChannel start--------------', JSON.stringify(req.body))
    let data = req.body
    try {
        if (data && data.value && data.dbotAddress) {
            const result = await atn.topUpChannel(data.dbotAddress, data.value)
            return res.json({
                status: 1,
                data: result
            })
        }
    } catch (e) {
        return res.json({
            status: 0,
            error: e.toString()
        })
    }
})

router.post('/initConfig', async function (req, res) {
    console.log('----------- initConfig start --------------', JSON.stringify(req.body))
    let data = req.body
    let dbotAddress = data.dbotAddress;
    try {
        const result = await atn.initConfig('/libs/atnconfig/user.json', dbotAddress, key.key, 1)
        return res.json({
            status: 1,
            data: result
        })
    } catch (e) {
        return res.json({
            status: 0,
            error: e.toString()
        })
    }
})


/**
 * atn-node-js 使用DBotServer 示例
 */
router.post('/callAI/baidu',async function (req, res) {
    console.log('----------- callAI start --------------', JSON.stringify(req.body))
    let data = req.body
    let dbotAddress = data.dbotAddress;
    let uri = data.uri;
    let method = data.method;
    let option = data.option;
    // qs.stringify()
    try {
        if (data && dbotAddress && uri && method && option) {
            const resource = await atn.callDBotAI(dbotAddress, uri, method, option)
            return res.json({
                status:1,
                data: result.data
            })
        } else {
            return res.json({
                status: 0,
                msg: 'data invalid'
            })
        }
    } catch (e) {
        return res.json({
            status: 0,
            error: e.toString()
        })
    }
})


router.post('/callAI/faceplus', multipartMiddleware, async function (req, res) {
    console.log('----------- callAI start --------------', JSON.stringify(req.body))
    try {
        let data = req.body
        var bodyFormData = new FormData();
        bodyFormData.append()
        let files = req.files
        bodyFormData.set('return_landmark', data.return_landmark)
        bodyFormData.set('return_attributes', data.return_attributes)
        bodyFormData.set('image_file', files)
        let dbotAddress = data.dbotAddress;
        let uri = data.uri;
        let method = data.method;
        // let file = req.files;
        // let fileType = file.type
        let option = {
            data: bodyFormData
        }

        if (data && dbotAddress && uri && method && option) {
            const result = await atn.callDBotAI(dbotAddress, uri, method, option)
            return res.json({
                status: 1,
                data: result
            })
        } else {
            return res.json({
                status: 0,
                msg: 'data invalid'
            })
        }
    } catch (e) {
        return res.json({
            status: 0,
            error: e.toString()
        })
    }
})


module.exports = router


