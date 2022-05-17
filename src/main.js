import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/sass/main.scss'
import i18n from './i18n'
import { mapActions } from 'vuex'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  async created(){
    await this.connectAPIs()
  },
  methods:{
    ...mapActions({
      connectAPIs: 'apiModule/connect'
    })
  },
  render: h => h(App)
}).$mount('#app')
