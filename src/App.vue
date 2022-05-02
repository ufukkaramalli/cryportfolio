<template>
  <div class="container d-flex w-100 h-100 mx-auto flex-column">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light px-2 py-4 d-flex justify-content-end">
      <h3 class="flex-grow-1 text-start mb-0 text-dark">CRYPTO ANALYSIS</h3>
      <nav class="nav nav-pills nav-fill links">
        <router-link class="nav-link text-decoration-none" :to="{ name: 'Home' }" active-class="active bg-dark text-light" exact>{{$t('menu.home')}}</router-link>
        <router-link class="nav-link text-decoration-none" :to="{ name: 'Portfolio' }" active-class="active bg-dark text-light">{{$t('menu.portfolio')}}</router-link>
      </nav>
      <a class="nav-link text-decoration-none" @click.prevent="connectAPIs()" type="submit"><i class="mdi mdi-18px mdi-sync"></i></a>
      <div class="lang-dropdown">
        <select class="form-select" v-model="$i18n.locale">
          <option
            v-for="(lang, i) in languageArray"
            :key="`lang${i}`"
            :value="lang"
          >
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>
    </nav>
    <main class="py-3" style="height:100%;">
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
    </main>
    <footer class="mt-auto text-white-50">
      <p>2022</p>
    </footer>
  </div>
</template>
<script>
  import { mapActions,mapGetters } from 'vuex'
  export default {
    data: () => ({ 
      drawer: false, 
      transitionName: null,
      languageArray: ['en', 'tr']
      }),
    async created(){
      await this.connectAPIs()
    },
    computed:{
      ...mapGetters({
        isLoading: 'getIsLoading'
      })
    },
    methods:{
      ...mapActions({
        connectAPIs: 'apiModule/connect'
      })
    },
    watch: {
    $route(to, from) {
      if(this.transitionName === null){
        this.transitionName = "slide-left"
      }else if(this.transitionName === "slide-right"){
        this.transitionName = "slide-left"
      }else{
        this.transitionName = "slide-right"
      }
    },
  },
  }
</script>