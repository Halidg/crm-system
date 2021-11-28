<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loader" />
    
    <div v-else class="row">
     <home-bill
      :rates="currency.rates">
      </home-bill>  
     <home-currency></home-currency>
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/app/HomeBill.vue'
import HomeCurrency from '../components/app/Homecurrency.vue'

export default {
  name: 'home',
  components:{HomeBill,HomeCurrency},
  data(){
    return{
      loader: true,
      currency:null
    }
  },
  async mounted(){
  this.currency = await this.$store.dispatch('fetchCurrency')
  console.log(this.currency);
  this.loader = false
  }
}
</script>
