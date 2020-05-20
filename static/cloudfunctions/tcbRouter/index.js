// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router'); //引用TcbRouter
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command;
const blogCollection = db.collection('blog');
// 云函数入口函数
exports.main = async (event, context) => {
	 const app = new TcbRouter({ event })

	const wxContext = cloud.getWXContext()
	// app.use 表示该中间件会适用于所有的路由
	  app.use(async(ctx,next)=>{
		ctx.data={}
	   await next()
	})

	app.router('blog', async (ctx, next) => {
		let blog
		let page = event.page || 0;
		try {
			blog = await blogCollection.orderBy('date', 'desc').skip(page).limit(10).get().then(res => {
				return res.data;
			}).catch(err => {
				console.error(err)
			});
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:blog}
    })
	
	//获取分类数量;
	app.router('getClassify', async (ctx, next)=>{
		let classifyName = event.name || 'tags';
		let tags
		try {
			tags = await blogCollection
			.aggregate()
			.project({
			    tagArr: `$${classifyName}.title`
			})
			.unwind('$tagArr')
			.sortByCount('$tagArr')
			.end()
			.then(res => {
			  return res.list;
			}).catch(err => {
				console.error(err)
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:tags}
	})
	
	//热门标签
	// app.router('HotTags', async (ctx, next)=>{
	// 	let HotTags
	// 	try {
	// 		HotTags = await db.collection('blog')
	// 		.aggregate()
	// 		 .project({
	// 		    list: $.concatArrays(['$tags.title', '$classify.title']),
	// 		  })
	// 		.end()
	// 		.then(res => {
	// 		  return res.list;
	// 		}).catch(err => {
	// 			console.error(err)
	// 		})
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// 	ctx.body={code:0,data:HotTags}
	// })
	
	//搜索;
	app.router('search', async (ctx, next)=>{
		let name = event.name; 
		let result
		try {
			result = await blogCollection.where(_.or([
				{
					article: db.RegExp({
					     	regexp: name,
					     	options: 'i'
					})
				},
				{
					title: db.RegExp({
				      	regexp: name,
				      	options: 'i'
				    })
				},
				{
					'tags.title':  db.RegExp({
				     	regexp: name,
				     	options: 'i'
				    })
				},
				{
					'classify.title':  db.RegExp({
				     	regexp: name,
				     	options: 'i'
				    })
				}
			])).get().then(res => {
			  return res.data;
			}).catch(err => {
				console.error(err)
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:result}
	})
	
  return app.serve();
}