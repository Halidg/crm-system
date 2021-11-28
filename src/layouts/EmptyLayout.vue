<template>
    <div class="grey darken-1 empty-layout">
        <router-view></router-view>
    </div>
</template>


<script>
import messages from '../messages'


export default {
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
