<template>
  <div>
    <sheader :title="titleMsg"></sheader>
     <group label-width="6em" label-margin-right="2em" label-align="justify">
        <selector title="处理中心" :options="control" value-align="left"  @on-change="controlchange" v-model="params.assignedCenter" v-if="power === '6'"></selector>
        <selector title="处理部门" :options="deption" value-align="left" v-model="params.assignedDept" @on-change="deptionchange"  v-if="power === '6' || power === '10'"></selector>
        <selector title="处理组" :options="grounp" value-align="left"  v-model="params.assignedGroup" @on-change="grounpchange" v-if="power === '6' || power === '9' || power === '10'"></selector>
        <selector title="处理人" :options="personal" value-align="left"  v-model="params.assignedUser"></selector>
    </group>
    <div style="padding:30px; 15px;">
        <x-button type="primary" style='background:#2d8cf0'  @click.native="submit">提交</x-button>
    </div>
    <toast v-model="assshow" type="text" position="top" width="200px">{{message}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch ,XButton,Toast,Loading,TransferDomDirective as TransferDom } from 'vux'
import {showCentreInfo} from '../../api/request' 
import {showDeptnoInfo} from '../../api/request'
import {showGroupInfo} from '../../api/request'
import {findUserByGroupId} from '../../api/request'
import {toDeptManage} from '../../api/request' //指派
export default {
  directives: {
    TransferDom
  },
  components: {
    sheader,
    Group,
    GroupTitle,
    Cell,
    XInput,
    Selector,
    XButton,
    Toast,
    Loading,
  },
  data(){
    return{
      titleMsg:"指派",
      power:sessionStorage.getItem('power'),
      control:[],
      deption:[],
      grounp:[],
      personal:[],
      params:{
        userId:sessionStorage.getItem('id'),
        
        assignedCenter:'',
        assignedDept:'',
        assignedGroup:'',
        assignedUser:'',
       
        workOrderId:this.$route.params.id
      },
      assshow:false,
      message:''
    }
    
  },
  created(){
    this.initData();
    this.initdept();
    this.initgroup();
    this.initperson();
    console.log(this.$route.params.id)
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
    initdept(){
      const params = {
        centreId:sessionStorage.getItem('deptno')
      }
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
    initgroup(){
      const params = {
        deptnoId:sessionStorage.getItem('deptno'),
      }
      console.log(123)
     showGroupInfo(params).then(res=>{
       console.log(res)
        let grounp = res.data;
        grounp.forEach(function(element) {
          this.grounp.push({
            value:element.text,
            key:element.groupId
          })
        }, this);
        console.log(res)
      })
    },
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
    initgop(){

    },
    initperson(){
      const params = {
        groupId:sessionStorage.getItem('deptno')
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
     
      toDeptManage(this.params).then(res=>{
        if(this.params.assignedCenter === ''){
           this.assshow = true;
          this.message = res.data.message;
        }else if(res.data.code === 0){
          this.assshow = true;
          this.message = res.data.message;
        
       
          setTimeout(() => {
            
            this.$router.push('/'+this.$route.params.id);
          }, 2000)
        }else{
           this.assshow = true;
          this.message = res.data.message;
        } 
        
        console.log(res)
      })
    }
  }
}
</script>
