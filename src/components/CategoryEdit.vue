<template>
<div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
            >{{c.name}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="name"
                :class="v$.name.$error==true
                  ? 'invalid'
                  : null"
          >
          <label for="name">Название</label>
            <small class="helper-text invalid"
              v-for="error of v$.name.$errors"
                  :key="error.$uid"
              >{{error.$message}}</small>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limit"
              :class="v$.limit.$error==true
                  ? 'invalid'
                  : null"
          >
          <label for="limit">Лимит</label>
        <small class="helper-text invalid"
          v-if="inLimit && v$.limit.$error">
          минимальная сумма {{v$.limit.minValue.$params.min}} </small>
        </div>

        <button class="btn waves-effect waves-light" type="submit" @click.prevent="bud">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required,  helpers,minValue } from '@vuelidate/validators'


export default {
  // props: {
  //   categories: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data(){
    return{
     select:null,
     v$: useValidate(),
     name:'',
     limit:100,
     current:null,
     categories:null
    }
  },
   validations(){
    return{
      name:{required:helpers.withMessage(`поле не может быть пустым`,required),$autoDirty: true},
      limit:{minValue:minValue(100),required:helpers.withMessage(`минимальная сумма 1р`,required),$autoDirty:true}
        }
    },
     computed:{
        inLimit(){
            if(this.limit<100){
                return true
            }
        }
    },
  //  watch: {
  //   current(catId) {
  //     const {name, limit} = categories.find(c => c.id === catId)
  //     this.name = name
  //     this.limit = limit
  //   }
  //  },  
  // created() {
  //   const {id, name, limit} = this.categories[0]
  //   this.current = id
  //   this.name = name
  //   this.limit = limit
  // },
 async mounted(){
  this.categories = await this.$store.dispatch('fetchCategories')
    const {id, name, limit} = this.categories[0]
    this.current = id
    this.name = name
    this.limit = limit
  this.select = M.FormSelect.init(this.$refs.select)
  M.updateTextFields()
  console.log(this.categories);
 
  },
  destroyed(){
    if(this.select&&this.select.destroy){
       this.select.destroy()
    }
  },
  
}
</script>

<style>

</style>