<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

     <Loader v-if="loading"/>

     <p class="center" v-else-if="!categories.length">категорий пока нет.<router-link to="/categories">add new category</router-link></p>

    <form class="form" v-else @submit.prevent="submitForm">
      <div class="input-field" >
        <select ref="select" v-model="category">
             <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
            >{{c.name}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amout"
            :class="v$.amout.$error==true
            ? 'invalid'
            : null"
        >
          <label for="limit">сумма</label>
          <small class="helper-text invalid"
          v-if="inAmout && v$.amout.$error">
          минимальная сумма {{v$.amout.minValue.$params.min}} </small>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="v$.description.$error==true
            ? 'invalid'
            : null"
        >
        <label for="name">Название</label>
          <small class="helper-text invalid"
            v-for="error of v$.description.$errors"
            :key="error.$uid"
            >{{error.$message}}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required,  helpers,minValue } from '@vuelidate/validators'
import Loader from '../components/app/Loader.vue'
import {mapGetters} from 'vuex'

export default {
 data(){
   return{
     v$: useValidate(),
     loading:true,
     categories:[],
     select:null,
     category:null,
     type:'income',
     amout:100,
     description:''
   }
 },
  validations(){
  return{
    description:{required:helpers.withMessage(`поле не может быть пустым`,required),$autoDirty: true},
    amout:{minValue:minValue(100),required:helpers.withMessage(`минимальная сумма 1р`,required),$autoDirty:true}
      }
  },
 async mounted(){
   this.categories = await this.$store.dispatch('fetchCategories')
   this.loading=false

   if (this.categories.length){
     this.category = this.categories[0].id
   }

   setTimeout(()=>{
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
   },0)
  },
   destroyed(){
    if(this.select&&this.select.destroy){
       this.select.destroy()
    }
  },
  components:{Loader},
  methods:{
  async submitForm(){
     this.v$.$touch()
     if (this.v$.amout.$error && this.v$.description.$error){
     return
    }
    if(this.canCreate){
     try{ await  this.$store.dispatch('createRecord',{
        categoryId:this.category,
        amout:this.amout,
        description: this.description,
        type: this.type,
        date: new Date().toJSON()
       })
       const bills = this.type === 'income'
        ? this.info.bills + this.amout
        : this.info.bills - this.amout
     
        await this.$store.dispatch('updateInfo',{bills})
        this.$message('Запись успешно создана')
        this.amout = 100
        this.description= ''
       }catch(e){
         throw e
       }
   
    }else{
      this.$message(`Недостаточно средств на счете (${this.amout - this.info.bills})`)
    }
  }
  },
  computed:{
   inAmout(){
    if(this.amout<100){
        return true
      }
    },
    canCreate(){
      if(this.type==='income'){
        return true
      }
        return this.info.bills >= this.amout
    },
    ...mapGetters(['info']),
  }
}
</script>