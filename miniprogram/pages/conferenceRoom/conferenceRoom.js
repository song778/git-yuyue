// pages/conferenceRoom/conferenceRoom.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date1: '',
    iconList: [ {
      time:'9:00-10:00',
      reserve:'可预约'
    }, {
      time:'10:00-11:00',
      reserve:'可预约'
    }, {
      time:'11:00-12:00',
      reserve:'可预约'
    }, {
      time:'12:00-13:00',
      reserve:'可预约'
    }, {
      time:'13:00-14:00',
      reserve:'可预约'
    }, {
      time:'14:00-15:00',
      reserve:'可预约'
    }, {
      time:'15:00-16:00',
      reserve:'可预约'
    }, {
      time:'16:00-17:00',
      reserve:'可预约'
    }, {
      time:'17:00-18:00',
      reserve:'可预约'
    }, {
      time:'18:00-19:00',
      reserve:'可预约'
    }, {
      time:'19:00-20:00',
      reserve:'可预约'
    }, {
      time:'20:00-21:00',
      reserve:'可预约'
    }, {
      time:'21:00-22:00',
      reserve:'可预约'
    }
  ],
    gridBorder:true,
    gridCol:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
var name = options.name
// console.log(name)
if(name == 'A'){
  var addres = '5号楼5楼556房间'
}else{
  var addres = '4号楼5楼533房间'
}
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y =date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
   this.setData({
     date1: Y + '-' + M + '-' + D,
     name,
     addres
   })
   var date1 = Y + '-' + M + '-' + D
   this.getReserveTime(date1)
  },

  //获取预约信息
  getReserveTime(date1){
    db.collection('conferenceRoom' + this.data.name).where({date1}).where({state:1})
    .get().then(res => {
      console.log(res)
      var timeList = [];
      for (let i = 0; i < res.data.length; i++) {
        timeList = timeList.concat(res.data[i].timeArr)
        
      }
      // console.log(timeList)
      if(timeList.length !== 0){
        var iconList = this.data.iconList
        for (let i = 0; i < timeList.length; i++) {
         
          for (let j = 0; j < iconList.length; j++) {
            
            
            if(timeList[i] == iconList[j].time){
              iconList[j].reserve = '不可预约'
              console.log(iconList[j].time)
              console.log(iconList[j].reserve)
              // break
            }
           
          }
          
        }
        // console.log(iconList)
        this.setData({
          iconList
        })
      }else{
        this.setData({
          iconList: [ {
            time:'9:00-10:00',
            reserve:'可预约'
          }, {
            time:'10:00-11:00',
            reserve:'可预约'
          }, {
            time:'11:00-12:00',
            reserve:'可预约'
          }, {
            time:'12:00-13:00',
            reserve:'可预约'
          }, {
            time:'13:00-14:00',
            reserve:'可预约'
          }, {
            time:'14:00-15:00',
            reserve:'可预约'
          }, {
            time:'15:00-16:00',
            reserve:'可预约'
          }, {
            time:'16:00-17:00',
            reserve:'可预约'
          }, {
            time:'17:00-18:00',
            reserve:'可预约'
          }, {
            time:'18:00-19:00',
            reserve:'可预约'
          }, {
            time:'19:00-20:00',
            reserve:'可预约'
          }, {
            time:'20:00-21:00',
            reserve:'可预约'
          }, {
            time:'21:00-22:00',
            reserve:'可预约'
          }
        ]
        })
      }
     
      
    })
  },
  //选择日期
  DateChange(e) {
    var date1 = e.detail.value
    this.setData({
      date1
    })
    this.getReserveTime(date1)
  },
    // 跳转到预约页面
    onEntrance(){
      wx.navigateTo({
        url: '../reserve/reserve?name=' + this.data.name,
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