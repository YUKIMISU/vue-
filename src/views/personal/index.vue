<template>
  <div>
    <!-- <sheader :title="titleMsg"></sheader> -->
    <x-header style='background:#2d8cf0;' :left-options="{showBack: false}">个人中心</x-header>
     <group>
      <x-switch :title="('注销')" v-model="show"></x-switch>
      <!-- <x-switch :title="('修改密码')" v-model="addpassword"></x-switch> -->
    </group>
     <!-- <group :title="('prevent default')">
      <x-switch :title="('default false')" prevent-default v-model="value2" @on-click="onClick"></x-switch>
    </group> -->
    <sfooter></sfooter>
    <!-- 模态框 -->
    <div>
      <confirm v-model="show"
      :title="('是否确认退出')"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ ('Are you sure?') }}</p>
      </confirm>
    </div>
    <!-- 修改密码 -->
    <div>
      <confirm v-model="addpassword"
      :title="('是否确认修改密码')"
      @on-cancel="onCancel"
      @on-confirm="onAdd"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ ('Are you sure?') }}</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import sfooter from '../../components/common/footer'
import {logout} from '../../api/request'
import { Loading } from 'vux'
import { Confirm, Group, XSwitch, XButton,XHeader, TransferDomDirective as TransferDom } from 'vux'
export default {
 directives: {
    TransferDom
  },
  components: {
    Confirm,
    Group,
    XSwitch,
    XButton,
    sheader,
    sfooter,
    XHeader
  },
  data(){
    return{
      titleMsg:'个人中心',
      show:false,
      addpassword:false,
      value2:false
    }
  },
  methods: {
    onClick (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.$vux.loading.show({
        text: 'in processing'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.value2 = newVal
      }, 1000)

    },
     onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
     logout().then(res=>{
       if(res.data.code === 0){
          sessionStorage.clear();
          this.$router.push('/login')
       }
      
       console.log(res)
     })
    },
    onAdd(){
      console.log(123)
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    
  }
}
</script>
