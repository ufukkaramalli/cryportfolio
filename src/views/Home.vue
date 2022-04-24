<template>
    <div class="row g-2">
      <Exchange
        :available="exchanges.binance.available" 
        :balances="exchanges.binance.balances" 
        :grand-total="exchanges.binance.total" 
      >
        <template #header>
          BINANCE
        </template>
        <template #secondary>
          EXCHANGE
        </template>
      </Exchange>
      <Exchange 
        :available="exchanges.ftx.available"
        :balances="exchanges.ftx.balances" 
        :grand-total="exchanges.ftx.total"
      >
        <template #header>
          FTX
        </template>
        <template #secondary>
          EXCHANGE
        </template>
      </Exchange>
      <Exchange 
        :available="pools.ezil.available"
        :balances="pools.ezil.balances" 
        :grand-total="pools.ezil.total"
      >
        <template #header>
          EZIL
        </template>
        <template #secondary>
          POOLS
        </template>
      </Exchange>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Exchange from '@/components/Exchange.vue'
export default {
  name: 'App',
  data: function() {
    return {
    }
  },
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