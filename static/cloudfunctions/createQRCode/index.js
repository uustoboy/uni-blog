// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const {
    WXMINIUser,
    WXMINIQR
} = require('wx-js-utils');
const TcbRouter = require('tcb-router'); //引用TcbRouter

const appId = 'wx6d2b56387cdfc80d'; // 小程序 appId
const secret = '750bd43b930a2a2e0d7a4a5db7694ee4'; // 小程序 secret


// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
	const app = new TcbRouter({ event });
	const wxContext = cloud.getWXContext()
	
	
	//获取列表;
	app.router('createQr', async (ctx, next) => {
		let wXMINIUser = new WXMINIUser({
			appId,secret
		  })
		  let access_token = await wXMINIUser.getAccessToken();
		  let wXMINIQR = new WXMINIQR();
		  let scene =  event.event;
		  let is_hyaline = event.is_hyaline || true;
		  let path = event.path;
		  let width = event.width || 230;
		  let auto_color = event.auto_color || true;
		  let line_color = event.line_color ||{"r":0,"g":0,"b":0};
		  let qrResult = await wXMINIQR.getMiniQRLimit({
			  access_token,
			  scene,
			  path,
			  line_color,
			  is_hyaline
		  });
		  
		  const upload = await cloud.uploadFile({
			cloudPath: 'wxacode.png',
			fileContent: qrResult,
		  });
		  ctx.body={code:0,data:upload.fileID}
	});
	
	app.router('deleteQr', async (ctx, next) => {
		let result = await cloud.deleteFile({ fileList: ['cloud://uustoboy-yryxc.7575-uustoboy-yryxc-1301998997/wxacode.png'] })
		 
		return { ...result }
	});
	return app.serve();
}
