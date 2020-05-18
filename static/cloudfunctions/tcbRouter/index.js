// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router'); //引用TcbRouter
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	 const app = new TcbRouter({ event})

  const wxContext = cloud.getWXContext()
// app.use 表示该中间件会适用于所有的路由
  app.use(async(ctx,next)=>{
    ctx.data={}
    ctx.data.openId=event.userInfo.openId
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

  return app.serve();
}