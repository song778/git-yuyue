// pages/GLentrance/GLentrance.js
const db = wx.cloud.database();

import time from "../../utils/time.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    roomName:'A'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageA()
  },

  //切换会议室
  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id)
    if(e.currentTarget.dataset.id == 0){
     var roomName = 'A';
      this.setData({
        messages:[]
      })
      this.getMessageA()
    }else{
      var roomName = 'B'
      this.setData({
        messages:[]
      })
      this.getMessageB()
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      roomName,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
//获取预约会议室A信息
  getMessageA(start = 0){
    db.collection('conferenceRoomA').where({})
    .skip(start) // 跳过结果集中的前 10 条，从第 11 条开始返回
    .limit(10) // 限制返回数量为 10 条
    .orderBy('createTime', 'desc')
    .get().then(res => {
      // console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = {text:time(new Date(res.data[i].createTime))}  
    }
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].avatarUrl = {url:res.data[i].avatarUrl}    
  }
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].roomName = {text:res.data[i].roomName}    
}

    this.setData({
      messages:res.data
    })
    })
  },
  //获取预约会议室B信息
  getMessageB(start = 0){
    db.collection('conferenceRoomB').where({})
    .skip(start) // 跳过结果集中的前 10 条，从第 11 条开始返回
    .limit(10) // 限制返回数量为 10 条
    .orderBy('createTime', 'desc')
    .get().then(res => {
      // console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = {text:time(new Date(res.data[i].createTime))}  
    }
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].avatarUrl = {url:res.data[i].avatarUrl}    
  }
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].roomName = {text:res.data[i].roomName}    
}

    this.setData({
      messages:res.data
    })
    })
  },

  //跳转到预定详情
  onOrderDetail(e){
    var _id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../reserveDetail/reserveDetail?_id=' + _id + '&roomName=' + this.data.roomName,
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