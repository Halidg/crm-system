import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  state: {
    error:null
  },
  mutations: {
    setError(state,error){
       state.error=error
    },
    clearError(state){
      state.error = null
    }
  },
  getters:{
    error: s =>s.error
  },

  actions:{
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=0a7d418a03be7a4c2975a80e0c28af01`)
      return await res.json()
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
