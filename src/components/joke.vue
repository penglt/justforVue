<template>
  <div class="hello">
    <div>嘿  欢迎来看笑话哦</div>
    <button  @click="getjoke()">点击切换笑话</button>
    <div  v-for="(contents,index) in articles">
      <div>第{{ index+1 }}条</div>
       <div>{{ contents.content }}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      articles: '正在加载，请稍后',
      show: true,
      getjoke: function(){
          var _ = this
          _.$ajax.get('https://bird.ioliu.cn/joke/rand?type=text').then(function(response) {
          // 这里是处理正确的回调
          _.articles = response.data.data
          }, function(response) {
             // 这里是处理错误的回调
              console.log(response)
            })
      }
    }
  },
  mounted: function() {
          console.log("hello")
          var _ = this
             _.$ajax.get('https://bird.ioliu.cn/joke/rand?type=text').then(function(response) {
               // 这里是处理正确的回调
                 _.articles = response.data.data

             }, function(response) {
                 // 这里是处理错误的回调
                 console.log(response)
             });
           },
  method: {

   }

}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


button {
  color: skyblue;
}

</style>
