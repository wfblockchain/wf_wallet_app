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
 *     - name: walletId, amount, destAddress, and password
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

    console.log(req.body);

    var coin = req.body.coin;
    var walletId = req.body.walletId;
    var amount = req.body.amount.concat("* 1e8") ;
    var destAddress = req.body.destAddress;
    var password = req.body.password;

    const bitgo = new BitGoJS.BitGo({ env: 'test' });

    accessToken = process.env.BITGO_ACCESS_TOKEN;

    console.log("Parameters Passed In")
    console.log("coin: " + coin);
    console.log("walletId: " + walletId);
    console.log("amount: " + amount.concat("* 1e8"));
    console.log("address: " + destAddress);
    console.log("password: " + password);

    bitgo.authenticateWithAccessToken({ accessToken });

    const data = {
        walletPassphrase: password,
        address: destAddress,
        amount: amount
    };

    bitgo.unlock({ otp: '0000000' }).then(function (unlockResponse) {
        console.dir(unlockResponse);
    });

    bitgo.coin(coin).wallets().get({ id: walletId })
        .then(function(wallet) {
            console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));

            if(wallet.balance()<amount) {
                console.log("Insufficient balance")
                return "Insufficient balance"
            }
            return wallet.send(data);
        })
        .then(function (result) {
            console.dir(result);
            // Save result in disk for further reference
            console.log('wallet_send_coins', result);

            return result;
        })
});

module.exports = router;