<template>
  <div class='footer'>
     <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar >
      <tabbar-item selected link='/'>
        <img slot="icon" src="../../assets/myorders.png">
        <span slot="label" icon-active >我的工单</span>
      </tabbar-item>
      <tabbar-item  link='/applyorder'>
        <img slot="icon" src="../../assets/applys.png">
        <span slot="label" icon-active >创建工单</span>
      </tabbar-item>
      <tabbar-item  link="/checkorder" >
        <img slot="icon" src="../../assets/checkorder.png">
        <span slot="label" icon-active >待验收工单</span>
      </tabbar-item>
      <tabbar-item  link="/control" v-if="power === '6' || power === '10' || power === '9'">
        <img slot="icon" src="../../assets/check.png">
        <span slot="label" icon-active >监控中的工单</span>
      </tabbar-item>
      <tabbar-item  link="/personal">
        <img slot="icon" src="../../assets/personal.png">
        <span slot="label" icon-active >{{username}}</span>
      </tabbar-item>
    </tabbar>
 
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'



export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    
  },
  data(){
    return{
      username:sessionStorage.getItem('userName'),
      power:sessionStorage.getItem('power')
    }
  },
  methods: {
    valuechange(value){
      console.log(value)
      if(value === '0'){
       
      }
    }
  }
}
</script>
<style>
.footer{
  position: fixed;;
    bottom: 0;
    width: 100%;
    left:0;
   height:9%;
}
body,html{
   width:100%; height:100%;
}
/* .vux-tab .vux-tab-item.vux-tab-selected{
        color: blueviolet;
        border-bottom:3px solid blueviolet;
} */

.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
   
    color: #2d8cf0 !important;
}
</style>
