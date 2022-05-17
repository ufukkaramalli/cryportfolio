const express = require('express')
const BinanceController = require('../Controllers/BinanceController')

const router = express.Router({ mergeParams: true })

router.get("/24hr",BinanceController.Binance24Hr)
router.post("/balances",BinanceController.Balances)

module.exports = router