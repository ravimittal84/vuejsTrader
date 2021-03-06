import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import Stocks from '@/components/stocks/Stocks'
import StocksStock from '@/components/stocks/Stock'
import Portfolio from '@/components/portfolio/Portfolio'
import PortfolioStock from '@/components/portfolio/Stock'
import WelcomePage from '@/components/welcome/welcome.vue'
import DashboardPage from '@/components/dashboard/dashboard.vue'
import SignupPage from '@/components/auth/signup.vue'
import SigninPage from '@/components/auth/signin.vue'

import store from '../store';
// Lazy Loading
// const Category = () => System.import('@/components/Category');
// const Login = () => System.import('@/components/Login');
// const NotFound = () => System.import('@/components/NotFound');

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: '/', component: WelcomePage },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    {
      path: '/dashboard',
      component: DashboardPage,
      beforeEnter(to, from, next) {
        if (store.state.isAuthenticated) {
          next()
        } else {
          next('/') // send user to home path
        }
      }
    },
    {
      path: "/portfolio", component: Portfolio,
      beforeEnter(to, from, next) {
        if (store.state.isAuthenticated) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: "/stocks", component: Stocks,
      beforeEnter(to, from, next) {
        if (store.state.isAuthenticated) {
          next()
        } else {
          next('/')
        }
      }
    },
    { path: "/notfound", component: NotFound },
    { path: "*", redirect: "/notfound" }
  ]
})
