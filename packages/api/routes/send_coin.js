const express    = require('express');
const router     = express.Router();
const BitGoJS    = require('bitgo');
const bodyParser = require('body-parser');

/**
 * @swagger
 * /api/v1/send_coin/:
 *   post:
 *     description: Transfer money
 *     parameters:
 *     - name: coin
 *       in: body
 *     - name: walletId
 *       in: body
 *     - name: amount
 *       in: body
 *     - name: destAddress
 *       in: body
 *     - name: password
 *       in: body
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json
 */
router.post('/', async (req, res) => {

    console.log("sendings coins");

    var coin = req.body.coin
    var walletId = req.body.walletId
    var amount = req.body.amount
    var destAddress = req.body.destAddress
    var password = req.body.password

    const bitgo = new BitGoJS.BitGo({ env: 'test' });

    const basecoin = bitgo.coin(coin);
    accessToken = process.env.BITGO_ACCESS_TOKEN;

    console.log(walletId);

    bitgo.authenticateWithAccessToken({ accessToken });

    bitgo.coin(coin).wallets().get({ id : walletId })
        .then(function(wallet) {

            let params = {
                amount: amount,
                address: destAddress,
                walletPassphrase: password,
                sequenceId: "example"
            };

            wallet.send(params)
                .then(function(transaction) {
                    console.dir(transaction);
                });
        })
        .catch((error) => {
            console.log(error)
        });
});

module.exports = router;