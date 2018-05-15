<template>
  <div class="clearfix">
    <div class="titleDiv">
       <span class="left"  style="cursor:pointer;" v-on:click="$router.go(-1)">返回</span>
       商品详情页-管理
    </div>
    <mt-field label="型号" placeholder="型号" v-model="moodObj.moodId" readonly="readonly" disableClear></mt-field>
    <div class="myself">
      <label>种类</label><input  placeholder="点击切换" v-model="moodkindname" @click="selectKind" readonly />
    </div>
    <ul v-if="isShow" class="selectUl">
        <li v-for="(kind,index) in kindarr" @click="selectThis(index)">{{kind.name}}</li>
    </ul>
    <mt-field label="名称" placeholder="名称" v-model="moodObj.name"></mt-field>
    <mt-field label="价格/元" placeholder="价格" v-model="moodObj.memberPrice" type="number"></mt-field>
    <mt-field label="规格/mm" placeholder="规格" v-model="moodObj.guige"></mt-field>
    <mt-field label="功率/w" placeholder="功率" v-model="moodObj.descr" type="number"></mt-field>
    <mt-field label="适用场所" placeholder="适用场所" v-model="moodObj.changjing"></mt-field>
    <div style="position:relative" v-if="!imgsoldflag">
      <input class="upload" ref="imgfile"  type="file">
    </div>
    <div v-if="imgs.length>0">
      <img v-bind:src="imgs.length>0?imgs[0].showPath:''" alt="这是新图片" />
      <span  style="background-color:#f4f4f4;padding:0.1rem;"  @click="remove()">x</span>
    </div>
    <div v-if="imgsoldflag">
      <img v-bind:src="imgs.length==0?imgsold[0].showPath:'xx'" alt="这是老图片" />
      <span  style="background-color:#f4f4f4;padding:0.1rem;"  @click="imgsoldflag=false">x</span>
    </div>
    <button  v-if="!imgsoldflag" class="addmoodbtn" @click='add_img'>更新图片信息</button>
    <button  class="addmoodbtn2" @click='upmood'>更新商品信息</button>
  </div>
</template>

<script>
import List from '@/components/data.vue';
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
export default {
  data () {
    return {
      lists: List.data()["admin"],
      kindarr:[{
           name:"抽油烟机",
           moodkind:"4",
         },
         {
          name:"煤气灶",
          moodkind:"3",
        },
        {
          name:"五金",
          moodkind:"2",
        },
        {
          name:"灯具",
          moodkind:"1",
         },
      ],
      moodkindname:'',
      moodObj:{
        moodkind:'',
        moodId:this.$route.params.productId,
        memberPrice:'',
        guige:'',
        changjing:'适用任何场景',
        name:'',
        descr:'0',
        showPath:'x',
        extPath:'x',
      },
      imgs: [],
      imgsold:[{
        showPath:'',
        extPath:'',
      }],
      imgsoldflag:true,
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      isShow:false,

    }
  },
   methods: {
        //更新图片
        add_img(event){
          let reader =new FileReader();
          let img1=this.$refs.imgfile.files[0];
          if(this.$refs.imgfile.files.length<1){
            Toast({
              message: '请先选择您想要提交的图片',
              position: 'center',
              duration: 5000
            });
            return
          }
          var flag=0;
          for (var index in this.moodObj){
              if(this.moodObj[index]==''){
                flag=1;
                break;
              }
          }
          if(1==flag){
            Toast({
              message: '请先填写完整的商品信息',
              position: 'center',
              duration: 1000
            });
            return;
          }
          //商品的信息传递到img1里面

          let type=img1.type;//文件的类型，判断是否是图片
          let size=img1.size;//文件的大小，判断图片的大小
          if(this.imgData.accept.indexOf(type) == -1){
            alert('请选择我们支持的图片格式！');
            return false;
          }
          if(size>3145728){
            alert('请选择3M以内的图片！');
            return false;
          }
          var uri = ''
          let form = new FormData();
          form.append('file',img1,img1.name);
          /*上传图片信息*/
          this.$ajax.post(this.HOST+'/admin/upload',form,{
            headers:{'Content-Type':'multipart/form-data'}
          }).then(response => {
            this.remove2();
            this.imgs.push({
             showPath:response.data.showUrl,
             extPath:response.data.extPath
            });
            //此时重置老图片
            this.imgsold=[];
            this.imgsold.push({
               showPath:response.data.showUrl,
               extPath:response.data.extPath
            });
            reader.readAsDataURL(img1);
            //图片上传后  修改商品信息
            this.moodObj.showPath=response.data.showUrl,
            this.moodObj.extPath=response.data.extPath
            //修改信息
            this.upmood()
            })
        },
        upmood:function(){
          this.$ajax.post(this.HOST+'/admin/updatemood',this.moodObj).then(response => {
                           var c= response.data;
                          if(c.code==200){
                              Toast({
                                 message: '商品修改成功',
                                 position: 'center',
                                 duration: 5000
                              });
                          }else{
                           Toast({
                             message: '商品修改失败，原因:'+response.data.msg,
                             position: 'center',
                             duration: 5000
                           });
                          }
                      }).catch(error => {
                        //上传失败就删除新增的图片
                        Toast({
                           message: '商品修改失败，原因:'+response.data.msg,
                           position: 'center',
                           duration: 5000
                        });
                    }).catch(error => {
                      alert('系统繁忙，上传图片出错！');
                      this.imgs=[];
                    })
        },
        remove:function(path,index){
           this.$ajax.post(this.HOST+'/admin/deleteImg',{
             'path':path?path:this.moodObj.extPath
           }).then(response => {
              this.imgs.splice(index,1);
           }).catch(error => {
              alert('删除图片出错！');
           })
        },
        remove2:function(){
          this.$ajax.post(this.HOST+'/admin/deleteImg',{
            'path':this.imgsold[0].extPath
          }).then(response => {
          }).catch(error => {
            alert('删除图片出错！');
          })
        },
        selectKind:function(){
          this.isShow=!this.isShow;
        },
        selectThis:function(index){
          this.isShow=!this.isShow;
          this.moodObj.moodkind=this.kindarr[index].moodkind;
          this.moodkindname=this.kindarr[index].name;
        }
   },
   mounted: function() {

    //获取所有种类
      this.$ajax.get(this.HOST+'/admin/findkind').then(response => {
        this.kindarr=response.data.result;
         //获取对应id的商品信息
          this.$ajax.post(this.HOST+'/admin/findmoodId',{
            "moodid":this.moodObj.moodId,
          }).then(response => {
            if(response.data.result.length<1){
              Toast({
                message: '无该型号商品,请校验后重新输入',
                position: 'center',
                duration: 5000
              });
              return;
            }
            this.moodObj=response.data.result[0]
            //此时没有moodId字段，自己新增一波
            this.moodObj.moodId= this.moodObj.id
            //因为顺序从0开始的
            var mnd = this.moodObj.moodkind-1
            this.selectThis(mnd)
            this.isShow=!this.isShow;
            this.imgsold=[{
              showPath:this.moodObj.showPath,
              extPath:this.moodObj.extPath
            }]
          }).catch(error => {
            alert('请联系彭良韬');
          })
      }).catch(error => {
        alert('种类获取失败，请联系彭良韬');
      })

   },
}
</script>

<style>
.myself label{
    display:inline-block;
    width: 95px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
    padding: 0 10px;
}
.myself input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    font-size: 16px;
    line-height: 1;
}
.selectUl{
    width: 100px;
    background-color: #f4f4f4;
    margin-left: 100px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
    user-select: none;
    cursor: pointer;
}
.addmoodbtn{
    display:block;
    width: 2rem;
    height: 0.5rem;
}
.addmoodbtn2{
  background-color:#f4f4f4;
  width:3rem;
  height:1rem;
  margin-top:1rem;
  font-size:20px;
  color:red;
}
.titleDiv{
  background-color:#f4f4f4;
  height:1rem;
  line-height:1rem;
  text-align:center;
}
</style>
