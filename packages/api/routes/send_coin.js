const express    = require('express');
const router     = express.Router();
const BitGoJS    = require('bitgo');
const bodyParser = require('body-parser');


// Send coins from provided 'walletId' to 'destinationAddress'
router.post('/', async (req, res) => {

    console.log("sendings coins");

    // Initialize bitgo sdk
// Read the user authentication section to get your API access token
    const bitgo = new BitGoJS.BitGo({
        env: 'test',
        accessToken: process.env.BITGO_ACCESS_TOKEN,
    });
    const coin = bitgo.coin('tbtc');
    const walletID = '6296dfbea306140007dbbd807ea607b4';
// Automatically parse JSON on any inbound requests
    router.use(bodyParser.json());

    const wallet = await coin.wallets().get({id: walletID})

    let params = {
        amount: 0.01 * 1e8,
        address: '2NECVCnM2oSjiezRZprs6UtNcsimhhmSi65',
        walletPassphrase: 'DeepDive0608',
    };
    wallet.send(params)
        .then(function (transaction) {
            // print transaction details
            console.log(transaction)
                .then(function () {
                res.send(transaction);
            })
    })

});

module.exports = router;