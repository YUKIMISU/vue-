import axios from 'axios';
export default {
  install:function(Vue,name='$http'){
    Object.defineProperty(Vue.protype,name,{value:axios})
  }
}