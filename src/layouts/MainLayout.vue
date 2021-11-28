<template>
  <div class="app-main-layout">
    
    <Navbar  @click="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />
    
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" > 
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/app/Sidebar.vue' 
import Navbar from '../components/app/Navbar.vue'
import messages from '../messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),

 async mounted(){
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  },
   computed:{
     error(){
         return this.$store.getters.error
     } 
  },
  watch:{
      error(fbError){
         this.$error(messages[fbError.code] || 'что-то пошло не так')
      }
  }
}
</script>