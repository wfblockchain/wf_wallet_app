var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config({path: './.env'});

// Swagger Documentation
// Doc on Swagger: https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');

var indexRouter = require('./routes/index');
var userInfoAPIRouter = require('./routes/user_info');
var walletAPIRouter = require('./routes/wallet_list');
var createWalletAPIRouter = require('./routes/create_wallet');
var auditLogAPIRouter = require('./routes/audit_logs');
var deleteWalletAPIRouter = require('./routes/delete_wallet');
var verifyAddressAPIRouter = require('./routes/verify_address');
var addressListAPIRouter = require('./routes/address_list');
var sendCoinAPIRouter = require('./routes/send_coin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title:'Wallet API',
      version:'1.0.0',
      description:'API for managing wallets'
    },
    contact: {
      name: 'SSAT',
      email: 'blockchain@wellsfargo.com'
    }
  },
  apis:['./routes/*.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use('/', indexRouter);

app.use('/api/v1/user_info', userInfoAPIRouter)
app.use('/api/v1/wallet_list', walletAPIRouter)
app.use('/api/v1/create_wallet', createWalletAPIRouter)
app.use('/api/v1/audit_log', auditLogAPIRouter)
app.use('/api/v1/delete_wallet', deleteWalletAPIRouter)
app.use('/api/v1/verify_address', verifyAddressAPIRouter)
app.use('/api/v1/address_list', addressListAPIRouter)
app.use('/api/v1/send_coin', sendCoinAPIRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.header('Access-Control-Allow-Origin', '*');
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
