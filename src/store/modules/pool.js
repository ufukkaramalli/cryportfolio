import {calculateUSD,calculateTRY} from '@/utils/calculate'
export default {
    namespaced: true,
    state: {
        pools:{
            ezil: {
              balances:[
                  {
                    asset:"ETH",
                    balance:0,
                    usd:0,
                    try:0
                  },
                  {
                    asset:"ETC",
                    balance:0,
                    usd:0,
                    try:0
                  },
                  {
                    asset:"ZIL",
                    balance:0,
                    usd:0,
                    try:0
                  }
              ],
              available:null,
              total:{
                usd:0,
                try:0
              }
            },
        },
    },
    mutations: {
        setEzilBalances (state, payload) {
            state.pools.ezil.balances = payload
        },
        setEzilTotalUSD (state, payload) {
            state.pools.ezil.total.usd = payload
        },
        setEzilTotalTRY (state, payload) {
            state.pools.ezil.total.try = payload
        },
        setEzilAvailable (state, payload) {
            state.pools.ezil.total.try = payload
        },
    },
    getters: {
        getPools: state => {
            return state.pools
        },
    },
    actions: {
        async createPoolData({rootGetters,commit}){
            var result = await rootGetters['apiModule/getEzilClient'].getBalances()
            let ETH_USD = calculateUSD(rootGetters['apiModule/getAllMarketData'],{value:result.data.eth,asset:"ETH"})
            let ETH_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ETH_USD,asset:"ETH"})
            let ETC_USD = calculateUSD(rootGetters['apiModule/getAllMarketData'],{value:result.data.etc,asset:"ETC"})
            let ETC_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ETC_USD,asset:"ETC"})
            let ZIL_USD = calculateUSD(rootGetters['apiModule/getAllMarketData'],{value:result.data.zil,asset:"ZIL"})
            let ZIL_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ZIL_USD,asset:"ZIL"})
            let ezil_balances = [
                {
                asset:"ETH",
                total:result.data.eth,
                usd:ETH_USD,
                tryl:ETH_TRY
                },
                {
                asset:"ETC",
                total:result.data.etc,
                usd:ETC_USD,
                tryl:ETC_TRY
                },
                {
                asset:"ZIL",
                total:result.data.zil,
                usd:ZIL_USD,
                tryl:ZIL_TRY
                }
            ] 
            let total_usd = ETH_USD + ETC_USD + ZIL_USD
            let total_try = ETH_TRY + ETC_TRY + ZIL_TRY
            commit('setEzilBalances',ezil_balances)
            commit('setEzilAvailable',3)
            commit('setEzilTotalUSD',total_usd)
            commit('setEzilTotalTRY',total_try)
        }
    },
  };