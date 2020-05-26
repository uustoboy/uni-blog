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
		
		
			
		
		
	},
	onShow: function() {
		console.log('App Show');
		wx.cloud.init({
			traceUser: true,
			env:"uustoboy-yryxc"
		});
		let that = this;
		let userInfo = uni.getStorageSync('userInfo')||'';
		console.log(userInfo.openid);
		if(userInfo.openid){
			console.log(1111)
			//更新登陆状态
			uni.getStorage({
				key:'userInfo',
				success:res=>{
					console.log(res)
					that.login(res.data);
				}
			})
		}else{
			console.log(2222)
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
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page{
	@include bgc(#eee);
	@include w(100%);
	@include over-x(hidden);
}
</style>
