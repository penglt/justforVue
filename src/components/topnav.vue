<template>
  <div id="table">
    <ul>
      <li v-for="item in items">
       <router-link v-bind:to="item.tab"> {{ item.channel }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  /* 父组件传来的数据 */
  props: ['datas'],
  data () {
    return {
      items: this.datas,
    }
  }
}
</script>

<style>
#table ul{
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  margin:0 auto;
  padding:0;
  background-color:#f4f4f4;
}
#table li {
    list-style: none;
    text-align: center;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    line-height: 1rem;
    font-size: 0.6rem;
}
</style>
