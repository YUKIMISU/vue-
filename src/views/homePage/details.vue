<template>
  <div>
    <sheader :title='titleMsg'></sheader>
  </div>
</template>
<script>
import sheader from '../../components/common/header'
export default {
  components: {
    sheader
  },
  data(){
    return{
      titleMsg:'消息'
    }
  }
}
</script>
