const calculateUSDT = require('../../src/utils/calculate')
const FtxClient = require('../Models/Ftx');
const axios = require('axios');
module.exports = {
    Balances: async (req,res) => {
        try {
            let ftx_grandTotal_usdt = 0
            let {result} = await FtxClient.getBalances()
            let e = result.filter(element => {
                if(parseFloat(element.free) > 0 || parseFloat(element.availableWithoutBorrow) > 0 || parseFloat(element.total)){
                    element.where="FTX"
                    element.asset=element.coin
                    element.usdt=element.usdValue
                    delete element.coin
                    delete element.availableWithoutBorrow
                    delete element.availableForWithdrawal
                    delete element.free
                    delete element.spotBorrow
                    delete element.usdValue
                    ftx_grandTotal_usdt = ftx_grandTotal_usdt + parseFloat(element.usdt)
                    return element
                    
                 }
            })
            let response = {balances:e,grandtotal:ftx_grandTotal_usdt}
            res.status(200).json(response)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}