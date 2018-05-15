<template>
  <div class="clearfix products">
    <topnav class="topnav" v-bind:datas="lists"></topnav>
    <div class="kindul">

    </div>
    <div class="chooseDiv">
    	  <table class="chooseUl">
    	  	<tbody>
    	  	  <tr id="initType">
              <td>类型:</td>
              <td  v-for="(kind,index) in kindarr" @click="selectThis($event,index)" v-bind:class='{currt:index==currtclass}'>
                 <span>{{kind.name}}</span>
              </td>
            </tr>

    	    </tbody>
    	  </table>
        <div class="chooseUl selectIdDiv">
          <span>型号:</span><input class="selectId" v-model="moodid" />
          <span   @click="findbyId()" class="findbtn"> 查询</span>
        </div>
    </div>

    <!--上面是列表     下面是查询的商品结果 -->
    <ul class="moodul proUl">
      <li v-for="(mood,index) in moodarr">
        <div class="delDiv" @click="delMood(mood.id,mood.extPath,index)">X</div>
        <router-link v-bind:to="'/admin/detail/'+mood.id">
          <img v-bind:src="mood.showPath?mood.showPath:''" alt="图片暂无" />
          <div class="right">
            <h1>{{mood.name}}</h1>
            <p>型号:{{mood.id}}</p>
            <p>功率(w):{{mood.descr}}w</p>
            <p>尺寸(Mm):{{mood.guige}}</p>
            <p>应用空间:<span>{{mood.changjing}}</span></p>
            <p>价格:<span class="colorRed">￥{{mood.memberPrice}}</span></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import topnav from '@/components/topnav.vue';
import List from '@/components/data.vue';
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
export default {
  data () {
    return {
      lists: List.data()["admin"],
      kindarr:[],
      currtKind:1,
      moodarr:[],
      currtclass:0,
      moodid:'',
    }
  },
   methods: {
    selectThis:function(event,index){
      this.currtclass = index;
      this.currtKind = this.kindarr[index].moodkind
    },
    getmood:function(){
      this.$ajax.post(this.HOST+'/admin/findmood',{
        "moodkind":this.currtKind
      }).then(response => {
        this.moodarr=response.data.result
      }).catch(error => {
        alert('请联系彭良韬');
      })
    },
    findbyId:function(){
       this.$ajax.post(this.HOST+'/admin/findmoodId2',{
         "moodid":this.moodid
       }).then(response => {
        if(response.data.result.length<1){
          Toast({
            message: '无该型号商品,请校验后重新输入',
            position: 'center',
            duration: 5000
          });
          return;
        }
        this.moodarr=response.data.result
       }).catch(error => {
         alert('请联系彭良韬');
       })
    },
    delMood:function(moodId,src,index){
        this.$ajax.post(this.HOST+'/admin/delmood',{
          'moodId':moodId,
          "extPath":src
        }).then(response => {
          this.moodarr.splice(index,1)
          Toast({
            message: '删除成功',
            position: 'center',
            duration: 5000
          });
          //需要删除图片
        }).catch(error => {
          Toast({
            message: '系统繁忙，请稍后处理',
            position: 'center',
            duration: 5000
          });
        })
    },
   },
  mounted: function() {
     this.$ajax.get(this.HOST+'/admin/findkind').then(response => {
         this.kindarr=response.data.result
     }).catch(error => {
       alert('请联系彭良韬');
     })
     this.getmood();
  },
  components:{
  'topnav': topnav,
  },
/*
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
*/
  watch:{
    currtKind:function(val,oldval){
      this.getmood();
    }
  },

}
</script>

<style>



/*筛选布局*/
.chooseDiv{
	width:100%;
	background-color:#fff;
}
.selectIdDiv span.findbtn{
  cursor:pointer;
  padding: 0 8px;
  text-align: center;
  font-size: 0.28rem;
  color: #fff;
  line-height: 0.6rem;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  height: 0.6rem;
  min-width: 0.8rem;
  background-color:#1eae57
}
.chooseUl{
	margin-left:10%;
	padding:0.1rem 0;
	background-color:#fff;
}
.chooseUl tr{
	display:block;
	height:0.6rem;
	margin-bottom:8px;
}
.chooseUl tr td{
    margin-right: 0.8rem;
    font-size:0.28rem;
}
.chooseUl tr td:first-child{
	  color: #7a7a7a;
    font-size: 0.28rem;
    line-height: 0.6rem;
    border-radius: 4px;
    height: 0.6rem;
    min-width: 1rem;
}
.chooseUl tr td span{
    padding: 0 8px;
    text-align: center;
    font-size: 0.28rem;
    color: #242424;
    line-height: 0.6rem;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    height: 0.6rem;
    min-width: 0.8rem;
}
.chooseUl td.currt span{
	background-color:#20af59;
	color:#fff;
}
.selectId{
    line-height: 0.6rem;
    height: 0.6rem;
    font-size: 0.28rem;
    padding-left:0.1rem;
    width:2rem;
    margin-left: 0.6rem;
    margin-right: 0.4rem;
}
.selectIdDiv span{
  color: #7a7a7a;
  font-size: 0.28rem;
  line-height: 0.6rem;
  border-radius: 4px;
  height: 0.6rem;
  min-width: 1rem;
}









/*商品布局*/
.products ul.proUl{
  position: relative;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.products .proUl li img{
  display:inline-block;
  width:2.1rem;
  height:2.3rem;
}
div.delDiv{
    position: absolute;
    right: 0.1rem;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    width: 1rem;
    background-color: #1eae57;
    cursor: pointer;
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
