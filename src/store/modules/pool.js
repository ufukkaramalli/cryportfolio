const calculateUSDT = require('@/utils/calculate') 
export default {
    namespaced: true,
    state: {
        pools:{
            ezil: {
              balances:[
                  {
                    asset:"ETH",
                    balance:0,
                    usdt:0,
                  },
                  {
                    asset:"ETC",
                    balance:0,
                    usdt:0,
                  },
                  {
                    asset:"ZIL",
                    balance:0,
                    usdt:0,
                  }
              ],
              available:null,
              total:{
                usd:0,
              }
            },
        },
    },
    mutations: {
        setEzilBalances (state, payload) {
            state.pools.ezil.balances = payload
        },
        setEzilTotalUSDT (state, payload) {
            state.pools.ezil.total.usdt = payload
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
            let ETH_USDT = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:result.data.eth,asset:"ETH"})
            let ETC_USDT = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:result.data.etc,asset:"ETC"})
            let ZIL_USDT = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:result.data.zil,asset:"ZIL"})
            let ezil_balances = [
                {
                asset:"ETH",
                total:result.data.eth,
                usdt:ETH_USDT,
                },
                {
                asset:"ETC",
                total:result.data.etc,
                usdt:ETC_USDT,
                },
                {
                asset:"ZIL",
                total:result.data.zil,
                usdt:ZIL_USDT,
                }
            ] 
            let total_usdt = ETH_USDT + ETC_USDT + ZIL_USDT
            commit('setEzilBalances',ezil_balances)
            commit('setEzilAvailable',3)
            commit('setEzilTotalUSDT',total_usdt)
        }
    },
  };