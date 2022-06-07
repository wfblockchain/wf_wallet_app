var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

/**
 * @swagger
 * /api/v1/txn_history/coin={coin}/wallet={walletId}:
 *   get:
 *     description: Get transaction history for a wallet
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         description: type of coin
 *       - in: path
 *         name: walletId
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.get('/?coin=:coin/?wallet=:walletId', function(req, res, next) {

  var coin = req.params.coin;
  var walletId = req.params.walletId;

  var req_url = process.env.BITGO_SERVER_URL + coin + "/wallet/" + walletId + "/transfer"

  console.log(req_url);

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