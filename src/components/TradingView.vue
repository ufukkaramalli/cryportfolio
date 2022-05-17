<template>
<div class="col-12 col-md-12 g-2">
    <div class="card p-2 text-dark" >
        <VueTradingView style="height:600px" :options="{symbol: `${symbols}`,theme: 'dark',autosize: true,allow_symbol_change: true,}"/>
    </div>
</div>
</template>

<script>
import VueTradingView from 'vue-trading-view';
export default {
  name: 'TradingView',
  props: {
    symb: String
  },
  components: {
    VueTradingView,
  },
  computed:{
      symbols: function(){
          return this.symb
      }
  }
}
</script>

<style>

</style>