<template>
  <div>
    <sheader :title="titleMsg"></sheader>
     <group label-width="6em" label-margin-right="2em" label-align="justify">
        <selector title="处理中心" :options="control" value-align="left"  @on-change="controlchange" v-model="params.assignedCenter"></selector>
        <selector title="处理部门" :options="deption" value-align="left" v-model="params.turnassignedDept" @on-change="deptionchange" ></selector>
        <selector title="处理组" :options="grounp" value-align="left"  v-model="params.turnassignedGroup" @on-change="grounpchange" ></selector>
        <selector title="处理人" :options="personal" value-align="left"  v-model="params.turnassignedUser"></selector>
         <x-textarea title="移交原因" placeholder="请输入内容" :show-counter="true" :rows="3" v-model="params.reason" :max='80' :min='1'></x-textarea>
    </group>
    <div style="padding:30px; 15px;">
        <x-button type="primary" style='background:#2d8cf0'  @click.native="submit" >移交</x-button>
    </div>
    <toast v-model="assshow" type="text" position="top">{{message}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch ,XButton,Toast } from 'vux'
import {showCentreInfo} from '../../api/request' 
import {showDeptnoInfo} from '../../api/request'
import {showGroupInfo} from '../../api/request'
import {findUserByGroupId} from '../../api/request'
import {turnOver} from '../../api/request' //指派
export default {
  components: {
    sheader,
    Group,
    GroupTitle,
    Cell,
    XInput,
    Selector,
    XButton,
    Toast,
    XTextarea
  },
  data(){
    return{
      titleMsg:"移交",
      power:sessionStorage.getItem('power'),
      control:[],
      deption:[],
      grounp:[],
      personal:[],
      params:{
        userId:sessionStorage.getItem('id'),
        flg:'',
        assignedCenter:'',
        turnassignedDept:'',
        turnassignedGroup:'',
        turnassignedUser:'',
        reason:'',
        workorderNumber: this.$route.params.id
      },
      assshow:false,
      message:'',
      id:this.$route.params.id,
      yijiao:false
    }
    
  },
  created(){
    this.initData();
    console.log(this.$route)
    // this.initdept();
    // this.initgroup();
  },
  methods: {
    initData(){
      //处理中心
      showCentreInfo().then(res=>{
        let Control = res.data;
        Control.forEach(function(element) {
          this.control.push({
            value:element.text,
            key:element.centreId
          })
        }, this);
      
        console.log(res)
      })
    },
    // initdept(){
    //   const params = {
    //     centreId:sessionStorage.getItem('deptno')
    //   }
    //   //处理部门
    //   showDeptnoInfo(params).then(res=>{
    //     let dept = res.data;
    //     dept.forEach(function(element) {
    //       this.deption.push({
    //         value:element.text,
    //         key:element.deptnoId
    //       })
    //     }, this);
    //     console.log(res)
    //   })
    // },
    // initgroup(){
    //   const params = {
    //     deptnoId:sessionStorage.getItem('deptno'),
    //   }
    //  showGroupInfo(params).then(res=>{
    //     let grounp = res.data;
    //     grounp.forEach(function(element) {
    //       this.grounp.push({
    //         value:element.text,
    //         key:element.groupId
    //       })
    //     }, this);
    //     console.log(res)
    //   })
    // },
    //中心id
    controlchange(value){
     
        this.personal = [] ;
       this.deption = [];
        this.grounp = [];
      const params = {
        groupId:value,
        centreId:value
      }
      console.log(value)
      //处理人
      findUserByGroupId(params).then(res=>{
        if(res.data.code === 0){
          let Personal = res.data.content;
          Personal.forEach(function(element) {
            this.personal.push({
               value:element.name,
               key:element.id
            })
          }, this);
            
        }
        console.log(res)
      });
      //处理部门
      showDeptnoInfo(params).then(res=>{
        let dept = res.data;
        dept.forEach(function(element) {
          this.deption.push({
            value:element.text,
            key:element.deptnoId
          })
        }, this);
        console.log(res)
      })
    },
    //部门id
    deptionchange(value){
       this.personal = [] ;
        this.grounp = [];
      const params = {
          deptnoId:value,
          groupId:value,
      }
      showGroupInfo(params).then(res=>{
        let grounp = res.data;
        grounp.forEach(function(element) {
          this.grounp.push({
            value:element.text,
            key:element.groupId
          })
        }, this);
        console.log(res)
      })
            //处理人
      findUserByGroupId(params).then(res=>{
        if(res.data.code === 0){
          let Personal = res.data.content;
          Personal.forEach(function(element) {
            this.personal.push({
               value:element.name,
               key:element.id
            })
          }, this);
          //  this.personal = [] 
        }
        console.log(res)
        
      });
    },
    //组id
    grounpchange(value){
      this.personal = [] ;
      const params = {
        groupId:value
      }
      findUserByGroupId(params).then(res=>{
        if(res.data.code === 0){
          let person = res.data.content;
          person.forEach(function(element) {
            this.personal.push({
              value: element.name,
              key: element.id
            })
          }, this);
        }
        console.log(res)
      })
    },
    submit(){
      // this.params.turnassignedUser = ''
      if(this.params.turnassignedUser == '' || this.params.assignedCenter == ''){
         this.assshow = true;
         this.message = "请填写处理人"
      }else if(this.params.reason === ''){
         this.assshow = true;
         this.message = "请填写移交原因"
        }else{
        turnOver(this.params).then(res => {
          if (res.data.code === 0) {
            this.assshow = true;
            this.message = res.data.message
            // this.$vux.loading.show({
            //   text: 'in processing'
            // })
            setTimeout(() => {
              // this.$vux.loading.hide()
              this.$router.push('/' + this.id)
            }, 2000)
           
          }
          console.log(res)
        }).catch(err => {
          this.assshow = true;
          this.message = "系统异常"
        })
      }
    }
  }
}
</script>
