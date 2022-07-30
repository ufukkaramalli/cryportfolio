const dotenv = require('dotenv')
dotenv.config({ path: process.env.NODE_ENV == 'local' ? `.env.${process.env.NODE_ENV}` : `.env` })
module.exports = dotenv