webpackJsonp([1],{77:function(e,t,o){function i(e){o(94)}var a=o(1)(o(83),o(99),i,null,null);e.exports=a.exports},83:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o(18),a=o.n(i),n=o(4);o.n(n);t.default={data:function(){return{lists:a.a.data().admin,kindarr:[{name:"抽油烟机",moodkind:"4"},{name:"煤气灶",moodkind:"3"},{name:"五金",moodkind:"2"},{name:"灯具",moodkind:"1"}],moodkindname:"",moodObj:{moodkind:"",moodId:this.$route.params.productId,memberPrice:"",guige:"",changjing:"适用任何场景",name:"",descr:"0",showPath:"x",extPath:"x"},imgs:[],imgsold:[{showPath:"",extPath:""}],imgsoldflag:!0,imgData:{accept:"image/gif, image/jpeg, image/png, image/jpg"},isShow:!1}},methods:{add_img:function(e){var t=this,i=new FileReader,a=this.$refs.imgfile.files[0];if(this.$refs.imgfile.files.length<1)return void o.i(n.Toast)({message:"请先选择您想要提交的图片",position:"center",duration:5e3});var s=0;for(var d in this.moodObj)if(""==this.moodObj[d]){s=1;break}if(1==s)return void o.i(n.Toast)({message:"请先填写完整的商品信息",position:"center",duration:1e3});var l=a.type,m=a.size;if(-1==this.imgData.accept.indexOf(l))return alert("请选择我们支持的图片格式！"),!1;if(m>3145728)return alert("请选择3M以内的图片！"),!1;var r=new FormData;r.append("file",a,a.name),this.$ajax.post(this.HOST+"/admin/upload",r,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){t.remove2(),t.imgs.push({showPath:e.data.showUrl,extPath:e.data.extPath}),t.imgsold=[],t.imgsold.push({showPath:e.data.showUrl,extPath:e.data.extPath}),i.readAsDataURL(a),t.moodObj.showPath=e.data.showUrl,t.moodObj.extPath=e.data.extPath,t.upmood()})},upmood:function(){var e=this;this.$ajax.post(this.HOST+"/admin/updatemood",this.moodObj).then(function(e){200==e.data.code?o.i(n.Toast)({message:"商品修改成功",position:"center",duration:5e3}):o.i(n.Toast)({message:"商品修改失败，原因:"+e.data.msg,position:"center",duration:5e3})}).catch(function(e){o.i(n.Toast)({message:"商品修改失败，原因:"+response.data.msg,position:"center",duration:5e3})}).catch(function(t){alert("系统繁忙，上传图片出错！"),e.imgs=[]})},remove:function(e,t){var o=this;this.$ajax.post(this.HOST+"/admin/deleteImg",{path:e||this.moodObj.extPath}).then(function(e){o.imgs.splice(t,1)}).catch(function(e){alert("删除图片出错！")})},remove2:function(){this.$ajax.post(this.HOST+"/admin/deleteImg",{path:this.imgsold[0].extPath}).then(function(e){}).catch(function(e){alert("删除图片出错！")})},selectKind:function(){this.isShow=!this.isShow},selectThis:function(e){this.isShow=!this.isShow,this.moodObj.moodkind=this.kindarr[e].moodkind,this.moodkindname=this.kindarr[e].name}},mounted:function(){var e=this;this.$ajax.get(this.HOST+"/admin/findkind").then(function(t){e.kindarr=t.data.result,e.$ajax.post(e.HOST+"/admin/findmoodId",{moodid:e.moodObj.moodId}).then(function(t){if(t.data.result.length<1)return void o.i(n.Toast)({message:"无该型号商品,请校验后重新输入",position:"center",duration:5e3});e.moodObj=t.data.result[0],e.moodObj.moodId=e.moodObj.id;var i=e.moodObj.moodkind-1;e.selectThis(i),e.isShow=!e.isShow,e.imgsold=[{showPath:e.moodObj.showPath,extPath:e.moodObj.extPath}]}).catch(function(e){alert("请联系彭良韬")})}).catch(function(e){alert("种类获取失败，请联系彭良韬")})}}},89:function(e,t,o){t=e.exports=o(71)(!1),t.push([e.i,".myself label{display:inline-block;width:95px;-webkit-box-flex:0;-ms-flex:none;flex:none;overflow:hidden;padding:0 10px}.myself input,.myself label{font-size:16px;line-height:1}.myself input{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0;border:0;-webkit-box-flex:1;-ms-flex:1;flex:1;outline:0}.selectUl{width:100px;background-color:#f4f4f4;margin-left:100px;text-align:center;font-size:16px;margin-bottom:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.addmoodbtn{display:block;width:2rem;height:.5rem}.addmoodbtn2{width:3rem;margin-top:1rem;font-size:20px;color:red}.addmoodbtn2,.titleDiv{background-color:#f4f4f4;height:1rem}.titleDiv{line-height:1rem;text-align:center}",""])},94:function(e,t,o){var i=o(89);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);o(72)("d938693a",i,!0)},99:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"clearfix"},[o("div",{staticClass:"titleDiv"},[o("span",{staticClass:"left",staticStyle:{cursor:"pointer"},on:{click:function(t){e.$router.go(-1)}}},[e._v("返回")]),e._v("\n     商品详情页-管理\n  ")]),e._v(" "),o("mt-field",{attrs:{label:"型号",placeholder:"型号",readonly:"readonly",disableClear:""},model:{value:e.moodObj.moodId,callback:function(t){e.moodObj.moodId=t},expression:"moodObj.moodId"}}),e._v(" "),o("div",{staticClass:"myself"},[o("label",[e._v("种类")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.moodkindname,expression:"moodkindname"}],attrs:{placeholder:"点击切换",readonly:""},domProps:{value:e.moodkindname},on:{click:e.selectKind,input:function(t){t.target.composing||(e.moodkindname=t.target.value)}}})]),e._v(" "),e.isShow?o("ul",{staticClass:"selectUl"},e._l(e.kindarr,function(t,i){return o("li",{on:{click:function(t){e.selectThis(i)}}},[e._v(e._s(t.name))])})):e._e(),e._v(" "),o("mt-field",{attrs:{label:"名称",placeholder:"名称"},model:{value:e.moodObj.name,callback:function(t){e.moodObj.name=t},expression:"moodObj.name"}}),e._v(" "),o("mt-field",{attrs:{label:"价格/元",placeholder:"价格",type:"number"},model:{value:e.moodObj.memberPrice,callback:function(t){e.moodObj.memberPrice=t},expression:"moodObj.memberPrice"}}),e._v(" "),o("mt-field",{attrs:{label:"规格/mm",placeholder:"规格"},model:{value:e.moodObj.guige,callback:function(t){e.moodObj.guige=t},expression:"moodObj.guige"}}),e._v(" "),o("mt-field",{attrs:{label:"功率/w",placeholder:"功率",type:"number"},model:{value:e.moodObj.descr,callback:function(t){e.moodObj.descr=t},expression:"moodObj.descr"}}),e._v(" "),o("mt-field",{attrs:{label:"适用场所",placeholder:"适用场所"},model:{value:e.moodObj.changjing,callback:function(t){e.moodObj.changjing=t},expression:"moodObj.changjing"}}),e._v(" "),e.imgsoldflag?e._e():o("div",{staticStyle:{position:"relative"}},[o("input",{ref:"imgfile",staticClass:"upload",attrs:{type:"file"}})]),e._v(" "),e.imgs.length>0?o("div",[o("img",{attrs:{src:e.imgs.length>0?e.imgs[0].showPath:"",alt:"这是新图片"}}),e._v(" "),o("span",{staticStyle:{"background-color":"#f4f4f4",padding:"0.1rem"},on:{click:function(t){e.remove()}}},[e._v("x")])]):e._e(),e._v(" "),e.imgsoldflag?o("div",[o("img",{attrs:{src:0==e.imgs.length?e.imgsold[0].showPath:"xx",alt:"这是老图片"}}),e._v(" "),o("span",{staticStyle:{"background-color":"#f4f4f4",padding:"0.1rem"},on:{click:function(t){e.imgsoldflag=!1}}},[e._v("x")])]):e._e(),e._v(" "),e.imgsoldflag?e._e():o("button",{staticClass:"addmoodbtn",on:{click:e.add_img}},[e._v("更新图片信息")]),e._v(" "),o("button",{staticClass:"addmoodbtn2",on:{click:e.upmood}},[e._v("更新商品信息")])],1)},staticRenderFns:[]}}});