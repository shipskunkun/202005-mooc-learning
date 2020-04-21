mock 数据地址：

[xiecheng328/miniprogram](https://github.com/xiecheng328/miniprogram)

## 3章

### 3-1 轮播图组件swiper

block 作用， 和 vue 中 template 差不多	
不会真正渲染到界面上，一般用于 wx:for 中

```
<block wx:for="{{swiperImgUrls}}" wx:key="">
    <swiper-item>
        <image class="swiper-image" src="{{item.url}}" mode="widthFix" style="width:100%"/>
    </swiper-item>
</block>
```


图片的常用的：mode

	scaleToFill	缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素	
	
	aspectFit	缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
	
	aspectFill	缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
	
	widthFix	缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
	
	heightFix	缩放模式，高度不变，宽度自动变化，保持原图宽高比不变

如何用js模拟这几种效果？

小程序默认尺寸：
	
	image组件默认宽度300px、高度240px
	swiper，100%, 高度 150px

### 3-2 组件化开发

面向用户的，独立的，可服用的交互元素的封装

	结构：wxml		
	逻辑：js	
	样式：wxss	

优点：

	对实现分层，有效的代码组合方式
	资源重组和优化
	有利于单元测试
	有利于重构
原则：

	高内聚
	低耦合
	单一职责
	避免过多参数

### 3-3 自定义歌单组件playlist

1. 小程序使用background 时候，无法直接使用
需要转为 base64

	如何使用 base64? 先转成base64编码 
	
```css
background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PGcgb3BhY2l0eT0iLjE1Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNDAwMDAiIGQ9Im0yMiAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvZz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiIGQ9Im0yMCAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvc3ZnPg==) no-repeat 0 8rpx/22rpx 20rpx;
	
// ??? background-position 三个值？
x% y%

background : background-color background-image background-repeat background-attachment background-position background-size;


background: url() no-repeat 0 8rpx/22rpx 20rpx;

代表的是：
background-position background-size
left: 0
top: 8rpx/22rpx
size: 20rpx auto
	
```

	

2. 文本不超过两行，超出部分使用 ... 显示，如何做？

```css
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow : hidden;
  text-overflow: ellipsis;
```

### 3-4 播放数量细节处理

对播放量数字的处理

```
properties: {
	playlist: {
	  type: Object,
	}
},
observers: {
    ['playlist.playCount'](count) {
      this.setData({
        _count: this._tranNumber(count, 2)
      })
    }
  },
```

### 3-5 详解wx-key
### 3-6 详解promise
### 3-7 详解async await

小程序中无法直接使用 async awati， 引入插件文件才可以

async 返回值是一个 promise 对象

await,表示，后面是一个异步操作，等待这个异步操作结束后，再执行 await 后面的语句

await 返回结果是一个promise 对象。

把异步函数 变成 同步的。

```javascript
import regeneratorRuntime from '../../utils/runtime.js'

async foo() {
	console.log(1);
	let a = await this.timeout();
	console.log(a);
	
},
timeout() {
	return new Promise((resolve, reject)=> {
	  setTimeout(()=> {
	    resolve('done')
	  })
	})
}
```

### 3-8 读取歌单数据并插入云数据库

1. 新建云函数的方法：

	在 cloudfunctions 点击右键，新建 node.js 云函数
	如： getPlaylist

2. 使用npm 安装 request/promise 的包

	安装路径：在getPlaylist 右键，在终端打开
	
	在这个<b> 云函数目录文件夹下</b>，执行
	 

	```javascript
	sudo npm install --save request
	
	sudo npm install --save request-promise
	
	```
	
3. 云函数

 	在云函数中写的代码，相当于后端代码，后端代码是不会打印在前端中的  	
	所以在云函数中写 console.log 是不会打印在小程序开发工具中的

	写完云函数后，需要右键选择，上传并部署


4. 获取数据第一步
	
	后端返回的是字符串，先转为对象，然后获取 result 属性
	
	在 云函数中 console.log 在云函数，调试日志中显示出来
	
	在云平台中，点击数据库，插入集合，取名字，playlist
	
	云数据库只能插入单条数据，只能一条一条插入,所以需要循环
	
	差点以为又不行了！！！吓死，结果是语法错误
	
	getplaylist 1.0 版本：
	
	```javascript
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
	```
	

### 3-9 歌单数据去重

歌单数据重复，如何去重？  
如果数据库中已经存在，最近获取歌单，不导入到数据库中
歌单id唯一，如果歌单id已经存在数据库中，不插入

遍历playlist 数据，在数据库中list中找，如果找到 id 已存在的，不插入，否则插入

getplaylist 2.0 版本：
	
```javascript
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
```



### 3-10 突破获取数据条数的限制





### 3-11 上拉加载与下拉刷新
### 3-12 云函数路由优化tcb-router
### 3-13 自定义歌曲列表组件musiclist
### 3-14 高亮显示当前选中歌曲
### 3-15 恭喜你，这章的内容已经学习完毕。