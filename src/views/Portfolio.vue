<template>
    <div class="row g-0">
      <DonutChart :type="'USDT'" :height_pr="'350px'" :coin-data="getFTXvsBINANCEComparsion()"/>
      <DonutChart :type="currencyName" :height_pr="'350px'" :coin-data="localPrice" />
      <DonutChart :type="'USDT'" :height_pr="'350px'" :coin-data="getCoinsDataUsdt()"/>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import DonutChart from '@/components/DonutChart.vue'
export default {
  name: 'App',
  data: function() {
    return {
      coinData:[]
    }
  },
  components:{
    DonutChart
  },
  created(){
    this.localPrice = this.getFTXvsBINANCEComparsionLocale()
  },
  computed:{
    localPrice:{
      get(){
        return this.coinData
      },
      set(val){
        this.coinData = []
        this.coinData = this.getFTXvsBINANCEComparsionLocale()
      }
    },
    currencyName: function(){
      return this.$t('exchange.currencyName')
    },
    bankUsd:{
      get(){
        this.exchanges.bank.total.usd
      },
      set(value){
        this.excBankUsd(value)
      }
    },
    ...mapGetters({
      exchanges: 'exchangeModule/getExchanges',
      pools: 'poolModule/getPools',
      allMarketData: 'apiModule/getAllMarketData'
    })
  },
  methods: {
    calculateLocalPrice(val){
        let price = 0
        let arr = []
        let locale = "USDT"+this.$t('exchange.currencyName')
        switch (locale) {
        case 'USDTUSD':
            price = val
            return price
            break;
        case 'USDTTRY':
            arr = this.allMarketData.filter(element => element.symbol === "USDTTRY")
            price = val * arr[0].lastPrice
            return price
            break;
        case 'USDTEUR':
            arr = this.allMarketData.filter(element => element.symbol === "EURUSDT")
            price = (val / arr[0].lastPrice)
            return price
            break;
        default:
            console.log(`Sorry, we are out of ${locale}.`);
        }
    },
    getFTXvsBINANCEComparsion(){
      return [
        {
          group: "BINANCE",
          value: this.exchanges.binance.total.usdt,
        },
        {
          group: "FTX",
          value: this.exchanges.ftx.total.usdt,
        },
        {
          group: "BANK",
          value: this.exchanges.bank.total.usd,
        },
        {
          group: "EZIL",
          value: this.pools.ezil.total.usdt
        }
      ]
    },
    getFTXvsBINANCEComparsionLocale(){
      return [
        {
          group: "BINANCE",
          value: this.calculateLocalPrice(this.exchanges.binance.total.usdt),
        },
        {
          group: "FTX",
          value: this.calculateLocalPrice(this.exchanges.ftx.total.usdt),
        },
        {
          group: "BANK",
          value: this.calculateLocalPrice(this.exchanges.bank.total.usd),
        },
        {
          group: "EZIL",
          value: this.calculateLocalPrice(this.pools.ezil.total.usdt)
        }
      ]
    },
    getCoinsDataUsdt(){
      let binance = this.exchanges.binance.balances
      let ftx = this.exchanges.ftx.balances
      let bank = {group:"USDT",value:this.exchanges.bank.total.usd}
      let ezil = this.pools.ezil.balances
      let usd = {group:null,value:0}
      let binance_result = []
      let ftx_result = []
      let ezil_result = []
      ezil.forEach(element => {
        ezil_result.push({group:element.asset,value:element.usdt})
      })
      ftx.forEach(element => {
        if(element.asset === "USD"){
          usd.group = "USDT"
          usd.value = element.usdt
        }else{
          ftx_result.push({group:element.asset,value:element.usdt})
        }
      })
      binance.forEach(element => {
        if(element.asset === "USDT"){
          binance_result.push({group:element.asset,value:element.usdt+usd.value+bank.value})
        }else{
          binance_result.push({group:element.asset,value:element.usdt})
        }
      })
      let exc_result = binance_result.concat(ftx_result)
      let total_result = exc_result.concat(ezil_result)
      return total_result
    },
    ...mapMutations({
      excBankUsd:'exchangeModule/setBankTotalUsd'
      })
  },
  watch:{
      'exchanges': {
          handler() {
              this.localPrice = this.getFTXvsBINANCEComparsionLocale()
          },
          deep: true
      },
      '$i18n.locale': {
          handler(){
              this.localPrice = this.getFTXvsBINANCEComparsionLocale()
          },
          deep:true
      }
  }
}
</script>