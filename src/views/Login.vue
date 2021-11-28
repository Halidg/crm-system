<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>

import useValidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import router from "@/router"
import messages from '../messages'

export default {
 data() {
    return {
      v$: useValidate(),
      email: '',
      password: '',
      text:'введите пароль',
     
    }
  },
  validations(){
    return{
    email:{email:helpers.withMessage('введите корректный email',email),required:helpers.withMessage('поле не может быть пустым',required),$autoDirty: true},
    password:{required:helpers.withMessage(`пароль не может быть пустым`,required),$autoDirty: true}
     }
   
  },
   mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods:{
   async submitHandler(){
        this.v$.$touch()
           if (this.v$.email.$error && this.v$.password.$error){
            return
            }
          const formData = {
          email: this.email,
          password: this.password
      }
         try {
         await this.$store.dispatch('login', formData)
         router.push('/')
       } catch (e) {}
    }
  },
  computed:{
    inPassword(){
       if(this.password.length<6){
           return true
       }
    }
  },
  
  
  
}
</script>
