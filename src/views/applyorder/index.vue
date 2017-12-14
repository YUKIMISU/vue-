<template>
  <div>
    <sheader :title='titleMsg'></sheader>
    <group    label-width="8em" label-margin-right="2em" label-align="justify">
      <selector title="工单一级类型" :options="typeone" value-align="left"  @on-change="typeonechange" v-model="params.typeone" placeholder="请选择工单一级类型"></selector>
      <selector title="工单二级类型" :options="typetwo" value-align="left" v-model="params.twoType" @on-change="typetwochange" placeholder="请选择工单二级类型"></selector>
      <x-input title="工单处理人" v-model="typename" value-align="left" disabled  placeholder="请选择工单处理人"></x-input>
      <x-input title="工单标题" v-model="params.title" value-align="left"></x-input>
      <selector title="紧急程度" :options="flg" value-align="left" v-model='params.flg'></selector>
      <x-input title="客户姓名" v-model="params.customername" value-align="left" v-if="service === '1'"></x-input>
      <x-input title="客户ID" v-model="params.customerid" value-align="left" v-if="service === '1'"></x-input>
      <x-input title="客户电话" v-model="params.customerphone" value-align="left" is-type="china-mobile" v-if="service === '1'"></x-input>
      <x-number title="客户等级VIP" align="left" v-model="params.viplevel" button-style="round" :min="0" :max="10" v-if="service === '1'"></x-number>
      <x-input title="渠道" v-model="params.qdname" value-align="left" v-if="service === '1'"></x-input>
      <selector title="端口" :options="syport" value-align="left" v-model='params.syport' v-if="service === '1'"></selector>
      
      <x-textarea title="问题描述" placeholder="请输入内容" :show-counter="true" :rows="3" v-model="params.context" :max="80"></x-textarea>
      <x-textarea title="解决进度" placeholder="请输入内容" :show-counter="true" :rows="3" v-model="params.contextProgress" :max="80"></x-textarea>
      <datetime title="期望处理时间"  v-model="params.expecttime" value-text-align="left" format="YYYY-MM-DD HH:mm" @on-change="timechange"></datetime>
    </group>
    <!-- <div class='file'>
     
      <input type="file" @change="onFileChange" :multiple="true" >
    
         <div style="padding:15px;">
            <x-button type="primary" style='background:#2d8cf0'  @click.native="upload">上传图片</x-button>
         </div>
    </div>  -->
    <div style="padding:15px;">
        <x-button type="primary" style='background:#2d8cf0'  @click.native="submits">提交</x-button>
    </div>
     <toast v-model="show2" type="text" position="middle">{{message}}</toast>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch ,XButton,Toast ,Loading} from 'vux'
import {addWorkOrder} from '../../api/request' //创建工单
import {showTypeBySupIdAndGroup} from '../../api/request' //获取工单一级类型
import {showTypeBySupId} from '../../api/request'//获取工单二级类型
import {getPeopleInfoByWorkOrderTypeId} from '../../api/request'//工单处理人
import {showFlg} from '../../api/request' //工单紧急
import {upload} from '../../api/request'//上传
import VueCoreImageUpload from 'vue-core-image-upload'
import {getUploadUrl} from '../../utils/commonurl'
  export default {
    components: {
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
      sheader,
      XButton,
      Toast,
      'vue-core-image-upload': VueCoreImageUpload,
  },
  data(){
    return{
      titleMsg:'创建工单',
      typeone:[],//工单一级类型,
      typetwo:[],//工单二级类型,
      typename:'',
      params:{
        userId:sessionStorage.getItem('id'),
        title:'',
        twoType:'',
        flg:'',
        context:'',
        contextProgress:'',
        expecttime:'',
        fileName:'',
        customername:'',
        customerid:'',
        customerphone:'',
        viplevel:0,
        qdname:'',
        syport:'',
        typeone:''
      },
      flg:[],
      syport:['PC', 'IOC', 'Android','PC+IOS','PC+Android'],
      service:sessionStorage.getItem('service'),
      show2:false,
      message:'',
      images:[],
      
   
        
    }
  },
  created(){
    this.initTypedata();
    
  },
  methods: {
    initTypedata(){
      
      const params = {
        userId:sessionStorage.getItem('id')
      }
      showTypeBySupIdAndGroup(params).then(res=>{
        let Typeone = res.data;
        Typeone.forEach(function(element) {
          this.typeone.push({
            value:element.name,
            key:element.id
          })
        }, this);
        console.log(res)
      }),
      showFlg().then(res=>{
        if(res.data.code === 0){
          let Flg = res.data.content;
          Flg.forEach(function(element){
            this.flg.push({
              value:element.text,
              key:element.id
            })
          },this)
        }
        console.log(res)
      })
    },
    typeonechange(value){
      this.typetwo = [];
      this.params.twoType = ''
      this.typename = '';
      const typeId = {
        id:value
      }
      showTypeBySupId(typeId).then(res=>{
        if(res.data.code === 0){
          let Typetwo = res.data.content;
          Typetwo.forEach(function(element){
            this.typetwo.push({
              value:element.name,
              key:element.id
            })
          },this)
        }
        console.log(res)
      })
      // console.log(value)
    },
    typetwochange(value){
     
      this.typename = '';
      const typename = {
        typeId:value
      }
      getPeopleInfoByWorkOrderTypeId(typename).then(res=>{
        if(res.data.code === 0){
          console.log( res.data.content)
          this.typename = res.data.content.name
        }
        console.log(res)
      })
      // this.typeonechange(value);
      
    },
    timechange(value){
      console.log(value)
    },
    //提交工单
    submits(){
      
      addWorkOrder(this.params).then(res=>{
        if (res.data.code === 0) {
          this.show2 = true;
          this.message = res.data.message;

          // this.params.twoType = '';
          // this.params.title = '';
          // this.params.twoType = '';
          // this.params.flg = '';
          // this.params.context = '';
          // this.params.contextProgress = '';
          // this.params.expecttime = '';
          // this.params.fileName = '';
          // this.params.customername = '';
          // this.params.customerid = '';
          // this.params.customerphone = '';
          // this.typename = '';
          // this.params.qdname = '';
          // this.params.syport = '';
          // this.params.typeone = '';
            setTimeout(() => {

            this.$router.push('/');
          }, 2000)
        } else {
          this.show2 = true;
          this.message = res.data.message
        }
        console.log(res)
      })
    },
    openFile(value){
      console.log(value)
    this.$refs.file.click();
    },
    onFileChange(e) {
      this.params.fileName = e.target.files || e.dataTransfer.files;
      if (this.params.fileName.length) return;
      this.createImage(this.params.fileName);
    },
    createImage(file) {
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持图片上传，请升级您的浏览器');
        return false;
      }
      var image = new Image();
      var vm = this;
      var leng = this.params.fileName.length;
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(this.params.fileName[i]);
        reader.onload = function(e) {
          vm.images.push(e.target.result);
        };
      }
    },
    async upload(){
      console.log('file:',this.params.fileName[0])
      const fd = new FormData()
      fd.append('file',this.params.fileName[0])
      const res = await fetch(getUploadUrl(),{
        method:'post',
        mode:'cors',
        credentials:'no-include',
        body:fd
      });
      
      const ret = await res.json();
      if(ret.code === 0){
        this.show2 = true;
        this.message = "上传成功"
        this.params.fileName = ret.content;
       }else{
        this.show2 = true;
        this.message = "上传失败请重新上传"
       }
      // console.log('ret:', ret);
     
      // console.log(this.params.fileName)
    },
    imageuploaded(res) {
      console.log('ref:',this.$refs['vupload'])
    // console.log(123)
    }

    // fileChange(e){

    //   let file = this.$refs.file;
    //   let files = e.target.files || e.dataTransfer.files;
    //   if (!files.length)
    //     return;
    //   this.createImage(files[0]);
    // },
    // createImage(file) {
    //   var image = new Image();
    //   var reader = new FileReader();
    //   var vm = this;

    //   reader.onload = (e) => {
    //     vm.image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    //   console.log(value)
    // }
  }
}
</script>
<style scoped>

.file {
  background: #fff;
}

.file input {
  margin: 20px;
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

</style>

