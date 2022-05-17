const dotenv = require('./server/Utils/dotenv')
const express = require('express')
const cors = require('cors')
const Home = require('./server/Routes/Home')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/binance',Home)

app.listen(parseInt(5000),() => {
    console.log(`We are live on ${process.env.NODE_ENV} mode on port 5000`)
})