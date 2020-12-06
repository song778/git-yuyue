// pages/reserve/reserve.js
const db = wx.cloud.database();



let  goal  = '';
let borrowPeople = '';
let borrowPhone = '';
let responsiblePeople = '';
let responsiblePhone = '';
let remark = '';
let timeArr = [];
let roomName = '';

import {
  shouquan,
  shouquanSuccess,
  shouquanFail
}from "../../utils/method.js"
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    modalShow: false,
    date1: '',
    time:[
      {
        value: '9:00-10:00'
      },
      {
        value: '10:00-11:00'
       },
       {
        value: '11:00-12:00'
       },
       {
        value: '12:00-13:00'
       },
       {
        value: '13:00-14:00'
       },
       {
        value: '14:00-15:00'
       },
       {
        value: '15:00-16:00'
       },
       {
        value: '16:00-17:00'
       },
       {
        value: '17:00-18:00'
       },
       {
        value: '18:00-19:00'
       },
       {
        value: '19:00-20:00'
       },
       {
        value: '20:00-21:00'
       },
       {
        value: '21:00-22:00'
       },
       
    ],
    picker: ['a', 'b', 'c','其他'],
    index:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    roomName = options.name
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);

//获取年份  
var Y =date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
   this.setData({
     date1: Y + '-' + M + '-' + D
   })
   var date1 = Y + '-' + M + '-' + D;
   this.getReserveTime(date1)
   
  },

    //获取预约信息
    getReserveTime(date1){
      db.collection('conferenceRoom' + roomName).where({date1}).where({state:1})
      .get().then(res => {
        console.log(res)
        var timeList = [];
        for (let i = 0; i < res.data.length; i++) {
          timeList = timeList.concat(res.data[i].timeArr)
          
        }

        if(timeList.length !== 0){
          var iconList = this.data.time
          for (let i = 0; i < timeList.length; i++) {
           
            for (let j = 0; j < iconList.length; j++) {
              
              
              if(timeList[i] == iconList[j].value){
                iconList[j].disabled1 = '禁用'
                
              }
             
            }
            
          }
          // console.log(iconList)
          this.setData({
            time: iconList
          })
        }else{
          this.setData({
            time:[
              {
                value: '9:00-10:00'
              },
              {
                value: '10:00-11:00'
               },
               {
                value: '11:00-12:00'
               },
               {
                value: '12:00-13:00'
               },
               {
                value: '13:00-14:00'
               },
               {
                value: '14:00-15:00'
               },
               {
                value: '15:00-16:00'
               },
               {
                value: '16:00-17:00'
               },
               {
                value: '17:00-18:00'
               },
               {
                value: '18:00-19:00'
               },
               {
                value: '19:00-20:00'
               },
               {
                value: '20:00-21:00'
               },
               {
                value: '21:00-22:00'
               },
               
            ],
          })
        }
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //选择日期
  DateChange(e) {
    this.setData({
      date1: e.detail.value
    })
    var date1 = e.detail.value
    this.getReserveTime(date1)
  },
    //选择单位
    PickerChange(e) {
      console.log(e);
      if(e.detail.value == '3'){
        this.setData({
          modal9:true
        })
      }else{
      
      this.setData({
        index: e.detail.value
      })
      }
      
    },
    input(e) {
      this.setData({
        email: e.detail.value
      })
    },
    // 输入弹框
    handleClick9() {
      if (this.data.email) {
        var picker = this.data.picker
        picker[0] = this.data.email
        this.setData({
          index: '0',
          picker
        })
        // tui.toast('您输入了：' + this.data.email);
      }
      this.hide9();
    },

    //关闭弹框
    hide9() {
      this.setData({
        modal9: false
      })
    },

  //选择时间段
  checkboxChange(e){
    // console.log(e)
     timeArr = e.detail.value
    // console.log(timeArr)
  },

  //使用目的
  inputGoal(e){
    // console.log(e)
    goal = e.detail.value
  }, 
   //借用人
   inputBorrowPeople(e){
    borrowPeople = e.detail.value
  },
   //借用人联系方式
   inputBorrowPhone(e){
    borrowPhone = e.detail.value
  },
   //组织负责人
   inputResponsiblePeople(e){
    responsiblePeople = e.detail.value
  },
   //负责人联系方式
   inputResponsiblePhone(e){
    responsiblePhone = e.detail.value
  },
  //备注
  textareaBInput(e){
    // console.log(e)
    remark = e.detail.value
  },

   
  //授权成功执行
  onLoginSuccess(event) {
    
    const detail = event.detail
    // console.log(detail)
    this.onPublish()
  //   this.setData({
  //     avatarUrl :detail.avatarUrl,
  //     nickName : detail.nickName,
  //     register:true
  //  })
  },
 //授权执行失败
 onLoginFail() {
    
  shouquanFail()
 },
  //提交申请
  onPublish(){
     // 授权订阅消息
     this.subscribeMsg()
    wx.showLoading({
      title: '加载中...',
    })
    var userInfor = wx.getStorageSync('userInfor')
    // console.log(userInfor)
    if(userInfor){
      console.log('上传信息')
      var unit = this.data.picker[this.data.index]

       var date1 = this.data.date1;
       db.collection('conferenceRoom' + roomName).add({
      data: {
        unit,  //单位
        goal,  //目的
        borrowPeople, //借用人
        borrowPhone,  //借用人联系方式
        responsiblePeople,  //组织人
        responsiblePhone,//组织人联系方式
        remark,  //备注
        date1, //借用日期
        timeArr,  //借用时间段
        createTime: db.serverDate(),//获取服务端时间
        ...userInfor, //发布者信息
        state:0,
        roomName //会议室房间
      }
    }).then((res) => {  
     wx.hideLoading()
      wx.showToast({
        title: '发布成功',
      })

   


      // 返回
      wx.navigateBack({
        delta: 1,
      })
      
     
    })
    }else{
      wx.hideLoading()
      this.setData({
        modalShow: true
     })
    }
    
    
   
  },

  // 订阅消息
  subscribeMsg() {
    let that = this
    let tmplId = ['GJ-KMhI394iwmId8Hrbvjx4jUaUUh_819673ovGGjdU']; //['gh8CVR5Qn0-an','YqJnLuXMt7027NAEBB0p'] 一条或者多条
    //var template_ids = app.globalData.tmplIds;
    wx.requestSubscribeMessage({
        tmplIds: tmplId,//template_ids
        success(res) {
            if (res[tmplId] == 'accept') { //某条订阅信息 接收或者拒绝
                // that.cloudSendMsg();
              console.log('授权订阅成功1')
            } else if (res[tmplId] == 'reject') { // 用户拒绝授权
                wx.showModal({
                    title: '温馨提示',
                    content: "您已关闭消息推送，如需要消息推送服务，请点击确定跳转设置页面打开授权后再次尝试。",
                    success: function(modal) {
                        if (modal.confirm) { // 点击确定
                            wx.openSetting({ withSubscriptions: true })
                        }
                    }
                })
            }
        },
        fail(err) {
            if (err.errCode == '20004') {
                wx.showModal({
                    title: '温馨提示',
                    content: "您的消息订阅主开关已关闭，如需要消息推送服务，请点击确定跳转设置页面打开授权后再次尝试。",
                    success: function(modal) {
                        if (modal.confirm) { // 点击确定
                            wx.openSetting({ withSubscriptions: true })
                        }
                    }
                })
            }
        },
       complete(res) {
        console.log('complete  调用完成')
        // 无论取消还是接收都会执行:比如 下单(无论订阅号是取消还是接收都执行)
        // this.pay()
        console.log('授权订阅成功2')
      }
    })
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