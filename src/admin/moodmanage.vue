<template>
  <div class="clearfix">
    <div><span>商品名称:</span><input type="text"/></div>








    <div style="position:relative" v-if="imgs.length>=6 ? false : true">
      <input class="upload" ref="imgfile"  type="file">
    </div>
    <button  @click='add_img' v-if="imgs.length>=6 ? false : true" >点击上传</button>
    <div v-if="imgs.length>0" v-for='(item ,index ) in imgs'>
      <img :src="item.showPath">
      <button v-on:click="remove(item.extPath,index)">X</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      imgs: [],
      imgKind:'dj',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      }
    }
  },
   methods: {
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
          if(this.imgKind==''){
            Toast({
              message: '请先选择您所上传的图片种类',
              position: 'center',
              duration: 5000
            });
            return
          }
          img1.kind=this.imgKind
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
            form.append('file',img1,img1.kind);
          this.$ajax.post(this.HOST+'/admin/upload',form,{
            headers:{'Content-Type':'multipart/form-data'}
          }).then(response => {
            this.imgs.push({
             showPath:response.data.showUrl,
             extPath:response.data.extPath
            });
            reader.readAsDataURL(img1);
            /*
            var that=this;
            reader.onloadend=function(){
             // that.imgs.push(uri);
              console.log(that.imgs)
            }
            */

          }).catch(error => {
            alert('上传图片出错！');
          })
        },
        remove:function(path,index){
           this.$ajax.post(this.HOST+'/admin/deleteImg',{
           'path':path
           }).then(response => {
                      this.imgs.splice(index,1);
                    }).catch(error => {
                      alert('删除图片出错！');
                    })










        }
   },

}
</script>

<style>
.clearfix input{
  width:4rem;
  height:1rem;
  line-height:1rem;
  font-size:0.7rem;
}
</style>
