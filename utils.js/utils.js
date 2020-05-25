export async function requestCloud (name,data) {
    let req = await wx.cloud.callFunction({
		// 要调用的云函数名称
		name: name,
		// 传递给云函数的参数
		data:data
	}).then(res=>{
		return res;
	});
	return req;
};