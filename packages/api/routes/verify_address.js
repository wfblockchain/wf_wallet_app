var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

/**
 * @swagger
 * /api/v1/verify_address/coin={coin}:
 *   post:
 *     description: Verify address
 *     parameters:
 *     - name: coin
 *       description: Type of coin
 *       in: path
 *       required: true
 *     - name: label and passphrase in json
 *       in: body
 *       description: label and passphrase in json
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Successfully verified
 *         content:
 *           application/json
 */
router.post('/?coin=:coin', async function (req, res, next) {

    console.log("verifying address: " + req.body.address);

    var coin = req.params.coin;

    var req_url = process.env.BITGO_SERVER_URL + coin + "/verifyaddress";

    var options = {
        method: 'POST',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        },
        json: {
            label: req.body.address
        }
    };
    const result = new Promise((resolve, reject) => {
        Request(options, function (error, response) {
            if (error) return reject(error);
            console.log(response.body)
            return resolve(response.body.isValid);
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