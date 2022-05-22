const calculateUSDT = require('@/utils/calculate')
import axios from 'axios'
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
        async createWalletData({dispatch}){
            dispatch('BinanceBalances')
            dispatch('FtxBalances')     
        },
        async BinanceBalances({commit}){
            let binance = await axios.post('http://localhost:5000/binance/balances')
            commit('setBinanceBalances',binance.data.balances) 
            commit('setBinanceAvailable',Object.keys(binance.data.balances).length)
            commit('setBinanceTotalUsdt',parseFloat(binance.data.grandtotal))
        },
        async FtxBalances({commit}){
            let ftx = await axios.post('http://localhost:5000/ftx/balances')
            commit('setFtxBalances',ftx.data.balances)
            commit('setFtxAvailable',Object.keys(ftx.data.balances).length)
            commit('setFtxTotalUsdt',ftx.data.grandtotal)
        }
    },
  }