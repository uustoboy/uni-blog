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
const $ = db.command.aggregate;
const blogCollection = db.collection('blog');

// 云函数入口函数
exports.main = async (event, context) => {
	const app = new TcbRouter({ event });
	const wxContext = cloud.getWXContext()
	
	//获取列表;
	app.router('blog', async (ctx, next) => {
		let blog
		let page = parseInt(event.page) || 0;
		try {
			let skipNum = (page-1)*10;
			
			blog = await blogCollection.orderBy('date', 'desc').skip(skipNum).limit(10).field({_id: true,title: true,date: true,digest:true,tags:true,classify:true,}).get().then(res => {
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
	
	//获取热门标签
	app.router('hotTags', async (ctx, next)=>{
		let HotTags
		try {
			HotTags = await db.collection('blog')
			.aggregate()
			.project({
				_id:0,
			    list: $.concatArrays(['$tags.title', '$classify.title']),
			 })
			.end()
			.then(res => {
				let lists = res.list;
				let newList = [];
				for(let value of lists){
					newList = [...new Set(value.list)]
				}
				
				if(newList.length > 5){
					function getRandomArrayElements(arr, count) {
					  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
					  while (i-- > min) {
						  index = Math.floor((i + 1) * Math.random());
						  temp = shuffled[index];
						  shuffled[index] = shuffled[i];
						  shuffled[i] = temp;
					  }
					  return shuffled.slice(min);
					}
					let randomArray = getRandomArrayElements(newList, 5);
					return randomArray;
				}else{
					return newList;
				}
			}).catch(err => {
				console.error(err)
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:HotTags}
	})
	
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
			])).orderBy('date', 'desc').get().then(res => {
			  return res.data;
			}).catch(err => {
				console.error(err)
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:result}
	});
	
	//获取内容;
	app.router('getArticle', async (ctx, next)=>{
		let id = event.id; 
		let result
		try {
			await blogCollection.doc(id).update({
				data:{
					look: _.inc(1)
				}
			})
			
			result = await blogCollection.doc(id).get().then(res=>{
				return res.data;
			})
		} catch (e) {
			console.error(e);
		}
		ctx.body={code:0,data:result}
	});
	
	
	return app.serve();
}