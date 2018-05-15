<template>
  <div class="products">
   <!-- <div v-on:click="$router.go(-1)">返回</div> -->
    <topnav class="topnav" v-bind:datas="lists"></topnav>
    <ul v-infinite-scroll="loadMore" class="proUl"
                          infinite-scroll-disabled="loading"
                          infinite-scroll-distance="5">
      <li v-for="article in articles" >
        <router-link v-bind:to="'/detail/'+article.id">
          <img v-bind:src="article.images.small?article.images.small:''" alt="这是图片" />
          <div class="right">
           <h1>{{article.title}}</h1>
           <p>功率(w):{{article.rating.average}}w</p>
           <p>尺寸(Mm):{{article.rating.average}}*{{article.rating.average}}*{{article.rating.average}}</p>
           <p>应用空间:<span v-for="genre in article.genres">{{genre}}&nbsp;</span></p>
           <p><span class="colorRed">￥{{article.year}}</span></p>
          </div>
        </router-link>
      </li>
    </ul>
    <p>正在加载，请稍后....</p>
    <footnav class="my-footnav"></footnav>
  </div>

</template>

<script>
import topnav from '@/components/topnav.vue';
import footnav from '@/components/footnav.vue';
import List from '@/components/data.vue';

export default {
  name: 'hello',
  data () {
    return {
      articles:[],
      loading:false,
      start:0,
      lists: List.data()["2016Q1"],
      typeId:this.$route.params.typeId,
    }
  },
  methods: {
    loadMore:function() {

      this.loading = true;
       this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10&start='+this.start+'&typeId='+this.typeId, {}, {
                       headers: {
                       },
                       emulateJSON: true
                   }).then(function(response) {
                       var len = response.data.subjects.length;
                       for(var i=0;i<len;i++){
                        this.articles.push(response.data.subjects[i]);
                       }
                    this.start=this.start+10
                   }, function(response) {
                       // 这里是处理错误的回调
                       console.log(response)
                   });
       setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    getData:function(_){

     _.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10&start='+_.start, {}, {
             headers: {

             },
             emulateJSON: true
         }).then(function(response) {
           // 这里是处理正确的回调
             _.articles = response.data.subjects
         }, function(response) {
             // 这里是处理错误的回调
             console.log(response)
         });
    }
  },
  mounted: function () {
        // this.$store.state.luck=this.$store.state.luck+'hehe'
      },
  watch:{
    $route(typeId){
      if(this.$route.params.typeId=='tyn'){
        this.start=40
      }else if(this.$route.params.typeId=='dj'){
        this.start=0
      }
      var _ = this;
      this.getData(_)
    },
  },
  components:{
   'topnav': topnav,
   'footnav': footnav,
  },


}
</script>
<style>
.products{

}
.products ul.proUl{
  background-color: #fff;
  width: 90%;
  margin: 0 auto;
}
.products .proUl li{
  overflow: hidden;
  padding:0.1rem;
  background-color:#f3f3f3;
  margin:0.3rem auto;
}
.proUl li div.right{
  width:4rem;
}
.proUl li p{
text-overflow:ellipsis;overflow:hidden; white-space:nowrap;
}
.products h1{
  margin:0;
  font-size: 0.56rem;
}
.products .proUl li img{
  display:inline-block;
  width:2.1rem;
}
.products .proUl li>div{
  width:5.2rem;
  padding-left:0.3rem
}
.products p{
    color: #666;
    line-height: 0.7rem;
    height: 0.7rem;
}
.colorRed{
  color:red;
}
</style>
