<template> 
<div>
  <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true" style='background:#2d8cf0;color:#fff' id='title'>消息</x-header>
  <!-- <sheader :title='titleMsg'></sheader> -->
  
      <actionsheet :menus="menus" v-model="showMenus"   @on-click-menu="menusShow" show-cancel></actionsheet>
 
 <search
    
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="relative"
    auto-scroll-to-top top="46px"
    placeholder ="搜素"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
    <!-- <div style="padding:15px;">
      <x-button @click.native="setFocus" type="primary">set focus</x-button>
    </div> -->
   <!-- 主体内容 -->
   <!-- <card :header="{title: ('工单标题') }" :footer="{title: ('内容'),link:'/component/panel'}">
      <p slot="content" class="card-padding">{{ ('工单标题') }}</p>
   </card> -->
    <group>
      <cell :title="('工单标题')" link="../detail" inline-desc='内容' :border-intent="false" primary="content" class='mian'></cell>
      <cell :title="('工单标题')" link="../Login" inline-desc='内容' :border-intent="false" primary="content" class='mian'></cell>
      <cell :title="('工单标题')" link="../Login" inline-desc='内容' :border-intent="false" primary="content" class='mian'></cell>
    </group>
    <!-- <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <load-more tip="loading"></load-more>
      </div>
    </scroller> -->
    <sfooter></sfooter>
  </div>
</template>
<script>
import { Search, Group, Cell, XButton,XHeader,Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Scroller, Divider, Spinner,LoadMore} from 'vux'
import {  CellBox } from 'vux'
import sheader from '../../components/common/header'
import sfooter from '../../components/common/footer'
import { Card } from 'vux'
export default {
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
    ButtonTab,
    ButtonTabItem
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      // this.$vux.toast.show({
      //   type: 'text',
       
      //   text: 'on submit'
      // })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    //创建工单
    menusShow(key){
      if(key==='menu1'){
        this.$router.push('/applyorder')
      }
       
    }
  },
  data () {
    return {
      results: [],
      titleMsg:'消息',
      value: '',
      showMenus:false,
      menus: {
        menu1: '创建工单',

      },
    }
  }
}


</script>
<style scoped>
.weui-cells{
  margin-top: 0;
}
.main{
margin-top: 0 !important;
/* border:1px solid #ccc; */
}
</style>
