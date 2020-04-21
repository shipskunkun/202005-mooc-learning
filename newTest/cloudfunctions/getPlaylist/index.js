// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'
const db = cloud.database()//初始化数据库


// 云函数入口函数
exports.main = async (event, context) => {
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  console.log(playlist);

  //云数据库只能插入单条数据，只能一条一条插入,所以需要循环
  for(let i = 0, len = playlist.length; i < len; i++) {
  	await db.collection('playlist').add({
  		data: {
  			 ...playlist[i],
  			 createTime: db.serverDate(),
		  }
  		}).then((res)=> {
  			console.log('插入成功')
  		}).catch((err)=> {
  			console.log('插入失败')
  		})
  	}
 }