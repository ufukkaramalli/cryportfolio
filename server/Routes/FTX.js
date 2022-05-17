const express = require('express')
const FtxController = require('../Controllers/FtxController')

const router = express.Router({ mergeParams: true })

router.post("/balances",FtxController.Balances)

module.exports = router