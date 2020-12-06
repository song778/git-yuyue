const app = getApp();

const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getOpenid()
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
    //获取用户openid
    getOpenid(){
      wx.cloud.callFunction({
        name: 'login'
      }).then((res) => {
      //  console.log(res)
       var openid = res.result.openid
        app.globalData.openid = openid
        this.getUserMessage(openid)
      })
    },

   //获取用户信息
   getUserMessage(openid){
    //  console.log(openid)
      db.collection('userMessage').where({_openid:openid}).get().then(res => {
        console.log(res.data)
      if(res.data[0] !== undefined ){
       
      this.setData({
        guanli:res.data[0].guanli
      })
       app.globalData.userMessage = res.data[0]
       console.log('已登录')
      }else{
  
        
        console.log('未登录')
      }
        //console.log(res.data[0])
       
  
        })
    },

  //跳转到会议室
  onRoom(e){
    console.log(e)
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../conferenceRoom/conferenceRoom?name=' + name,
    })
  },

  // 跳转到管理员页面
  onEntrance(){
    wx.navigateTo({
      url: '../GLentrance/GLentrance',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})