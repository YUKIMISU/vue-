<template>
  <div>
   
    <x-header :right-options="{showMore: false}"  style='background:#2d8cf0;color:#fff' id='title'>{{title}}</x-header>

   
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
     
    }
    
  },
   props:['title'],
   methods: {
     click(key){
      //  console.log(key);
     
       this.$router.push('/applyorder')
     }
   }
}
</script>

<style>
.overwrite-title-demo {
  margin-top: 5px;
}
</style>