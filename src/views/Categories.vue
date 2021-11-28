<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading"/>
      <div class="row" v-else>
       <category-create @create="addCategory"></category-create>
       <category-edit
       
       ></category-edit>
      </div>
    </section>
  </div>
</template>


<script>

import CategoryCreate from '../components/app/CategoryCreate.vue'
import Loader from '../components/app/Loader.vue'
import CategoryEdit from '../components/CategoryEdit.vue'

export default {
  components:{CategoryCreate,CategoryEdit, Loader},
  data(){
    return{
      categories:[],
      loading:false
    }
  },
 async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories);
    this.loading = false
    
   
  },
  methods:{
    addCategory(category){
       this.categories.push(category)
    }
  }
}


</script>
