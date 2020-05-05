import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/login')
const Index = () => import('@/index')
const NotFound = () => import('@/exception/notFound')
const Welcome = () => import('@/exception/welcome')

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome,
          meta: {
            tagTitle: '欢迎页',
            title: '欢迎页_后台管理系统'
          }
        },
        {
          path: '/notFound',
          name: 'notFound',
          component: NotFound,
          meta: {
            tagTitle: '该网页正在建设中……',
            title: '正在建设中'
          }
        },
        {
          path: '/*',
          redirect: {
            name: 'notFound'
          }
        }
      ]
    }
  ]
})

// 路由守卫，常用于验证权限等
router.beforeEach((to, from, next) => {
  next()
})

export default router
