// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router'); //引用TcbRouter

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command;
const $ = db.command.aggregate;
const messageCollection = db.collection('message');
const userInfoCollection = 	db.collection('userInfo');
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
	const app = new TcbRouter({ event });
	const wxContext = cloud.getWXContext();
	//获取列表;
	app.router('getComments', async (ctx, next) => {
		// let pid = event.pid || '70d29fac5ec4ce730008b75710368de1';
		let pid = '70d29fac5ec4ce730008b75710368de1';
		let message
		try {
			message = messageCollection.where({
				pid,
				type:2
			}).get().then(res=>{
				console.log(res);
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:message}
	})
	
	return app.serve();
}

