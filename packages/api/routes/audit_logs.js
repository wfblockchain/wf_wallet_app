var express = require('express');
var router = express.Router();
var cors = require("cors");
const Request = require("request");

/**
 * @swagger
 * /api/v1/audit_log:
 *   get:
 *     description: View Audit Log of all logins
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.get('/', function(req, res, next) {
    var req_url = process.env.BITGO_SERVER_URL + "/auditlog";

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