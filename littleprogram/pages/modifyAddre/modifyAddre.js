var flag=false;
Page({
  data:{
    name:"请填写您的姓名",
    tel:"请填写您的联系方式",
    door:"请填写您的捎带地址",
    address_id:"",
  },
   onLoad: function(options) {
     
     if (options.list) {
       var list = JSON.parse(options.list)
       console.log(list)
     }
    //  console.log(options)
    this.setData({
      name:list.user_name,
      tel: list.user_phone,
      door: list.address_name,
      address_id: list.address_id,
    })

   },
   //修改信息
  changename:function(e){
    var that=this;
    that.setData({
      name:e.detail.value
    })
  },
  changetel:function(e){
    var that=this;
    that.setData({
      tel:e.detail.value
    })
  },
  changedoor:function(e){
    var that=this;
    that.setData({
      door:e.detail.value
    })
  },
  //点击删除
    delete:function(){
      var that = this;
      wx.showModal({
       title: '提示',
       content: '确认删除该地址信息吗？',
       success: function(res) {
         if (res.confirm) {
           console.log('用户点击确定')
           var pages = getCurrentPages();
           var prevPage = pages[pages.length - 2]; //上一个页面
           //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
           prevPage.setData({
             delete_address_id: that.data.address_id,
           })
           wx.navigateBack({//返回
             delta: 1
           })
         } else if (res.cancel) {
           console.log('用户点击取消')
      }
    }
})

    },
//点击取消，返回上个页面
    cancel:function(){
      wx.navigateBack({
         delta: 1
      })
    },
    //点击保存
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    if(e.detail.value.name==""){
      warn = "请填写您的姓名！";
    }else if(e.detail.value.tel==""){
      warn = "请填写您的手机号！";
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))){
      warn = "手机号格式不正确";
    }else if(e.detail.value.door==""){
      warn = "请输入您的具体地址";
    }else{
      flag=true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        modify_address: {
          address_id: that.data.address_id,
          user_name: that.data.name,
          user_phone: that.data.tel,
          address_name: that.data.door,
        }
      })
      wx.navigateBack({//返回
        delta: 1
      })
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })