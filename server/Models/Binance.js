const dotenv = require('../Utils/dotenv')
const { MainClient } = require('binance');
const BinanceClient = new MainClient({api_key: process.env.VUE_APP_BINANCE_API_KEY, api_secret: process.env.VUE_APP_BINANCE_API_SECRET_KEY})
module.exports = BinanceClient