var atn = require('atn-node-js')
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AtnClient = new Schema({
        method: {
            type: String,
            required: true
        },
        params: {
            type: JSON,
            required: true
        },
        returnResult: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('AtnClient', AtnClient);
