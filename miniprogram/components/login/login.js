
const db = wx.cloud.database();
const app = getApp();
let openid = '';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotUserInfo(event) {
      wx.showLoading({
        title: '授权中...',
      })
      //console.log(event)
      const userInfo = event.detail.userInfo
      // 允许授权
      if (userInfo) {
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          modalShow: false
        })

        db.collection('userMessage').add({
          data:{
            ...userInfo,
            guanli:false,
            blacklist:false,
            
          }
        }).then((res)=>{
          console.log('插入用户信息成功')
          
        })
        wx.setStorageSync('userInfor', userInfo)
        this.triggerEvent('loginsuccess', userInfo)
       
      } else {
        wx.hideLoading({
          success: (res) => {},
        })
        this.triggerEvent('loginfail')
      }
    },
  
  }
})
