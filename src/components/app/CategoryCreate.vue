<template>
   <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>Создать</h4>
        </div>

    <form @submit.prevent="submitForm">
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

      <button class="btn waves-effect waves-light" type="submit">
        Создать
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
    data(){
        return{
            v$: useValidate(),
            name:'',
            limit:100
        }
    } ,
    validations(){
        return{
            name:{required:helpers.withMessage(`поле не может быть пустым`,required),$autoDirty: true},
            limit:{minValue:minValue(100),required:helpers.withMessage(`минимальная сумма 1р`,required),$autoDirty:true}
        }
    } ,
    
    computed:{
        inLimit(){
            if(this.limit<100){
                return true
            }
        }
        
    },
    methods:{
    async  submitForm(){
      console.log(1);
        this.v$.$touch()
           if (this.v$.name.$error && this.v$.limit.$error){
            return
            }
          try {
          const category = await this.$store.dispatch('createCategory', {
            name: this.name,
            limit: this.limit
        })
            console.log(2);
            this.name = ''
            this.limit = 100
            this.v$.$reset()
            this.$message('Категория была создана')
            this.$emit('created', category)
      }catch(e){
        console.log(e);
      }
        
      }
    },

    mounted(){
      M.updateTextFields()
    }
}
</script>

<style>

</style>