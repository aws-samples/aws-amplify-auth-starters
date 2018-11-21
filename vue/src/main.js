import Vue from 'vue'
import VueRouter from 'vue-router'

// amplify configuration
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

// Vue components
import Auth from './components/Auth.vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Protected from './components/Protected.vue'
import Profile from './components/Profile.vue'

// Vuex store
import store from './store'

// global styles
require('./assets/main.css')

// route configuration
const routes = [
  { path: '/', component: Auth },
  { path: '/protected', component: Protected, meta: { requiresAuth: true} },
  { path: '/home', component: Home },
  { path: '/profile', component: Profile, meta: { requiresAuth: true} },
]

// router definition
const router = new VueRouter({
  routes
})

// implement protected routes for only signed in users
router.beforeResolve((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        next()
      } 
    }).catch((e) => {
      console.log('You are trying to access a protected route. Please sign in.')
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        }
      });
    });
  }
  next()
})

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  render: v => v(App),
  router: router,
  store
}).$mount('#app')
