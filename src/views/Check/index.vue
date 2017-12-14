<template>
  <div>
    <sheader :title="titleMsg"></sheader>
     <group    label-width="6em" label-margin-right="2em" label-align="justify">
      
      <x-textarea title="验收原因" placeholder="请输入内容" :show-counter="true" :rows="3" v-model="params.text" :max='80'></x-textarea>
      
    </group>
     <div style="padding:15px;">
        <x-button type="primary" style='background:#2d8cf0'  @click.native="submit">提交</x-button>
     </div>
     <toast v-model="replymsg" type="text" position="top" width="200px">{{Rmsg}}</toast>
  </div>
</template>
<script>
import sheader from  '../../components/common/header'
import {Group, Cell,XButton,Toast, XTextarea} from 'vux'
import {finishWorkOrder} from '../../api/request'
export default {
  components: {
    sheader,
    Group,
    Cell,
    XButton,
    Toast,
    XTextarea
  },
  data(){
    return{
      titleMsg:"验收",
      params:{
        text:'',
        userId:sessionStorage.getItem('id'),
        workOrderId:this.$route.params.id
      },
      replymsg:false,
      Rmsg:''
    }
  },
  methods: {
    submit(){
     
      finishWorkOrder(this.params).then(res=>{
        if(this.params.text === ''){
          this.replymsg = true;
          this.Rmsg ="请填写验收原因";
        }else if(res.data.code === 0){
          this.replymsg = true;
          this.Rmsg =res.data.message;
          setTimeout(() => {
            // this.$vux.loading.hide()
            this.$router.push('/' + this.$route.params.id)
          }, 2000)
        }
          console.log(res)
      })
    }
  }
}
</script>
