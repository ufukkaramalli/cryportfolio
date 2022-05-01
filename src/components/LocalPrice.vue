<template>
    <td class="align-middle" v-cloak>{{localPrice | formatTotal}}</td>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
props: ['priceData','decimals'],
data: () => ({
    price:null
}),
created(){
 this.localPrice = this.calculateLocalPrice()
},
filters: {
    formatTotal: function(v){
        if(v){
            let value = v.toFixed(2)
            return value
        }
        
    }
},
methods:{
    calculateLocalPrice(){
        let price = 0
        let locale = "USDT"+this.$t('exchange.currencyName')
        this.allMarketData.find(element =>{
            if(element.symbol === locale){
                price = this.priceData.quantity * element.lastPrice
            }else if(locale === "USDTUSD"){
                price = this.priceData.quantity
            }
        })
        return price
    }
},
computed:{
    localPrice:{
        get(){
            return this.price
        },
        set(val){
            this.price = val
        }
    },
    ...mapGetters({
        allMarketData: 'apiModule/getAllMarketData'
    })
},
watch:{
    'priceData': {
        handler() {
            this.localPrice = this.calculateLocalPrice()
        },
        deep: true
    },
    '$i18n.locale': {
        handler(){
            this.localPrice = this.calculateLocalPrice()
        },
        deep:true
    }
}
}
</script>