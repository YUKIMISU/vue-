// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {login} from './api/request'
import {autoLogin} from './api/request' //自动登录
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
//  if(sessionStorage.getItem("token")){
//    if(to.path == "/login"){
//      next("/")
//    }else{
//      next();
//    }
//  }else{
//    if(to.path == "/login"){
//      next();
//    }else{
//      next('/login')
//    }
//  }



let params = {
  // username: to.query.userName,
  userid:to.query.id,
  autopassword: to.query.enpassword
}
console.log(params)
if(params.username!=undefined){
  sessionStorage.clear();
}
if (sessionStorage.getItem('isLogin')) {
  if (sessionStorage.getItem('token')) {
    if (to.path == "/login") {
      next('/')
    } else {
      next();
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next('/login');
      // window.location.href="http://report.wsloan.com:8888/wsdm/login";
    }
  }
} else {
  // debugger
  if (params.userid != undefined && params.autopassword != undefined) {
    
    autoLogin(params).then(res => {
      if (res.data.code == 0) {
        this.isLoading=false;
        const data = res.data.content;
        const token = data.token;
        const id = data.id;
        const userName = data.name;
        const power = data.power;
        const password = data.password;
        const deptno = data.deptno;
        const service = data.service;
        sessionStorage.setItem('isLogin', true);
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('userName',userName);
        sessionStorage.setItem('id',id)
        sessionStorage.setItem('power',power);
        sessionStorage.setItem('deptno',deptno);
        sessionStorage.setItem('service',service);
        next();
      }else if (res.data.code == 1) {
        next('/login');
       
      }
      
    })

  } else {
    if (to.path == "/login") {
      next();
    } else {
      next('/login');
      
    }
  }
}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
