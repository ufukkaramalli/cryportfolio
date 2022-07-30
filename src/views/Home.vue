<template>
    <div class="row d-flex">
      <Exchange
        key="binance"
        :available="exchanges.binance.available" 
        :balances="exchanges.binance.balances" 
        :grand-total="exchanges.binance.total" 
      >
        <template #header>
          BINANCE
        </template>
      </Exchange>
      <Exchange
        key="ftx"
        :available="exchanges.ftx.available"
        :balances="exchanges.ftx.balances" 
        :grand-total="exchanges.ftx.total"
      >
        <template #header>
          FTX
        </template>
      </Exchange>
      <Exchange
        key="ezil"
        :available="pools.ezil.available"
        :balances="pools.ezil.balances" 
        :grand-total="pools.ezil.total"
      >
        <template #header>
          EZIL
        </template>
      </Exchange>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Exchange from '@/components/Exchange.vue'
export default {
  name: 'App',
  components:{
    Exchange
  },
  computed:{
    ...mapGetters({
      exchanges: 'exchangeModule/getExchanges',
      pools: 'poolModule/getPools'
    })
  },
}
</script>