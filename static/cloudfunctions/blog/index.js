// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router'); //引用TcbRouter
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  
  
    const app = new TcbRouter({ event})
	
	// app.use 表示该中间件会适用于所有的路由
	  app.use(async(ctx,next)=>{
	    ctx.data={}
	    ctx.data.openId=event.userInfo.openId
	   await next()
	
	})
	
	// app.use 表示该中间件会适用于所有的路由
	// app.use(async (ctx, next) => {
	// 	ctx.data = {};
	// 	await next(); // 执行下一中间件
	// });

	// 路由为字符串，该中间件只适用于 user 路由
    // app.router('blog', async (ctx, next) => {
    //         await next();
    //     }, async (ctx, next) => {
    //         await next();
    //     }, async (ctx) => {
    //         ctx.body = {
    //             code: 0,
    //             message: 'pay success'
    //         }
    // });
	
	app.router('user', async (ctx, next) => {
	    ctx.data.name = '白小白'
	    ctx.data.role ='小码'
	    await next()
	
	  }, async(ctx)=>{
	    ctx.data.nickName = '简单'
	    ctx.body={code:0,date:ctx.data}
	  })
  
	return app.serve();

}

