<template>
  <div class="col-12 col-md-6 g-2">
    <div class="card p-2">
    <ccv-donut-chart class="donut" :data="coinData" :options="getOptions"></ccv-donut-chart>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
Vue.use(chartsVue);
export default {
  name: "DonutChart",
  props: ["cols","md","coin-data","height_pr","type"],
  components:{
  },
  data() {
    return {
      options: {
        resizable: true,
        legend: {
          alignment: "center",
        },
        donut: {
          center: {
            label: this.type,
          },
          alignment: "center",
          valueMapsto: "count",
        },
        height: this.height_pr,
      },
    }
  },
  computed:{
    getType:function(){
      return this.type
    },
    getOptions:function(){
      return this.options
    }
  }
};
</script>