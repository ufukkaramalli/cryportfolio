import axios from "axios"
const { Ezil } = require('@/plugins/ezil')
const { MainClient } = require('binance');
const { RestClient } = require('ftx-api');
export default {
    namespaced: true,
    state: {
        client: {
            ezil: null,
            binance: null,
            ftx: null
            },
        allMarketData:[],
    },
    mutations: {
        setEzil (state, n) {
            state.client.ezil = n
        },
        setBinance (state, n) {
            state.client.binance = n
        },
        setFtx (state, n) {
            state.client.ftx = n
        },
        setAllMarketData (state, n) {
            state.allMarketData = n
        },
    },
    getters: {
        getEzilClient: state => {
            return state.client.ezil
        },
        getBinanceClient: state => {
            return state.client.binance
        },
        getFtxClient: state => {
            return state.client.ftx
        },
        getAllMarketData: state => {
            return state.allMarketData
        }
    },
    actions: {
        async connect ({commit,dispatch}) {
            try {
                commit('setIsLoading',false,{root:true})
                var e = await axios.get('https://api.binance.com/api/v3/ticker/24hr')
                commit('setAllMarketData',e.data)
                commit('setBinance', new MainClient({api_key: process.env.VUE_APP_BINANCE_API_KEY, api_secret: process.env.VUE_APP_BINANCE_API_SECRET_KEY}))
                commit('setFtx', new RestClient(process.env.VUE_APP_FTX_API_KEY, process.env.VUE_APP_FTX_API_SECRET_KEY))
                commit('setEzil', new Ezil(process.env.VUE_APP_BINANCE_ETH_WALLET,process.env.VUE_APP_BINANCE_ZIL_WALLET))
                // ROUTING FOR CREATE WALLET DATA
                dispatch('exchangeModule/createWalletData',null,{root:true})
                dispatch('poolModule/createPoolData',null,{root:true})
                // ROUTING FOR CREATE POOL DATA
                commit('setIsLoading',true,{root:true})
            } catch (error) {
                console.log(error)
            }
        }
    },
  };