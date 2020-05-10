<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
export default {
	computed:mapState(['hasLogin']),
	methods:{
		...mapMutations(['login'])
	},
	onLaunch: function() {
		console.log('App Launch');
		
		wx.cloud.init();
		let that = this;
		let userInfo = uni.getStorageSync('userInfo')||'';
		if(userInfo.openid){
			//更新登陆状态
			uni.getStorage({
				key:'unserInfo',
				success:res=>{
					this.login(res.data);
				}
			})
		}else{
			// wx登录
			wx.login({
			  success (loginRes) {
				if (loginRes.code) {
				  //发起网络请求
				  let code = loginRes.code
				  uni.showLoading({
				      title: '登录中'
				  });
					// 获取微信用户信息
					wx.getUserInfo({
					  success: function(res) {
						let userInfo = res.userInfo
						wx.cloud.callFunction({
							name:'login',
							success:cloudRes=>{
								uni.hideLoading();
								console.log(cloudRes);
								let openid = cloudRes.result.openid;
								userInfo.openid = openid;
								that.login(res.userInfo);
							},
							fail:res=>{
								console.log('云函数调用失败');
							}
						})
					  },
					  fail:res=>{
						  // 获取失败的去引导用户授权 
					   }
					})
				}
			  }
			})
		}
			
		
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
