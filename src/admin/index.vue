<template>
  <div class="hello">
   <topnav class="topnav" v-bind:datas="lists"></topnav>
    <p style="text-align:center;min-height:10rem;line-height:10rem;">{{ msg }}</p>
  </div>
</template>

<script>

import topnav from '@/components/topnav.vue';
import List from '@/components/data.vue';
export default {
  name: 'hello',
  data() {
    return {
      lists: List.data()["admin"],
      msg: '这里只是一个后台的首页',
      msg2:this.$store.state.type,
    }
  },
  components:{
   'topnav': topnav,
  },
  method:{
  },
  mounted:function(){
    // this.$store.state.luck=this.$store.state.luck+'321'
  }
}
</script>
