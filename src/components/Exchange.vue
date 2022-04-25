<template>
<div class="col-12 col-md-6 exchange" v-if="isLoading">
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
                    <th>USD</th>
                    <th>TRY</th>
                </tr>
            </thead>
            <transition-group name="table-complete" mode="out-in" tag="tbody">
            <tr v-for="balance in balances" :key="balance.asset" class="table-complete-item">
                <th class="d-flex flex-fill align-items-center text-start align-middle cryptoasset"><IconCrypto :coinname="balance.asset" color="white" format="svg" /><span class="asset">{{balance.asset}}</span></th>
                <td class="align-middle">{{ balance.total | formatTotal}}</td>
                <td class="align-middle">{{  balance.usd | formatUsd}}</td>
                <td class="align-middle">{{ balance.tryl | formatTry}}</td>
            </tr>
            </transition-group>
            <tfoot class="table-light">
                <tr>
                    <th></th>
                    <th class="text-end">{{$t('exchange.grandtotal')}}</th>
                    <th>{{  grandTotal.usd | formatUsd}}</th>
                    <th>{{  grandTotal.try | formatTry}}</th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<b-col v-else>
    <b-table-simple dark striped caption-top responsive>
        <caption><div class="d-flex align-items-center"><h1><slot name="header"></slot>/ </h1><small class="mt-3 ml-4"><slot name="secondary"></slot></small></div></caption>
        <b-thead>
            <b-tr>
                <b-th>Information</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr>
                <b-th>There is no data to show.</b-th>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</b-col>
</template>
<script>
import Vue from "vue";
import IconCrypto from "vue-cryptocurrency-icons";
import { mapGetters } from 'vuex'
Vue.use(IconCrypto);
  export default {
    name: 'Exchange',
    data: () => ({
    }),
    props: ['balances','grandTotal','available'],
    methods:{ 
    },
    computed:{
      ...mapGetters({
      isLoading: 'getIsLoading'
      })
    },
    filters: {
        formatUsd: function(v) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return formatter.format(v)
        },
        formatTry: function(v) {
        var formatter = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        });
        return formatter.format(v)
        },
        formatTotal: function(v){
            if(v){
                let value = v.toFixed(4)
                return value
            }
            
        }
    }
  }
</script>
