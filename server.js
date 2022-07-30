const dotenv = require('./server/Utils/dotenv')
const express = require('express')
const cors = require('cors')
const BinanceRoutes = require('./server/Routes/Binance')
const FtxRoutes = require('./server/Routes/FTX')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/binance',BinanceRoutes)
app.use('/ftx',FtxRoutes)

app.listen(parseInt(5000),() => {
    console.log(`We are live on ${process.env.NODE_ENV} mode on port 5000`)
})