<template>
  <div>
    <x-header :right-options="{showMore: false}" :left-options="{showBack:false}" style='background:#2d8cf0;color:#fff'>{{title}}</x-header>
    <div>
      <div style='margin-top:20%'>
        <group title="">
          <x-input title="用户名" type="text" name="username" placeholder="请输入姓名" is-type="china-name" v-model="params.username"  :icon-type="iconTypes" novalidate  @on-change="change1"   @on-blur="onBlur"></x-input>
         
        </group>
        <group title="">
          <x-input title="密码" type="password" placeholder="请输入密码" v-model="params.password" :min="1"  @on-change="change" :required="true" :icon-type="iconTypel" novalidate @on-blur="onBlur1"></x-input>
          
        </group>
       
        <!-- <group title="禁用内置验证及显示成功或者错误样式">
          <x-input title="禁用验证" placeholder="I'm placeholder" novalidate :icon-type="iconType"  ></x-input>
        </group> -->
        <div style="padding:15px;">
         <x-button type="primary" style='background:#2d8cf0' @click.native="Login" v-model="show" >登陆</x-button>
        </div>
         <div v-transfer-dom>
      <confirm v-model="show"
      confirm-text="确定"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ ('用户名或密码不正确') }}</p>
      </confirm>
    </div>
        <!-- <x-button type="primary" style='background:#2d8cf0'>primary</x-button> -->
        <!-- <x-button plain style='margin-top:10%' @click.native="getValid2">submit</x-button> -->
        <!-- <x-button plain type="primary" >primary</x-button> -->
      </div>
    </div>

  </div>
</template>

<script>
import { XInput, Group, XButton, Cell ,Confirm} from 'vux'
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import {login} from '../../api/request'
import {autoLogin} from '../../api/request' //自动登录
export default {
  directives: {
    TransferDom
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Confirm
  },
  data() {
    return {
      title: '登录',
      params:{
        username: "",
        password: '',
      },
      password2: '',
      valid2: false,
      iconType:'',
      iconTypes:'',
      iconTypel:'',
      show:false,
      // disabledlogin:true
    }
  },
  created () {
  //  this.autoLogins()
  },
  methods: {
    change1(val) {
      console.log(val)
      if(val !==''){
         this.iconTypes = "success"
      }else{
        this.iconTypes = "error"
      }
    },
    change(val){
       if(val !==''){
         this.iconTypel = "success"
      }else{
        this.iconTypel = "error"
      }
    },
    onBlur (val) {
     if(val === ''){
         this.iconTypes = "error"
        
      }else{
         this.iconTypes = "success"
         
        //  this.disabledlogin = false
      }
    },
    onBlur1(val){
      if(val === ''){
         this.iconTypel = "error"
      }else{
         this.iconTypel = "success"
        //  this.disabledlogin = false
      }
    },
    Login(){
      if (this.params.username === "" && this.params.password === "") {
        //  this.iconTypes = "error";
        //   this.iconTypel = "error";
        this.show = true;
       
      } else {
        login(this.params).then(res => {
          if (res.data.code === 0) {
            const data = res.data.content;
            const token = data.token;
            const id = data.id;
            const userName = data.name;
            const power = data.power;
            const password = data.password;
            const deptno = data.deptno;
            const service = data.service;
            sessionStorage.setItem('isLogin', true);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('id', id)
            sessionStorage.setItem('power', power);
            sessionStorage.setItem('deptno', deptno);
            sessionStorage.setItem('service', service);
            this.$router.push('/')
          } else {
            this.show = true;
            //  this.params.username = '';
            //  this.params.password = '';
          }

        }).catch(err => {
          this.show = true;
        })
        // console.log(123)
        // this.$router.push('/')
      }


      
      
    },
    //自动登录
    //  autoLogins(){
    //    console.log(this.$route.fullPath);
      
    //    let href = this.$route.fullPath;
    //    if(href.indexOf('?') !== '-1'){
    //     const params = {
    //        userid: this.$route.query.userName,
    //        password: this.$route.query.password
    //      }
    //      autoLogin(params).then(res=>{
    //         this.$router.push('/')
    //      })
    //    }
    //    console.log(href.indexOf('=') )
    //   // autoLogin(this.params).then(res=>{
        
    //   // })
    //  },
    
    getValid2 () {
      this.valid2 = this.$refs.input02.valid
    },
    onCancel(){

    },
     onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
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
