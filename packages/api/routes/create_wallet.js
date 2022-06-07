var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

/**
 * @swagger
 * /api/v1/create_wallet/coin={coin}:
 *   post:
 *     description: Create an Employee
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
 *       201:
 *         description: Created
 *         content:
 *           application/json
 */
router.post('/?coin=:coin', async function (req, res, next) {

    console.log("generating wallet...");

    var coin = req.params.coin;
    var req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/generate";

    var options = {
        method: 'POST',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
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
            return resolve(response.body);
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