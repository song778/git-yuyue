
const cloud = require('wx-server-sdk')

cloud.init({
  env:"text-6rdd4"//这是云环境id
})

// 云函数入口函数
exports.main = async (event, context) => {
    try{
      const {OPENID} = cloud.getWXContext();
      const result = await cloud.openapi.subscribeMessage.send({
        touser:OPENID,
        page:'pages/index/index',
        data:{
        //这些参数都会在模板详情那有，这些参数不能弄错，一旦弄错就发送不了
        name1:{
            value:event.message.userName
          },
          date2:{
            value:event.message.date
          },
          phrase3:{
            value:event.message.state2
          },
          thing6:{
            value:event.message.cause
          }
        },
        templateId:'GJ-KMhI394iwmId8Hrbvjx4jUaUUh_819673ovGGjdU'
      })
      console.log(result)
      return result
    }catch(err){
      console.log(err)
      return err
    }
}