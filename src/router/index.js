import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import Stocks from '@/components/stocks/Stocks'
import StocksStock from '@/components/stocks/Stock'
import Portfolio from '@/components/portfolio/Portfolio'
import PortfolioStock from '@/components/portfolio/Stock'

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
    { path: '/', redirect: '/home' },
    { path: "/home", component: Home },
    { path: "/home", component: Home },
    { path: "/home", component: Home },
    { path: "/home", component: Home },
    { path: "*", component: NotFound }
  ]
})
