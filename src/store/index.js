import Vue from 'vue'
import Vuex from 'vuex'
import apiModule from './modules/api'
import exchangeModule from './modules/exchange'
import poolModule from './modules/pool'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true
  },
  getters: {
    getIsLoading: state => {
      return state.isLoading
    }
  },
  mutations: {
    setIsLoading (state, n) {
      state.isLoading = n
  },
  },
  actions: {
  },
  modules: {
    apiModule,
    exchangeModule,
    poolModule
  }
})
