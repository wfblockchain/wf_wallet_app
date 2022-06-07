var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

/**
 * @swagger
 * /api/v1/wallet_list/coin={coin}:
 *   get:
 *     description: View all wallets
 *     parameters:
 *     - name: coin
 *       description: Type of coin
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.get('/?coin=:coin', function(req, res, next) {
    var coin = req.params.coin;

    var req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/?limit=50";

    var options = {
        method: 'GET',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    };
    Request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
});

module.exports = router;