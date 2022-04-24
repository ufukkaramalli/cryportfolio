import {calculateUSD,calculateTRY} from '@/utils/calculate'
export default {
    namespaced: true,
    state: {
        exchanges:{
            binance: {
              balances: [],
              available:null,
              total:{
                usd:0,
                try:0
              }
            },
            ftx: {
              balances: [],
              available:null,
              total:{
                usd:null,
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
        setBinanceTotalUsd (state, payload) {
            state.exchanges.binance.total.usd = payload
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
        setFtxTotalUsd (state, payload) {
            state.exchanges.ftx.total.usd = payload
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
                let binance_grandTotal_usd = 0
                let binance_grandTotal_try = 0
                let ftx_grandTotal_usd = 0
                let ftx_grandTotal_try = 0
                binance.forEach(element => {
                   if(parseFloat(element.free) > 0 || parseFloat(element.availableWithoutBorrow) > 0){
                      element.where="BINANCE"
                      element.total=parseFloat(element.free)+parseFloat(element.locked)
                      element.usd = calculateUSD(rootGetters['apiModule/getAllMarketData'],{value:element.total,asset:element.asset})
                      element.tryl = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:element.usd,asset:element.asset})
                      delete element.free
                      delete element.locked
                      binance_grandTotal_usd = binance_grandTotal_usd + parseFloat(element.usd)
                      binance_grandTotal_try = binance_grandTotal_try + parseFloat(element.tryl)
                      binance_result.push(element)
                   }
                });
                ftx.forEach(element => {
                  if(parseFloat(element.free) > 0 || parseFloat(element.availableWithoutBorrow) > 0){
                    element.where="FTX"
                    element.asset=element.coin
                    element.usd=element.usdValue
                    element.tryl = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:element.usd,asset:element.asset})
                    delete element.coin
                    delete element.availableWithoutBorrow
                    delete element.free
                    delete element.spotBorrow
                    delete element.usdValue
                    ftx_grandTotal_usd = ftx_grandTotal_usd + parseFloat(element.usd)
                    ftx_grandTotal_try = ftx_grandTotal_try + parseFloat(element.tryl)
                    ftx_result.push(element)
                 }
                })
                // ASSIGNMENT
                commit('setBinanceBalances',binance_result) 
                commit('setBinanceAvailable',Object.keys(binance_result).length)
                commit('setBinanceTotalUsd',binance_grandTotal_usd)
                commit('setBinanceTotalTry',binance_grandTotal_try)
                commit('setFtxBalances',ftx_result)
                commit('setFtxAvailable',Object.keys(ftx_result).length)
                commit('setFtxTotalUsd',ftx_grandTotal_usd)
                commit('setFtxTotalTry',ftx_grandTotal_try)
              })
        }
    },
  }