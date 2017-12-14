<template> 
<div>
  <div class='header'>
    <x-header style='background:#2d8cf0;' :left-options="{showBack: false}">待验收工单<a slot="right" v-on:click="showMenus = true">筛选</a></x-header>
    <search
    
    
    v-model="params.title"
    position="absolute"
    auto-scroll-to-top top="0px"
    placeholder ="搜素"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
  </div>

   <div class='content'>     
      <scroller  lock-x  height="-117px"  ref="scrollerBottom"  
      :bounce="true"  :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore" 
      :use-pulldown="showDown"
      @on-pulldown-loading="onRefresh" :pulldown-config='downobj'>
        <div class="box2">
          <group :gutter="0"  v-for="item in listorder" :key="item.id">
            <cell  
            :title="(item.Title)" :link="('/'+item.Id)" v-bind:inline-desc="item.Context" :border-intent="false" primary="content" class='mian'>
            </cell>
          </group>
        
        </div>
      </scroller>
      <loading v-model="showloading" :text="textloading"></loading>
   </div>
       
    
      <actionsheet v-if="power === '6'" :menus="menus" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
   
      <actionsheet v-if="power !== '6'" :menus="menustwo" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
      <sfooter></sfooter>  
     <toast v-model="Msgnum" type="text" width='150px'>{{message}}</toast>
  </div>
</template>
<script>
import { Search, Group, Cell, XButton ,XHeader, Actionsheet,TransferDom, Toast,Scroller, Divider, Spinner,Loading} from 'vux'
import {  CellBox } from 'vux'
import sheader from '../../components/common/header'
import { Card } from 'vux'
import sfooter from '../../components/common/footer'
import {myWorkOrder} from '../../api/request'
import {beCheckWorkOrder} from '../../api/request'
export default {
  directives: {
    TransferDom
  },
  components: {
    Search,
    Group,
    Cell,
    XButton,
    sheader,
    Card,
    CellBox,
    sfooter,
    XHeader, 
    Actionsheet,
    Toast,
    Scroller,
    Divider,
    Spinner,
    Loading
  },
  mounted(){
   
  },
  created(){
    
    this.setItems()
  },
   
  methods: {
    // initData(){
    //   myWorkOrder(this.params).then(res=>{
    //     if(res.data.code === 0 && res.data.content.list.length !==0){
    //       this.listorder = res.data.content.list;
    //       // console.log(this.listorder)
    //     } else if(res.data.content.list.length === 0){
    //       this.listorder = res.data.content.list;
    //       this.Msgnum = true;
    //       this.message = '无匹配的数据信息'
          
    //     }else if(res.data.code !== 0 ){
    //        this.Msgnum = true;
    //         this.message = res.data.content.message
    //     }
    //     console.log(res)
    //   })
    // },
    pathname(){
      this.listorder.forEach(function(element) {
         this.$router.push(element.id);
      }, this);
      
    },
    setFocus () {
      this.$refs.search.setFocus();
      console.log(123)

    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log(val)
    },
    onSubmit () {
      this.$refs.search.setBlur()
      
    
       this.setItems();
    },
    onFocus () {
      this.setItems();
      
    },
    onCancel () {
      this.setItems();
      console.log('on cancel')
    },
    // //点击菜单
    click(key,value){
      if(key === 'menu1'){
        this.params.state = '0';
        this.setItems();
      }else if(key === 'menu2'){
        this.params.state = '-1';
        this.setItems();
      }else if(key === 'menu3'){
        this.params.state = '1';
        this.setItems();
      }else if(key === 'menu4'){
        this.params.state = '2';
        this.setItems();
      }
      console.log(key,value)
    },
   
   
async setItems() {
// this.$nextTick(() => {
// this.$refs.scrollerBottom.donePullup()
// })
this.listorder = await this.getData()
console.log(this.listorder )
this.isLoading = false
// this.reset()
},
//上拉刷新
onRefresh() {
this.items = []
this.$nextTick(() => {
// 必须放在 setItems前. 防止方法里禁用后又被启用上拉
this.$refs.scrollerBottom.enablePullup()
})
this.params.pageIndex = 1
this.setItems()

this.$nextTick(() => {
this.$refs.scrollerBottom.donePulldown()
})
},

reset() {
this.$nextTick(() => {
this.$refs.scrollerBottom.reset()
})
},
// 禁用上拉
disablePullup() {
this.$nextTick(() => {
this.$refs.scrollerBottom.disablePullup()
})
},
 async getData() {
   var arr =[]
  await beCheckWorkOrder(this.params).then(res => {
    if (res.data.code === 0) {
      arr = res.data.content.list;
      this.pageMax = res.data.content.page.pages;
      this.params.pageIndex = res.data.content.page.current;
      if (this.pageMax === 1 || res.data.content.list.length == 0) {
        this.disablePullup();

      }
     
    }
    
  })
    
   return arr ;
},
//下拉加载
async loadMore() {

  this.params.pageIndex++;
  
  if (this.params.pageIndex > this.pageMax) {
    this.disablePullup()
    return false
  }
  let arr = await this.getData()
    
  this.listorder = this.listorder.concat(arr)
console.log(this.listorder )
  this.$nextTick(() => {
    this.$refs.scrollerBottom.donePullup()
  })
},
    
},
  data () {
 
    return {
      results: [],
      titleMsg:'待验收工单',
      listorder:[],
      value: '',
      params:{
        userId:sessionStorage.getItem('id'),
        pageIndex:1,
        pageSize:'',
        state:'', 
        title:''
      },
      Msgnum:false,
      message:'',
      pageMax:1,
      power:sessionStorage.getItem('power'),
       menus: {
        menu1: '指派中',
        menu2: '待指派',
        menu3: '受理中',
        menu4: '我提审的',
      },
       menustwo: {
        menu1: '指派中',
        menu2: '待指派',
        menu3: '受理中',
      },
      onFetching: false,
      showMenus: false,
      isShow:false,
      showloading: false,
      textloading: '加载中',
      showUp: true,
      showDown:true,
      upobj: {
          content: '请上拉刷新数据',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '请上拉刷新数据',
          upContent: '请上拉刷新数据',
          loadingContent: '加载完了',
          clsPrefix: 'xs-plugin-pullup-'
        },
      downobj:{
         content: '请下拉拉刷新数据',
         
          height: 60,
          autoRefresh: false,
          downContent: '请下拉拉刷新数据',
          upContent: '请下拉刷新数据',
          loadingContent: '加载完了',
          clsPrefix: 'xs-plugin-pulldown-'
      },  
      textLoading: '加载中',
      isShowLoading:false,
      scrollerStatus: {
          pullupStatus: 'default',
          donePulldown:'default'
      }
    }
  }
}


</script>
<style scoped>
.weui-cells{
  margin-top: 0;
}
.contents{
   /* overflow: hidden;
  height:100%; */
}
.content{
  height: 100%;
  width: 100%;
  top: 16%;
  }
.main{
margin-top: 0 !important;
/* border:1px solid #ccc; */
}
.header{
 
  z-index: 9999;
  top:0;
  left: 0;
  width:100%;
}
.search{
  position: absolute;
  top:8%;
  /* height:8%; */
  width:100%;
  background: #ccc;
  z-index:99
}
body,html{
   width:100%; height:100%;
}
</style>
