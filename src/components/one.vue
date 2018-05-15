<template>
  <div class="hello">
   <topnav class="topnav" v-bind:datas="lists"></topnav>
    <p style="text-align:center;min-height:10rem;line-height:10rem;">{{ msg }}</p>
    <footnav class="my-footnav"></footnav>
  </div>
</template>

<script>

import todoItem2 from '@/components/todoItem2.vue';
import topnav from '@/components/topnav.vue';
import footnav from '@/components/footnav.vue';
import List from '@/components/data.vue';
export default {
  name: 'hello',
  data() {
    return {
      lists: List.data()["2016Q1"],
      msg: '这里是vue的首页',
      msg2:this.$store.state.type,
    }
  },
  components:{
   'topnav': topnav,
   'footnav': footnav,
   'todoItem2':todoItem2
  },
  method:{
  },
  mounted:function(){
    // this.$store.state.luck=this.$store.state.luck+'321'
  }
}
</script>
