<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light px-4 py-4 d-flex justify-content-end">
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({ 
      languageArray: []
    }),
    async created(){
        this.languageArray = this.$i18n.availableLocales
        
    },
    methods:{
      ...mapActions({
        connectAPIs: 'apiModule/connect'
      })
    },
}
</script>

<style>

</style>