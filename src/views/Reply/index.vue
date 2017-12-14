<template>
  <div>
    <sheader :title="titleMsg"></sheader>
    <group label-width="6em" label-margin-right="2em" label-align="justify">
     
      <x-textarea  placeholder="请输入内容" :show-counter="false" :rows="3" v-model="params.msg" :max="100" :min="1"></x-textarea>
      <!-- <x-textarea title="解决进度" placeholder="请输入内容" :show-counter="false" :rows="3" v-model="params.contextProgress"></x-textarea> -->
      <checklist :title="('回复人')" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
  
      

      </cell>
    
    </group>
    <!-- <div class='file'>
     
      <input type="file" @change="onFileChange" :multiple="true" >
         <div style="padding:15px;">
            <x-button type="primary" style='background:#2d8cf0'  @click.native="upload">上传图片</x-button>
         </div>
    </div>  -->
    <div style="padding:15px;">
        <x-button type="primary" style='background:#2d8cf0'  @click.native="submit">提交</x-button>
     </div>
     <toast v-model="replymsg" type="text" width="200px">{{Rmsg}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import {  Group, Cell,  XTextarea ,XButton,Toast,Checklist } from 'vux'
import {addMessage} from '../../api/request'
import {getRelevantPeopleBywoId} from '../../api/request'
import {getUploadUrl} from '../../utils/commonurl'
export default {
   components: {
     Group,
     Cell,
     XTextarea,
     sheader,
     XButton,
     Toast,
     Checklist
  },
  data(){
    return{
      titleMsg:'回复',
      params:{
        fileName:'',
        userId:sessionStorage.getItem('id'),
        replyids:'',
        msg:'',
        woId:this.$route.params.id
      },
      replymsg:false,
      labelPosition:'',
       commonList: [],
      checklist001: [],
      Rmsg:''
    }
  },
  created(){
    this.initReply();
    console.log(this.$route.params);
    
  },
  methods: {
    openFile(){
      this.$refs.file.click();
    },
    change (val, label) {
      // console.log('change', val, label)
      this.params.replyids = val.join(',')
      console.log(this.params.replyids)
    },
    initReply(){
      const params = {
        userId:sessionStorage.getItem('id'),
        workOrderId:this.$route.params.id
      }
      getRelevantPeopleBywoId(params).then(res=>{
        if(res.data.code === 0){
          let CommonList = res.data.content;
          CommonList.forEach(function(element) {
            this.commonList.push({
              value:element.name,
              key:element.id
            })
          }, this);
        }
        console.log(res)
      })
     
    },
    submit(){
      addMessage(this.params).then(res=>{
        if(this.params.msg === '' || this.params.replyids === ''){
          this.replymsg = true;
          this.Rmsg = '请填写回复原因和回复人'
        }else if(res.data.code === 0){
          this.replymsg = true;
          this.Rmsg = res.data.message;
         
            setTimeout(() => {
              // this.$vux.loading.hide()
              this.$router.push('/'+this.$route.params.id)
            }, 1000)
          // this.params.msg = '';
          // this.params.replyids = '';
          console.log(res.data)
        }
        // console.log(res)
      })
    },
    //图片上传
     onFileChange(e) {
      this.params.fileName = e.target.files || e.dataTransfer.files;
      if (this.params.fileName.length){

      } else{
        this.upload();
      }
      return;
      // this.createImage(this.params.fileName);
       
    },
    // createImage(file) {
    //   if (typeof FileReader === 'undefined') {
    //     alert('您的浏览器不支持图片上传，请升级您的浏览器');
    //     return false;
    //   }
    //   var image = new Image();
    //   var vm = this;
    //   var leng = this.params.fileName.length;
    //   for (var i = 0; i < leng; i++) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(this.params.fileName[i]);
    //     reader.onload = function(e) {
    //       vm.images.push(e.target.result);
    //     };
    //   }
    // },
    async upload(){
      console.log('file:',this.params.fileName[0])
      const fd = new FormData()
      fd.append('file',this.params.fileName[0])
      const res = await fetch(getUploadUrl(),{
        method:'post',
        mode:'cors',
        credentials:'no-include',
        body:fd
      })
      const ret = await res.json()
      if (ret.code === 0) {
        this.replymsg = true;
        this.Rmsg = "上传成功"
        this.params.fileName = ret.content;
      } else {
        this.replymsg = true;
        this.Rmsg = "上传失败请重新上传"
      }
      console.log('ret:', ret);
      this.params.fileName = ret.content
      console.log(this.params.fileName)
    },
  }
}
</script>
<style scoped>
.file{
   background:#fff;
}
.file input {
    margin:20px;
    font-size: 0; 
} 
.file input::-webkit-file-upload-button {
  background: #fff;
  color: #333;
  border: 0;
  padding: 20px 100px;
  border-radius: 5px;
  font-size: 18px;
  border:1px solid #ccc;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .1), 0 0 20px rgba(0, 0, 0, .33);
  background-image: url('../../assets/uploads.png') ;
  background-repeat: no-repeat;
  background-size:60px 60px;
  background-position:30px;
    }
/* .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
} */
/* .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
} */
</style>
