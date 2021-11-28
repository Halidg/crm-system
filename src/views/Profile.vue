<template>
  <div>
    <div class="page-title">
      <h3>{{filterLang('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="submitForm">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="v$.name.$error==true
              ? 'invalid'
              : null"
        >
        <label for="description">name</label>
         <small class="helper-text invalid"
              v-for="error of v$.name.$errors"
                  :key="error.$uid"
              >{{error.$message}}</small>
      </div>
       
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{filterLang('ButtonTitle')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
import useValidate from '@vuelidate/core'
import { required,  helpers } from '@vuelidate/validators'

export default {
  data(){
     return{
       v$: useValidate(),
       name:'',
       isRuLocale:true
     }
  },
  validations(){
    return{
      name:{required:helpers.withMessage(`поле не может быть пустым`,required),$autoDirty: true},
        }
    },
  computed:{
    ...mapGetters(['info'])
  },
  mounted(){
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
     setTimeout(()=>{
       M.updateTextFields()
     })
  },
  methods:{
   ...mapActions(['updateInfo']),
   async submitForm(){
     this.v$.$touch()
      if (this.v$.name.$error){
      return
      }
      try{
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      }catch(e){
        throw e
      }
    },
    filterLang(key){
         const locales = {
            'ru-RU': {
              ProfileTitle:'Профиль',
              ButtonTitle:'обновить'
            },
            'en-US': {
              ProfileTitle: 'Profile',
              ButtonTitle:'update'
            }
         }
              const locale = this.$store.getters.info.locale || 'ru-RU'
              return locales[locale][key] || `[Localize error]:key ${key} not found`
      } 
   } 
}
</script>

<style  scoped>
    .switch{
      margin-bottom: 2rem;
    }
</style>