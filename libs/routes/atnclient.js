var express = require('express');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var Atn = require('atn-node-js')
var key = require('../atnconfig/user1');
var axios = require('axios')
var AtnClient = require(libs + 'model/atnClient');


const atn = new Atn(key.key)

var db = require(libs + 'db/mongoose');


// 交易查询地址
const exploreLink = "https://explorer-test.atnio.net/transactions/"
// 水龙头服务地址
const faucetLink = "http://119.3.57.66:4111/faucet/"






/**
 * atn-node-js Channel通道创建示例
 */
router.post('/createChannel', async function (req, res) {
    console.log('-----------STEP 1 : createChannel start--------------', JSON.stringify(req.body))
    var accountAddress = await atn.privateKeyToAccount(key.key)
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
    var accountAddress = await atn.privateKeyToAccount(key.key)
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
        return res.json(exploreLink.concat(resource.data))
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
router.get('/getChannelDetail/:accountAddresss', async function (req, res) {
    var accountAddress = await atn.privateKeyToAccount(key.key)
    console.log('-----------closeChannel getChannelDetail start--------------', JSON.stringify(req.body))
    const data = req.body
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
    var accountAddress = await atn.privateKeyToAccount(key.key)
    if (data && data.dbotAddress) {
        let [channelInfo, channelDetail] = Promise.all(await atn.getChannelInfo(data.dbotAddress))
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
            let closeSig = await atn.requestCloseSignature(data.dbotAddress, channelDetail.balance)
            console.log('-------------getCloseSig------------------', closeSig)
            let receipt = await atn.closeChannel(data.dbotAddress, channelDetail.balance, closeSig)
            return res.json(receipt)
        }
    }
    console.log('-----------closeChannel end  --------------', accountAddress.address.toLowerCase())
})


/**
 * atn-node-js Channel通道增加存款示例
 */
router.post('/topUpChannel', async function (req, res) {
    console.log('-----------closeChannel start--------------', JSON.stringify(req.body))
    let data = req.body
    if (data && data.value) {
        try {
            const result = await atn.topUpChannel()
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

    }
})

/**
 * atn-node-js 使用DBotServer 示例
 */
router.post('/callAI/baibu', async function (req, res) {
    console.log('----------- callAI start --------------', JSON.stringify(req.body))
    let data = req.body
    var dbotAddress = data.dbotAddress;
    var uri = data.uri;
    var method = data.method;
    var option = data.option;
    try {
        if (data && dbotAddress && uri && method && option) {
            const result = await atn.callDbotApi(dbotAddress, uri, method, option)
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


module.exports = router


