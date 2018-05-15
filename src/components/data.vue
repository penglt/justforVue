<script>
export default {
  data :function() {
    return {"2016Q1": [
      {channel: '首页',tab:'/'},
      {channel: '灯具',tab:'/mood/dj'},
      {channel: '太阳能',tab:'/mood/tyn'},
     // {channel: '笑话',tab:'/joke'},
      {channel: '后台',tab:'/admin'},
    //  {channel: '上传',tab:'/upload'},
    ],
    "admin": [
      {channel: '退出',tab:'/'},
      {channel: '商品新增',tab:'/upload'},
      {channel: '商品查看',tab:'/manage'},
    ]}
  }
}
</script>
