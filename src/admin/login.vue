<template>
  <div class="hello">
    <div class="goback" v-on:click="$router.go(-1)">返回</div>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <button @click="tologin">立即登录</button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      username:'admin',
      password:'',
    }
  },
  methods:{
    tologin:function(){


     this.$ajax.post(this.HOST+'/login',{
               "username":this.username,
               "password":this.password,
               }).then(response => {
                    if(response.data.code==200){
                      //this.$router.go(-1);//只能输入整数返回上一级
                      //router.replace(location)不添加记录
                      this.$router.push({path:'/admin/index'});//浏览器有记录
                    }else{
                       Toast({
                        message: '登录失败，原因:'+response.data.msg,
                        position: 'center',
                        duration: 5000
                       });
                    }
                }).catch(error => {
                     Toast({
                      message: '系统繁忙',
                     });
                })
    },
  },
}
</script>
<style>
  body{
    background-color:#f4f4f4;
  }
  .goback{
    background-color:#fff;
    margin-bottom:1rem;
    height:0.8rem;
    line-height:0.8rem;
    font-size:0.4rem;
    padding-left:0.3rem;
  }
  .hello{
  }
  button {
    margin: 0 auto;
    width: 3rem;
    height:1rem;
    font-size:0.3rem;
    cursor:pointer;
    display: block;
  }
</style>
