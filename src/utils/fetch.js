import axios from 'axios'
import Qs from 'qs'
import {getRequestUrl} from './commonurl'
// 封装axios 创建基础实例以及axios拦截
const service = axios.create({
  baseURL:getRequestUrl(),
  timeout:10000,
  withCredentials: false, // default
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});
/**
 * request 拦截器
 */
service.interceptors.request.use(config=>{
     //通过判断store状态，添加一些请求headers数据
     if(sessionStorage.getItem('token')){
      config.headers.common['Authorization']=sessionStorage.getItem('token'); 
      }
     config.data=Qs.stringify(config.data);
      return config;
},error=>{
  Promise.reject(error);
})

/**
 * response 拦截器 
 */
service.interceptors.response.use(
  response => response,
  error=>{
      console.log('error:'+error);
      return Promise.reject(error);
  }
)

export default service;