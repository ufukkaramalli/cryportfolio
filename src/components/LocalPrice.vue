<template>
    <td class="align-middle" v-cloak>{{localPrice}}</td>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
props: ['priceData'],
data: () => ({
    price:null
}),
created(){
 this.localPrice = this.priceData.quantitiy
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
      handler(newValue, oldValue) {
        this.localPrice = newValue.quantitiy
      },
      deep: true
    }
}
}
</script>