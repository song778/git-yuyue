// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "text-6rdd4"
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //本篇文章赞数加1
    
    let _id = event._id
    let roomName = event.roomName
    let state = event.state
    
    console.log(event)
    //console.log(titlePraiseNum)
    try {
      return await db.collection('conferenceRoom' + roomName).where({
        _id
      }).update({
        data: {
          state: state,
          
        }
      })
    } catch (e) {
      console.log(e)
    }
 
}