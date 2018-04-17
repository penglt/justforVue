<template>
  <div id="app"><!-- 模板内只能有一个根节点 -->
    <!-- 监听子组件的change事件 -->
    <my-navbar class="my-navbar" v-on:change="onChangeData"></my-navbar>
    <!-- 使用prop向子组件传递数据 -->
    <my-table class="my-table" v-bind:datas="lists"></my-table>
  </div>
</template>
<script>
/*引入子组件*/
import navbar from '@/components/navbar.vue';
import table from '@/components/table.vue';
import list from '@/components/data.vue';
export default {
  /*定义该组件模板中需要用的变量*/
  data () {
    return {
      lists: List.data()["2016Q1"]
    }
  },
  /*子组件注册*/
  components: {
    'my-navbar': navbar,
    'my-table': table
  },
  /*定义该组件模板中需要触发的方法*/
  methods: {
    onChangeData: function(id) {
      /* 直接修改数组，Vue.js不能检测到数据的变化，因此下面这行代码无效 */
      // this.lists = List.data()[id];
      /* 通过$set方法修改数组 */
      for (var i = 0; i < this.lists.length; i++) {
        this.$set(this.lists, i, List.data()[id][i]);
      };
    }
  }
}
</script>

<style>
.my-table {
  margin: 90px 7px 0 7px;
}
</style>
