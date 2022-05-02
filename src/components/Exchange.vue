<template>
<div class="col-12 col-md-6 exchange" v-if="!balances.length == 0">
    <div class="card border-light p-3">
        <table class="table caption-top table-striped table-dark mb-0 table-hover">
            <caption>
                <div class="d-flex align-items-end text-light">
                    <h1><slot name="header"></slot>|</h1>
                    <h5 class="text-muted"><slot name="secondary"></slot></h5>
                </div>
            </caption>
            <thead class="table-light">
                <tr>
                    <th></th>
                    <th>{{$t('exchange.quantity')}}</th>
                    <th>USDT</th>
                    <th>{{$t('exchange.currencyName')}}</th>
                </tr>
            </thead>
            <transition-group name="table-complete" mode="out-in" tag="tbody">
            <tr v-for="balance in balances" :key="balance.asset" class="table-complete-item">
                <th class="d-flex flex-fill align-items-center text-start align-middle cryptoasset">
                    <IconCrypto v-cloak :coinname="balance.asset" color="white" format="svg" />
                    <span class="asset">{{balance.asset}}</span>
                </th>
                <td class="align-middle">
                    {{ balance.total | formatTotal }}
                </td>
                <td class="align-middle">
                    {{ balance.usdt | formatTotal }}
                </td>
                <keep-alive>
                    <local-price :priceData="{asset:balance.asset,quantity:balance.usdt}"/>
                </keep-alive>
            </tr>
            </transition-group>
            <tfoot class="table-light">
                <tr>
                    <th></th>
                    <th class="text-end">{{$t('exchange.grandtotal')}}</th>
                    <th>{{  grandTotal.usdt | formatTotal}}</th>
                    <local-price :priceData="{asset:'USDT',quantity:grandTotal.usdt}"/>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<div class="col-12 col-md-6 exchange" v-else>
    <div class="card border-light p-3">
        <table class="table caption-top table-striped table-dark mb-0 table-hover">
            <caption>
                <div class="d-flex align-items-end text-light">
                    <h1><slot name="header"></slot>|</h1>
                    <h5 class="text-muted"><slot name="secondary"></slot></h5>
                </div>
            </caption>
            <thead class="table-light">
                <tr>
                    <th class="text-start">Information:There is no data to show.</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
</template>
<script>
import Vue from "vue";
import IconCrypto from "vue-cryptocurrency-icons";
import localPrice from '@/components/LocalPrice';
import { mapGetters } from 'vuex'
Vue.use(IconCrypto);
  export default {
    name: 'Exchange',
    data: () => ({
    }),
    props: ['balances','grandTotal','available'],
    components:{
        localPrice
    },
    methods:{
    },
    computed:{
        ...mapGetters({
            isLoading: 'getIsLoading',
            allMarketData: 'apiModule/getAllMarketData'
        })
    },
    filters: {
        formatTotal: function(v){
            if(v){
                let value = v.toFixed(4)
                return value
            }
            
        }
    }
  }
</script>
