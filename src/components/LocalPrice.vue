<template>
    <td class="align-middle" v-cloak>{{$n(localPrice,'currency')}}</td>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
props: ['priceData'],
data: () => ({
    price:null
}),
created(){
 this.localPrice = this.calculateLocalPrice()
},
methods:{
    calculateLocalPrice(){
        let price = 0
        let arr = []
        let locale = "USDT"+this.$t('exchange.currencyName')
        switch (locale) {
        case 'USDTUSD':
            price = this.priceData.quantity
            return price
            break;
        case 'USDTTRY':
            arr = this.allMarketData.filter(element => element.symbol === "USDTTRY")
            price = this.priceData.quantity * arr[0].lastPrice
            return price
            break;
        case 'USDTEUR':
            arr = this.allMarketData.filter(element => element.symbol === "EURUSDT")
            price = (this.priceData.quantity / arr[0].lastPrice)
            return price
            break;
        default:
            console.log(`Sorry, we are out of ${locale}.`);
        }
    }
},
computed:{
    localPrice:{
        get(){
            return this.price
        },
        set(val){
            this.price = parseFloat(val)
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