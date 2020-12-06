// pages/reserveDetail/reserveDetail.js

const db = wx.cloud.database();

const app = getApp()
const tmplId = 'GJ-KMhI394iwmId8Hrbvjx4jUaUUh_819673ovGGjdU' //这是订阅消息模板id，需自行申请


import time from "../../utils/time.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomName = options.roomName
    console.log(options)
    var _id = options._id
    console.log(_id)
    this.getMessageDetail(_id,roomName)
  },
  getMessageDetail(_id,roomName){
    db.collection('conferenceRoom' + roomName).where({_id})
    .get().then(res => {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = {text:time(new Date(res.data[i].createTime))}  
    }
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].avatarUrl = {url:res.data[i].avatarUrl}    
  }


    this.setData({
      state:res.data[0].state,
      messages:res.data[0]
    })
    })
  },

  //审核通过
  onSure(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'audit',
      data: {
            _id:this.data.messages._id,
            roomName: this.data.messages.roomName,
            state: 1
          },
    }).then((res) => {
      wx.hideLoading()
      console.log('数据更新成功')
      wx.showToast({
        title: '审核通过',
      })
      this.setData({
        state:1,
        modalName: 'DialogModal1'  // 弹框进行订阅消息发送
      })
 
     
      


    })
    wx.hideLoading()
   

  },
   //审核拒绝
   onRefuse(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'audit',
      data: {
            _id:this.data.messages._id,
            roomName: this.data.messages.roomName,
            state: 2
          },
    }).then((res) => {
      wx.hideLoading()
      console.log('数据更新成功')
      wx.showToast({
        title: '拒绝申请',
      })
      // 拒绝理由
      
      
      this.setData({
        state:2,
        modalName: 'DialogModal1'  // 弹框进行订阅消息发送
      })


      
    })
    wx.hideLoading()
   
  },

// 是否发送审核结果
auditResultSure(){  //发送
  this.getSubscription()
  this.hideModal()
},
auditResultNo(){  //不发送
  wx.showToast({
    title: '不发送审核结果',
  })
  this.hideModal()
},
//订阅消息
  getSubscription(){
    var state1 = this.data.state
    if(state1 == 1){
      var state2 = '预约成功'
    }else{
      var state2 = '预约失败'
    }
    //这是模板信息
    var message = {
      userName: this.data.messages.borrowPeople,
      date: this.data.messages.date1,
      state2,
      cause: '无'
    }
      // 调用微信 API 申请发送订阅消息
      wx.requestSubscribeMessage({
        // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
        tmplIds: [tmplId],
        success:res => {
          // 申请订阅成功
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            // 这里将订阅的课程信息调用云函数存入db
            wx.cloud
              .callFunction({
                name: 'subscribe',
                data: {
                  message: message
                },
              })
              .then(res => {
                wx.showToast({
                  title: '订阅成功',
                  icon: 'success',
                  duration: 2000,
                });
                console.log('发送成功', res)
              })
              .catch(res => {
                wx.showToast({
                  title: '订阅失败',
                  icon: 'success',
                  duration: 2000,
                });
                console.log('发送失败', res)
              });
          }
        },
        fail:err => {
          console.log(err)
        }
      });
      
    
  },

  //关闭订阅消息发送弹框
  hideModal(e) {
    this.setData({
      modalName: null
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