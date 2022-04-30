import {calculateUSDT,calculateTRY} from '@/utils/calculate'
export default {
    namespaced: true,
    state: {
        exchanges:{
            binance: {
              balances: [],
              available:null,
              total:{
                usdt:0,
                try:0
              }
            },
            ftx: {
              balances: [],
              available:null,
              total:{
                usdt:null,
                try:null
              }
            },
            bank: {
              total:{
                usd:64,
                try:943.70,
                }
            }
        }
    },
    mutations: {
        setBinanceBalances (state, payload) {
            state.exchanges.binance.balances = payload
        },
        setBinanceAvailable (state, payload) {
            state.exchanges.binance.available = payload
        },
        setBinanceTotalUsdt (state, payload) {
            state.exchanges.binance.total.usdt = payload
        },
        setBinanceTotalTry (state, payload) {
            state.exchanges.binance.total.try = payload
        },
        setFtxBalances (state, payload) {
            state.exchanges.ftx.balances = payload
        },
        setFtxAvailable (state, payload) {
            state.exchanges.ftx.available = payload
        },
        setFtxTotalUsdt (state, payload) {
            state.exchanges.ftx.total.usdt = payload
        },
        setFtxTotalTry (state, payload) {
            state.exchanges.ftx.total.try = payload
        },
        setBankTotalUsd (state, payload) {
            state.exchanges.bank.total.usd = payload
        },
        setBankTotalTry (state, payload) {
            state.exchanges.bank.total.try = payload
        },
    },
    getters: {
        getExchanges: state => {
            return state.exchanges
        }
    },
    actions: {
        async createWalletData({commit,rootGetters}){
            await Promise.all([rootGetters['apiModule/getBinanceClient'].getAccountInformation(),rootGetters['apiModule/getFtxClient'].getBalances()]).then(response=>{
                let binance = response[0].balances
                let ftx = response[1].result
                let binance_result = []
                let ftx_result = []
                let binance_grandTotal_usdt = 0
                // let binance_grandTotal_try = 0
                let ftx_grandTotal_usdt = 0
                // let ftx_grandTotal_try = 0
                binance.forEach(element => {
                   if(parseFloat(element.free) > 0 || parseFloat(element.availableWithoutBorrow) > 0){
                      element.where="BINANCE"
                      element.total=parseFloat(element.free)+parseFloat(element.locked)
                      element.usdt = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:element.total,asset:element.asset})
                      // element.tryl = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:element.usd,asset:element.asset})
                      delete element.free
                      delete element.locked
                      binance_grandTotal_usdt = binance_grandTotal_usdt + parseFloat(element.usdt)
                      // binance_grandTotal_try = binance_grandTotal_try + parseFloat(element.tryl)
                      binance_result.push(element)
                   }
                });
                ftx.forEach(element => {
                  if(parseFloat(element.free) > 0 || parseFloat(element.availableWithoutBorrow) > 0){
                    element.where="FTX"
                    element.asset=element.coin
                    element.usdt=element.usdValue
                    // element.tryl = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:element.usd,asset:element.asset})
                    delete element.coin
                    delete element.availableWithoutBorrow
                    delete element.free
                    delete element.spotBorrow
                    delete element.usdValue
                    ftx_grandTotal_usdt = ftx_grandTotal_usdt + parseFloat(element.usdt)
                    // ftx_grandTotal_try = ftx_grandTotal_try + parseFloat(element.tryl)
                    ftx_result.push(element)
                 }
                })
                // ASSIGNMENT SECTION //
                /* BINANCE */
                commit('setBinanceBalances',binance_result) 
                commit('setBinanceAvailable',Object.keys(binance_result).length)
                commit('setBinanceTotalUsdt',binance_grandTotal_usdt)
                // commit('setBinanceTotalTry',binance_grandTotal_try)

                /* FTX */
                commit('setFtxBalances',ftx_result)
                commit('setFtxAvailable',Object.keys(ftx_result).length)
                commit('setFtxTotalUsdt',ftx_grandTotal_usdt)
                // commit('setFtxTotalTry',ftx_grandTotal_try)
              })
        }
    },
  }