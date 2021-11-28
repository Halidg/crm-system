<template>
  <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
   <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="v$.email.$error==true
            ? 'invalid'
            : null"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
        v-for="error of v$.email.$errors"
            :key="error.$uid"
        >{{error.$message}}</small>
        
      </div>
       <div class="input-field">
        <input
            id="password"
            type="password"
             v-model.trim="password"
             :class="v$.password.$error==true
            ? 'invalid'
            : null"
        >
        <label for="password">Пароль</label>
     <small class="helper-text invalid"
        
        v-for="error of v$.password.$errors"
            :key="error.$uid"
        >{{error.$message}}</small>

        <small 
          class="helper-text invalid"
           v-if="inPassword && !v$.password.$error"
        >
          Пароль должен состоять из 6 символов. Сейчас он {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="v$.name.$error==true
            ? 'invalid'
            : null"
        >
        <label for="name">name</label>
        <small class="helper-text invalid"
        v-for="error of v$.name.$errors"
            :key="error.$uid"
        >{{error.$message}}</small>
      </div>
      <p>
        <label >
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/">Войти!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import useValidate from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'


export default {
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: '',
      name:'',
      agree: false
      
    }
  },
  validations(){
    return{
    email:{email:helpers.withMessage('введите корректный email',email),required:helpers.withMessage('поле не может быть пустым',required),$autoDirty: true},
    name:{required:helpers.withMessage('поле не может быть пустым',required),$autoDirty: true},
    password:{required:helpers.withMessage(`пароль не может быть пустым`,required),$autoDirty: true}
    
     }
   
  },

   computed:{
    inPassword(){
       if(this.password.length<6){
           return true
       }
    }
  },
  methods:{
  async  submitForm(){
            this.v$.$touch()
            if (this.v$.email.$error && this.v$.password.$error && this.v$.name.$error && this.agree){
              return
            }
          const formData = {
           email: this.email,
           password: this.password,
           name:this.name
       }
            
            try{
              await this.$store.dispatch('register',formData)
              this.$router.push('/')
            }catch (e){
              
            }
    }
   
  }
}
</script>

