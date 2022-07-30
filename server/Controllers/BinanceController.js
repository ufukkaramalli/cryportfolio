const calculateUSDT = require('../../src/utils/calculate')
const BinanceClient = require('../Models/Binance');
const axios = require('axios');
module.exports = {
    Binance24Hr: async (req,res) => {
        try {
            let { data } = await axios.get("https://api.binance.com/api/v3/ticker/24hr")
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    Balances: async (req,res) => {
        try {
            let binance_grandTotal_usdt = 0
            let { data } = await axios.get("https://api.binance.com/api/v3/ticker/24hr")
            let { balances } = await BinanceClient.getAccountInformation()
            let e = balances.filter(element => {
                console.log(element)
                if(element.asset !== 'LUNC' && element.asset !== 'LUNA'){
                    if(element.free > 0 || element.locked > 0){
                        element.where="BINANCE"
                        element.total=parseFloat(element.free)+parseFloat(element.locked)
                        element.usdt = calculateUSDT(data,{value:element.total,asset:element.asset})
                        delete element.free
                        delete element.locked
                        binance_grandTotal_usdt = binance_grandTotal_usdt + parseFloat(element.usdt)
                        return element
                    }
                }
            })
            let response = {balances:e,grandtotal:binance_grandTotal_usdt}
            res.status(200).json(response)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}