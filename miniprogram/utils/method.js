export const shouquan = () => {

  return new Promise((resolve, reject) => {
          //判断用户是否授权
          wx.getSetting({
            success: (res) => {
              
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: (res) => {
                   
                   resolve(res)
                  }
                })
              } else {
                reject()
    
              }
            }
          })
  })
}

export const shouquanSuccess = () => {
  //console.log('完成')
  


}

export const shouquanFail = ()=>{
    wx.hideLoading()
    wx.showModal({
      title: '授权用户才能操作',
      content: '',
    })

}