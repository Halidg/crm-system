import store from './store'

export default {
   install(app,options){
      app.config.globalProperties.$translate = key => {
        const locales = {
            'ru-RU': {
              ProfileTitle:'Профиль'
            },
            'en-US': {
              ProfileTitle: 'Profile'
            }
         }
              const locale = store.getters.info.locale || 'ru-RU'
              return locales[locale][key] || `[Localize error]:key ${key} not found`
      } 
   } 
}