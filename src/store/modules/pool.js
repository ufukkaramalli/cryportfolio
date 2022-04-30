import {calculateUSDT,calculateTRY} from '@/utils/calculate'
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
                    /* try:0 */
                  },
                  {
                    asset:"ETC",
                    balance:0,
                    usdt:0,
                    /* try:0 */
                  },
                  {
                    asset:"ZIL",
                    balance:0,
                    usdt:0,
                    /* try:0 */
                  }
              ],
              available:null,
              total:{
                usd:0,
                /* try:0 */
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
            /* let ETH_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ETH_USD,asset:"ETH"}) */
            let ETC_USDT = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:result.data.etc,asset:"ETC"})
            /* let ETC_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ETC_USD,asset:"ETC"}) */
            let ZIL_USDT = calculateUSDT(rootGetters['apiModule/getAllMarketData'],{value:result.data.zil,asset:"ZIL"})
            /* let ZIL_TRY = calculateTRY(rootGetters['apiModule/getAllMarketData'],{value:ZIL_USD,asset:"ZIL"}) */
            let ezil_balances = [
                {
                asset:"ETH",
                total:result.data.eth,
                usdt:ETH_USDT,
                /* tryl:ETH_TRY */
                },
                {
                asset:"ETC",
                total:result.data.etc,
                usdt:ETC_USDT,
                /* tryl:ETC_TRY */
                },
                {
                asset:"ZIL",
                total:result.data.zil,
                usdt:ZIL_USDT,
                /* tryl:ZIL_TRY */
                }
            ] 
            let total_usdt = ETH_USDT + ETC_USDT + ZIL_USDT
            /* let total_try = ETH_TRY + ETC_TRY + ZIL_TRY */
            commit('setEzilBalances',ezil_balances)
            commit('setEzilAvailable',3)
            commit('setEzilTotalUSDT',total_usdt)
            /* commit('setEzilTotalTRY',total_try) */
        }
    },
  };