var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

router.post('/', async function (req, res, next) {

    console.log("sending" + req.body.amount);

    var req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/generate";

    var options = {
        method: 'POST',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + 'dc232a93cc392a0d877c6151c63aaae18cfc8f0ebff0f2bcb65ec6d2c1bbe50e'
        },
        json: {
            label: req.body.label,
            passphrase: req.body.passphrase
        }
    };
    const result = new Promise((resolve, reject) => {
        Request(options, function (error, response) {
            if (error) return reject(error);
            console.log(response.body)
            return resolve(response.body.receiveAddress.address);
        });
    })

    // make sure, to use async in your function
    // because we're using await here
    var fromapi = await result;
    // It's working here
    console.log(fromapi);

    res.end();
});

module.exports = router;