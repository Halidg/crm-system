import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './message.plugin'
import Loader from './components/app/Loader'
import billss from './billss'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import translate from './translate'


const firebaseConfig = 
   {
      apiKey: "AIzaSyAd0vI0DsyATssdUOnZUePtS-wLItk78Ks",
      authDomain: "vue-last-28791.firebaseapp.com",
      projectId: "vue-last-28791",
      storageBucket: "vue-last-28791.appspot.com",
      messagingSenderId: "195892287144",
      appId: "1:195892287144:web:88ffe0d2807a89373a549d"
    }
 ;

 firebase.initializeApp(firebaseConfig)


let app

   

    firebase.auth().onAuthStateChanged(()=>{
       if (!app){
        app = createApp(App)
          .use(store)
          .use(router)
          .use(messagePlugin)
          .use(billss)
          .use(translate)
          .component('Loader',Loader)
          .mount('#app')
       }
    })
    
   

   

