<template>
<div class="col-12 col-md-12 g-2">
    <div class="card p-2 text-dark" >
        <VueTradingView style="height:600px" :options="opt"/>
    </div>
</div>
</template>
<script>
import VueTradingView from 'vue-trading-view';
export default {
  name: 'TradingView',
  props: ['symb'],
  data: () => ({
    symbol: null
  }),
  components: {
    VueTradingView,
  },
  created(){
    this.getSymbols = this.symb
  },
  computed:{
      getSymbols:{
        get(){
          return this.symbol
        },
        set(val){
          this.symbol = val
        }
      },
      opt:{
        get(){
          return {
            symbol:this.getSymbols,
            theme: 'dark',
            autosize: true,
            allow_symbol_change: false,
            show_popup_button: true,
            popup_width:1000,
            popup_height:650,
            hide_legend:true
          }
        }
      }
  }
}
</script>

<style>

</style>