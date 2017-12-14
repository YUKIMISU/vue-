<template>
  <div>
    <sheader :title="titleMsg"></sheader>
    <group label-width="6em" label-margin-right="2em" label-align="justify">

      <x-textarea title="退回原因" placeholder="请输入内容" :show-counter="false" :rows="3" v-model="params.text"></x-textarea>

    </group>
    <div style="padding:15px;">
      <x-button type="primary" style='background:#2d8cf0' @click.native="submit">提交</x-button>
    </div>
    <toast v-model="replymsg" type="text" position="top">{{Rmsg}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import { Group, Cell, XButton, Toast, XTextarea } from 'vux'
import { backWorkOrder } from '../../api/request'
export default {
  components: {
    sheader,
    Group,
    Cell,
    XButton,
    Toast,
    XTextarea
  },
  data() {
    return {
      titleMsg: "退回",
      params: {
        text: '',
        userId: sessionStorage.getItem('id'),
        workOrderId: this.$route.params.id
      },
      replymsg: false,
      Rmsg: ''
    }
  },
  methods: {
    submit() {
      if (this.params.text === "") {
        this.replymsg = true;
        this.Rmsg = "请填写退回原因"
      } else {
        backWorkOrder(this.params).then(res => {
          if (res.data.code === 0) {
            this.replymsg = true;
            this.Rmsg = res.data.message;
          
            // this.$vux.loading.show({
            //   text: 'in processing'
            // })
            setTimeout(() => {
              // this.$vux.loading.hide()
             this.$router.push('/'+this.$route.params.id)
            }, 1000)

            
          }
          console.log(res)
        }).catch(err => {
          this.replymsg = true;
          this.Rmsg = "系统异常"
        })
      }

    }
  }
}
</script>
