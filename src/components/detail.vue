  <template>
  <div class="moodWrap">
    <div v-on:click="$router.go(-1)">返回</div>
    <img v-bind:src="moodObj.images?moodObj.images.large:''" alt="这是图片" />
    <div class="moodName">
      <p>{{moodObj.title}}</p>
      <p><span class="">￥{{moodObj.reviews_count}}</span></p>
    </div>
    <div id="table2">

      <ul>
        <li v-for="(item,index) in arr" v-on:click="change(index)">
          {{item}}
        </li>
      </ul>
      <div class="selectTab">

        <div v-if="select">
          <div v-for="item in moodObj.images">
            <img v-bind:src="item"/>
          </div>
        </div>
        <div v-else>
          <table>
            <tr v-for="(val, key,index) in moodObj.rating">
              <td > {{key}}:</td>
              <td>{{val}}</td>
            </tr>
          </table>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      productId:'https://api.douban.com/v2/movie/subject/'+this.$route.params.productId,
      moodObj:{},
      select:true,
      arr:['图文详情','产品列表']
    }
  },
  methods: {
    change:function(index){
      if(index==0){
        this.select=true
      }else{
        this.select=false
      }
    }
  },
  mounted: function() {
             this.$http.jsonp(this.productId, {}, {
                 headers: {

                 },
                 emulateJSON: true
             }).then(function(response) {
               // 这里是处理正确的回调
                console.log(response.data.aka)
                this.moodObj=response.data
             }, function(response) {
                 // 这里是处理错误的回调
                 console.log(response)
             });
  },

}
</script>
<style>
.moodWrap{
  background-color:#f4f4f4;
}
.moodWrap>img{
  display:block;
  width: 100%;
  height: 6rem;
}
.moodName{
  background-color:#fff;
}
.moodName p{
    font-size: 0.7rem;
    line-height: 1rem;
    height: 1rem;
}
.moodName  span{
  color:#ff5000;
}
.selectTab{
  min-height:8rem;
}
#table2{
  background-color:#fff;
  margin-top:0.8rem;
}
#table2 ul{
  display: flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  margin:0 auto;
  padding:0;

}
#table2 li {
    list-style: none;
    text-align: center;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    line-height: 1rem;
    font-size: 0.6rem;
}
</style>
