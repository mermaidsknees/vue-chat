import Vue from 'vue'
import firebase from 'firebase/app'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'Home Page',
    meta:{auth:true},
    component: () => import('@/views/Home.vue'),
    children:[
      {path:'/chat/:otherUserId', component: () => import('@/components/Chat.vue') }
    ]
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  },
  {
    path:'/register',
    name:'Register',
    component:() => import('@/components/Register.vue')
  }
]



const router = new VueRouter({
  mode:'history',
  routes
})


router.beforeEach((to,from,next) =>{
  
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record=>record.meta.auth)
  
  if(requireAuth && !currentUser){
    next('login')
  }
  else {
    next()
  }
  
})


export default router
