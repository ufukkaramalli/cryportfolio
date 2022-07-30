<template>
<section class="col-12 mb-4 exchange" v-if="!balances.length == 0">
    <figure class="card border-light p-3">
        <table class="table caption-top table-striped table-dark mb-0 table-hover">
            <caption>
                <div class="d-flex align-items-end text-light">
                    <h1>
                        <slot name="header"></slot>
                    </h1>
                </div>
            </caption>
            <thead class="table-light">
                <tr class="d-flex">
                    <th style="width: 60%;"></th>
                    <th style="width: 20%;">{{$t('exchange.quantity')}}</th>
                    <th style="width: 20%;">USDT</th>
                    <th style="width: 20%;">{{$t('exchange.currencyName')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="balance in balances" :key="balance.asset" class="table-complete-item d-flex">
                    <th style="width: 60%;" class="d-flex flex-fill align-items-center text-start align-middle cryptoasset">
                        <IconCrypto v-cloak :coinname="balance.asset" color="white" format="svg" />
                        <span class="asset">{{balance.asset}}</span>
                    </th>
                    <th style="width: 20%;" class="align-middle">
                        {{ balance.total | formatTotal }}
                    </th>
                    <th style="width: 20%;" class="align-middle">
                        {{ balance.usdt | formatTotal }}
                    </th>
                    <local-price :priceData="{asset:balance.asset,quantity:balance.usdt}"/>
                </tr>
            </tbody>
            <tfoot class="table-light">
                <tr class="d-flex">
                    <th style="width: 60%;"></th>
                    <th style="width: 20%;" class="text-end">{{$t('exchange.grandtotal')}}</th>
                    <th style="width: 20%;">{{  grandTotal.usdt | formatTotal}}</th>
                    <local-price :priceData="{asset:'USDT',quantity:grandTotal.usdt}"/>
                </tr>
            </tfoot>
        </table>
    </figure>
</section>
<section class="col-12 exchange" v-else>
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
                    <th class="text-start">{{$t('exchange.information.noData')}}</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
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
    computed:{
        ...mapGetters({
            isLoading: 'getIsLoading'
        })
    },
    filters: {
        formatTotal: function(v){
            if(v){
                let value = v.toFixed(2)
                return value
            }
            
        }
    }
  }
</script>
