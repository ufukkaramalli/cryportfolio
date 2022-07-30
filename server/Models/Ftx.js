const dotenv = require('dotenv');
const { RestClient } = require('ftx-api');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const ftx = new RestClient(process.env.VUE_APP_FTX_API_KEY, process.env.VUE_APP_FTX_API_SECRET_KEY)
module.exports = ftx