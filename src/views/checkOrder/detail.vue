<template>
  <div>
     <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true" style='background:#2d8cf0;color:#fff'>工单详情页</x-header>
  
     <group >
        <cell :title="orderinfo.title"  :inline-desc="orderinfo.context"></cell>
    </group>
    <group gutter='2%' label-width="6em" label-margin-right="2em" >
      <cell title="发起人" :value="orderinfo.applyGroupName" value-align="left"></cell>
      <cell title="受理组/人" :value="orderinfo.assignedGroupName"  value-align="left"></cell>
      <cell title="当前状态" :value="orderinfo.stateName"  value-align="left"></cell>
      <datetime title="创建时间"   v-bind:value="orderinfo.applyTimeString" value-text-align="left" readonly format="YYYY-MM-DD HH:mm"></datetime>
      <datetime title="指定处理时间" v-bind:value="orderinfo.expectTimeString" value-text-align="left" readonly format="YYYY-MM-DD HH:mm"></datetime>
    </group>
    <group gutter='2%' label-width="5.5em" label-margin-right="2em" v-if="service === '1'">
    
      <cell title="姓名" :value="orderinfo.customerName" value-align="left"></cell>
      <cell title="ID" :value="orderinfo.customerid"  value-align="left"></cell>
      <cell title="手机号" :value="orderinfo.customerPhone" value-align="left"></cell>
      <cell title="VIP等级" :value="orderinfo.customerViplevel"  value-align="left"></cell>
      <cell title="渠道" :value="orderinfo.customerQdname" value-align="left"></cell>
      <cell title="端口" :value="orderinfo.customerSyport"  value-align="left"></cell>
    </group>
     <group gutter='2%' v-for="item in workOrderMessageInfo" :key="item.index" >
      <cell :title="item.UserName"  :inline-desc="item.Msg"></cell>
      <cell title="附件" :link="(item.FilePath)"  v-if="item.FilePath !== ''">
        <!-- <router-link :to="(item.FilePath)">
        </router-link> -->
       
        </cell>
      <!-- <div  style="padding-left:4%" v-for="item in workOrderMessageInfo" :key="item.index"><router-link :to="item.FilePath" target="_break">附件</router-link></div> -->
    </group>
    <group gutter='2%' ></group>
    <!-- <x-button type="primary">指派</x-button>
    <x-button type="primary">移交</x-button>
    <x-button type="primary"><router-link to='/reply'>回复</router-link></x-button>
    <x-button type="primary">primary</x-button>
    <x-button type="primary">primary</x-button>
    <x-button type="primary">primary</x-button>
    <x-button type="primary">primary</x-button> -->
    <!-- 模态框 -->
     <div v-transfer-dom>
      <actionsheet :menus="workorderButton" v-model="showMenus" show-cancel @on-click-menu="typedata"></actionsheet>

    </div>
     <toast v-model="replymsg" type="text" position="top" width="200px">{{Rmsg}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header.vue'
import { GroupTitle,XButton, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch ,XHeader, Actionsheet,Toast, TransferDom} from 'vux'
import {getOneworkorder} from '../../api/request';
import {claimWorkOrder} from '../../api/request'
export default {
   directives: {
    TransferDom
  },
  components: {
    XHeader, 
    Actionsheet,
    Group,
    GroupTitle,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    XAddress,
    Datetime,
    XNumber,
    XTextarea,
    XSwitch,
    XButton,
    Toast
  },
  data(){
    return{
      titleMsg:'工单类型',
      params:{
        userId:sessionStorage.getItem('id'),
        workOrderid: this.$route.params.id
      },
      service:sessionStorage.getItem('service'),
      orderinfo:"",
      workOrderMessageInfo:[],
      workorderButton:{
        // assignButton: '指派',
        // claimButton:'认领',
        // confimButton:'确认验收',
        // returnBackButton:'驳回工单',
        // sendBackButton:'退回工单',
        // submitButton:'提交审核',
        // turnOverButton:'移交'
      },
      id:this.$route.params.id,
      // menus: {
      //   menu1: '回复',
      //   assignButton: '指派',
      //   claimButton:'认领',
      //   confimButton:'确认验收',
      //   returnBackButton:'驳回工单',
      //   sendBackButton:'退回工单',
      //   submitButton:'提交审核',
      //   turnOverButton:'移交'
      // },
      showMenus: false,
      replymsg:false,
      Rmsg:'',
      
    }
  },
  created(){
    console.log(this.$route.params.id)
    this.initlistData();
  },
  methods: {
    initlistData(){
      getOneworkorder(this.params).then(res=>{
        if(res.data.code === 0){
          this.orderinfo = res.data.content.workOrderInfo
          this.workOrderMessageInfo = res.data.content.workOrderMessageInfo
          let orderButton = res.data.content.workorderButton;
          this.workorderButton.reply = '回复'
          // this.workorderButton.assignButton = res.data.content.workorderButton.assignButton
          // this.workorderButton.assignButton = '指派'
          if(orderButton.assignButton === "true"){
            this.workorderButton.assignButton = orderButton.assignButton
            this.workorderButton.assignButton = '指派'
          }if(orderButton.claimButton === "true"){
            this.workorderButton.claimButton = orderButton.claimButton
            this.workorderButton.claimButton = '认领';
          
          } if(orderButton.confimButton === "true"){
            this.workorderButton.confimButton = orderButton.confimButton
            this.workorderButton.confimButton = '确认验收';
          } if(orderButton.returnBackButton === "false"){
            this.workorderButton.returnBackButton = orderButton.returnBackButton
            this.workorderButton.returnBackButton = '驳回工单'
          } if(orderButton.sendBackButton === "true"){
            this.workorderButton.sendBackButton = orderButton.sendBackButton
            this.workorderButton.sendBackButton = '退回工单'
          } if(orderButton.submitButton === "true"){
            this.workorderButton.submitButton = orderButton.submitButton
            this.workorderButton.submitButton = '提交审核'
          } if(orderButton.turnOverButton === "true"){
            this.workorderButton.turnOverButton = orderButton.turnOverButton
            this.workorderButton.turnOverButton = '移交'
          }
          // console.log(res.data.content.workorderButton.assignButton)
   
         
          console.log(this.orderinfo)
        }
        console.log(res)
      })
    },
    typedata(key,value){
      if(key === 'assignButton'){
        this.$router.push(this.id+'/assign')
      }if(key === 'claimButton'){
        const params = {
          userId: sessionStorage.getItem('id'),
          workOrderId: this.$route.params.id
        }
        console.log(params)
        claimWorkOrder(params).then(res => {
          if(res.data.code === 0){
            this.replymsg = true,
            this.Rmsg= res.data.message;
            setTimeout(()=>{
               this.$router.push('/'+this.id)
            })
          }else{
             this.replymsg = true,
            this.Rmsg= res.data.message;
          }
           
          console.log(res)
        })
      }if(key === 'confimButton'){
         this.$router.push(this.id+'/check')
      }if(key === 'returnBackButton'){
         this.$router.push(this.id+'/reject')
      }if(key === 'sendBackButton'){
         this.$router.push(this.id+'/return')
      }if(key === 'submitButton'){
        this.$router.push(this.id+'/submitaudit')
      }if(key === 'turnOverButton'){
        this.$router.push(this.id+'/transfer')
      }if(key === 'reply'){
        this.$router.push(this.id+'/reply')
      }
      console.log(key,value)
    }
  }
}
</script>