const express    = require('express');
const router     = express.Router();
const BitGoJS    = require('bitgo');
const bodyParser = require('body-parser');


// Send coins from provided 'walletId' to 'destinationAddress'
router.post('/', async (req, res) => {

    console.log("sendings coins");

    var coin = req.body.coin
    var walletId = req.body.coin
    var amount = req.body.amount
    var destAddress = req.body.amount
    var password = req.body.password

    const bitgo = new BitGoJS.BitGo({ env: 'test' });

    const basecoin = bitgo.coin(coin);
    accessToken = process.env.BITGO_ACCESS_TOKEN;

    console.log(auth_token);

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
        });
});

module.exports = router;