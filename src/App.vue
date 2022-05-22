<template>
  <div id="wrapper">
    <router-view name="Navigation"></router-view>
    <div class="container d-flex w-100 h-100 mx-auto flex-column py-4">
        <transition  :name="transitionName" mode="out-in">
          <router-view v-if="isLoading"/>
          <div class="row w-100" v-else>
            <div class="col-12">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status" style="width: 4.5rem;height: 4.5rem;">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <router-view name="Footer"></router-view>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({ 
      transitionName: null
      }),
    computed:{
      ...mapGetters({
        isLoading: 'getIsLoading'
      })
    },
    watch: {
    $route(to, from) {
      this.$store.commit('setIsLoading',false)
      if(this.transitionName === null){
        setTimeout(()=>{
          this.$store.commit('setIsLoading',true)
          this.transitionName = "slide-left"
        },1000)
      }else if(this.transitionName === "slide-right"){
        setTimeout(()=>{
          this.$store.commit('setIsLoading',true)
          this.transitionName = "slide-left"
        },1000)
      }else{
        setTimeout(()=>{
          this.$store.commit('setIsLoading',true)
          this.transitionName = "slide-right"
        },1000)
      }
    },
    '$i18n.locale': {
      handler(newVal,oldVal) {
        this.$store.commit('setIsLoading',false)
        setTimeout(()=>{
          this.$store.commit('setIsLoading',true)
        },1000)
        },
        deep: true
    }
  },
  }
</script>