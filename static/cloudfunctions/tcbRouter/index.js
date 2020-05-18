// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router'); //引用TcbRouter
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	 const app = new TcbRouter({ event})

  const wxContext = cloud.getWXContext()
// app.use 表示该中间件会适用于所有的路由
  app.use(async(ctx,next)=>{
    ctx.data={}
   await next()

})

app.router('user', async (ctx, next) => {
    ctx.data.name = '白小白'
    ctx.data.role ='小码'
    await next()

  }, async(ctx)=>{
    ctx.data.nickName = '简单'
    ctx.body={code:0,date:ctx.data}
  })
  
  app.router('blog', async (ctx, next) => {
      await next()
  
    }, async(ctx)=>{
		let blog
      try {
		blog = await db.collection('blog').orderBy('date', 'desc').skip(0).limit(10).get().then(res => {
		  return res.data;
		}).catch(err => {
			console.error(err)
		})
	} catch (e) {
		console.error(e);
	}
	// console.log(blog);
      ctx.body={code:0,data:blog}
    })

  return app.serve();
}