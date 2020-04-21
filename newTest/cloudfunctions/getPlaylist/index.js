// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'
const db = cloud.database()//初始化数据库
const playlistCollection = db.collection('playlist')

// 云函数入口函数
exports.main = async (event, context) => {
  //数据库中已有的数据
  const list = await playlistCollection.get()

  //服务端获取的数据
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  
  const newData = [];
  for(let i =0,len1 = playlist.length;i<len1;i++){
    let flag = true;
    for(let j = 0,len2 = list.data.length;j<len2;j++){
      if(playlist[i].id == list.data[j].id){
        flag =false
        break
      }
    }
    if(flag){
      newData.push(playlist[i])
    }
  }

  //云数据库只能插入单条数据，只能一条一条插入,所以需要循环
  for(let i = 0, len = newData.length; i < len; i++) {
  	await playlistCollection.add({
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