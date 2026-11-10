import {createApp} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import './ABOUT-STYLES.css'
const routes=[
 {path:'/',name:'home',component:{template:'<div></div>'}},
 {path:'/about',name:'about',component:{template:'<div></div>'}},
 {path:'/experience',name:'experience',component:{template:'<div></div>'}},
 {path:'/products',name:'products',component:{template:'<div></div>'}},
 {path:'/products/:slug',name:'detail',component:{template:'<div></div>'}},
 {path:'/contact',name:'contact',component:{template:'<div></div>'}},
 {path:'/:pathMatch(.*)*',redirect:'/'}]
const router=createRouter({history: createWebHashHistory(),routes,
scrollBehavior(to, from, savedPosition) {
  if (
    to.path === '/products' &&
    from.path === '/products'
  ) {
    return false
  }

  if (savedPosition) {
    return savedPosition
  }

  return { top: 0, behavior: 'auto' }
}
})
createApp(App).use(router).mount('#app')
