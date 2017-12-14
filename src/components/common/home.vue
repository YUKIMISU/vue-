<template>
  <div>
     
       <!-- <div class='content'>
          <router-view></router-view>
       </div>  -->
       <!-- <sfooter></sfooter> -->
  </div>
</template>
<script>
// import sheader from './header'
import sfooter from './footer'
// import search from './search'
export default {
  components: {
   
    sfooter,
   
  }
}
</script>
<style scoped>
.content{
  position: relative;
  height: 100%;
  background: #f5f5f9;

}
</style>
