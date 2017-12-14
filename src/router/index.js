import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import header from '@/components/common/header'
// import footer from '@/components/common/footer'
import home from '@/components/common/home'
import login from '@/views/Login/index.vue'
//业务组件
import homePage from '@/views/homePage/index.vue' //首页
import homePagedetail from '@/views/homePage/index.vue' //首页详情页
import myorder from '@/views/myOrder/index' //我的工单
Vue.use(Router)
const RouterCount = [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    name: '我的工单',
    component: resolve => require(['@/views/myOrder/index'], resolve),
  },
  {
    path: '/applyorder',
    name: '创建工单',
    component: resolve => require(['@/views/applyorder/index'], resolve),
  },
 {
    path:'/checkorder',
    name:'待验收工单',
    component:resolve => require(['@/views/checkOrder/index'], resolve),
  },
  {
    path:'/control',
    name:'监控中的工单',
    component:resolve => require(['@/views/controlOrder/index'], resolve),
  },
  {
    path:'/personal',
    name:'个人中心',
    component:resolve => require(['@/views/personal/index'], resolve),
  },
  {
    path:'/checkorder/:id',
    name:'待验收工单详情页',
    component:resolve => require(['@/views/checkOrder/detail'], resolve),
  },
  {
    path: '/:id',
    name: '我的工单详情页',
    component: resolve => require(['@/views/myOrder/details'], resolve),
  },
  {
    path: '/control/:id',
    name: '监控中的工单详情页',
    component: resolve => require(['@/views/controlOrder/detail'], resolve),
  },
  {
    path:'/:id/reply',
    name:'我的工单回复',
    component:resolve => require(['@/views/Reply/index'], resolve),
  },
  {
    path:'/checkorder/:id/reply',
    name:'待验收回复',
    component:resolve => require(['@/views/Reply/index'], resolve),
  },
  {
    path:'/:id/assign',
    name:'指派',
    component:resolve => require(['@/views/assign/index'], resolve),
  },
  {
    path:'/:id/transfer',
    name:'移交',
    component:resolve => require(['@/views/transfer/index'], resolve),
  },
  {
    path:'/:id/reject',
    name:'驳回',
    component:resolve => require(['@/views/Reject/index'], resolve),
  },
  {
    path:'/:id/submitaudit',
    name:'提交审核',
    component:resolve => require(['@/views/Submitaudit/index'], resolve),
    
  },
  {
    path:'/:id/Check',
    name:'验收',
    component:resolve => require(['@/views/Check/index'], resolve),
  },
  {
    path:'/:id/return',
    name:'退回',
    component:resolve => require(['@/views/return/index'], resolve),
  }
 
  

]
export default new Router({
  routes: RouterCount
})
