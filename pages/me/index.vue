<template>
	<view class="container">
		
		<view class="me-list me-head">
			<view class="me-headLeft">
				<image class="me-avatar" :src="oneself.avatarUrl"/>
			</view>
			<view class="me-headRight">
				<view class="me-name">
					{{oneself.nickName}}
				</view>
				<view class="me-wechatID">
					微信号:  {{oneself.wechat}}
				</view>
				<m-icon class="me-code" type="code" color="#4AC41C" size="30" @click="goCode"></m-icon>
			</view>
		</view>
		<view class="me-list">
			<view class="me-skill"><uni-title type="h3" title="技能图谱" color="#000" ></uni-title></view>
			<view class="charts-main">
				<view v-show="popup">
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
				</view>
			</view>
			
		</view>
		<view class="me-list">
			<uni-list >
				<uni-list-item title="About Me" :show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'info-filled'}" @click="goInfo"></uni-list-item>
				<uni-list-item title="@uustoboy"  thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589213252098&di=e58c164459cc818c71abd3105f1c415b&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_pic%2F01%2F16%2F99%2F42570527ee4ed5b.jpg" @click="goGithub"></uni-list-item>
			</uni-list>
		</view>
		<uni-popup ref="popup" type="center" class="wechat-popupMain" :mask-click="false">
			<view class="wechat-popup">
				<view>
					<image src="../../static/img/wechat-code.png" mode="widthFix" class="wechat-codeImg"></image>
					<button size="default" @click="hidePop" type="warn">关闭</button>
				</view>	
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniTitle from "@/components/uni-ui/uni-title/uni-title.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue"
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue" 
	import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
	import uCharts from '@/components/u-charts/u-charts.js'
	import clipboard from "@/components/dc-clipboard/clipboard.js"
	import mIcon from "@/components/icon/m-icon.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var _self;
	var canvaPie=null;
	export default {
		components:{
			uniTitle,
			uniList,
			uniListItem,
			uniIcons,
			mIcon,
			uniPopup
		},
		computed:mapState(['hasLogin','userInfo']),
		data() {
			return {
				popup:true,
				oneself:'',
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				piearr:[],
				"chartData": {
				  "series": [{
					"name": "html",
					"data": 50,
					"legendShape":"rect"
				  }, {
					"name": "css",
					"data": 10,
					"legendShape":"rect"
				  }, {
					"name": "js",
					"data": 10,
					"legendShape":"rect"
				  }, {
					"name": "vue",
					"data": 10,
					"legendShape":"rect"
				  }, {
					"name": "react",
					"data": 10,
					"legendShape":"rect"
				  }, {
					"name": "node",
					"data": 10,
					"legendShape":"rect"
				  }]
				}
			}
		},
		onLoad() {
			_self = this;
			let that = this;
			this.cWidth=uni.upx2px(710);
			this.cHeight=uni.upx2px(600);
			this.showPie();
			wx.cloud.init();
			wx.cloud.callFunction({
				name:'userInfo',
				success:cloudRes=>{
					that.oneself = cloudRes.result.data;
				},
				fail:res=>{
					console.log('云函数调用失败!');
				}
			})
			
		},
		onShow: function() {
			console.log('App Show11');
			
			let that = this;
			let userInfo = uni.getStorageSync('userInfo')||'';
			// console.log(userInfo.openid);
			if(userInfo.openid){
				// console.log(11111111)
				//更新登陆状态
				uni.getStorage({
					key:'userInfo',
					success:res=>{
						this.login(res.data);
					}
				})
			}
		},
		created(){
		},
		methods: {
			...mapMutations(['login']),
			hidePop(){
				this.$refs.popup.close();
				this.popup = true;
				uni.setClipboardData({
				    data: 'tianqi_2786',
				    success: function () {
				    }
				});
			},
			goCode(){
				this.$refs.popup.open();
				this.popup = false;
			},
			getUserInfsso(e){
				
			},
			goGithub(){
				// clipboard.setText('https://github.com/uustoboy');
				// uni.hideToast()
				uni.setClipboardData({
						data:'https://github.com/uustoboy',
						success() {
							// uni.hideToast()
							// uni.showToast({
							// 	title: '复制成功',
							// 	duration:2000,
							// 	icon:"none"
							// })
						}	
					})
			},
			goInfo(){
				uni.navigateTo({
				    url: '../info/info'
				});
			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: 'canvasPie',
					type: 'pie',
					fontSize:14,
					legend:{
					  show:true,
					  position:'top',
					  float:'left',
					  itemGap:10,
					  padding:5,
					  lineHeight:26,
					  margin:5,
					  borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: this.chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth:15
						}
					},
				});
				this.piearr=canvaPie.opts.series;
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		@include bgc(#F2F2F2);
		@include w(100%);
		@include over-x(hidden);
	}
	
	.me-head{
		@include rel;
		@include flex;
		@include pad(10px);
		@include box-sz();
	}
	.me-headLeft{
		@include wh(60px);
		@include mar(0 20px 0 0);
	}
	.me-avatar{
		@include wh(60px);
		@include bdrs(50%);
	}
	.me-name{
		@include flcb(25,30,#000);
	}
	.me-code{
		@include abs((r:20px,t:28%));
	}
	.me-wechatID{
		@include flc(16,30,#ccc);
	}
	.charts-pie,.charts-main{
		width: 710upx; 
		height:600upx;
		background-color: #FFFFFF;
		@include bgc(#fff);
	}
	.me-list{
		@include w(95%);
		@include mar(10px auto);
		@include bgc(#fff);
		@include bdrs(5px);
	}
	.me-skill{
		@include mar( 0 0 0 10px);
	}
	.wechat-popupMain{
		z-index:500;
	}
	.wechat-popup{
		@include flex;
		@include jc(center);
		@include ai(center);
		@include wh(80vw,80vh);
		@include bgc(#fff);
		@include bdrs(5px);
	}
	.wechat-codeImg{
		@include w(70vw);
		@include mar(0 0 5px 0);
	}
</style>
