<template>
	<view class="container">
		<view class="me-list">
			<view class="me-skill"><uni-title type="h3" title="技能图谱" color="#000" ></uni-title></view>
			<view class="charts-main">
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
			</view>
		</view>
		<view class="me-list">
			<uni-list >
				<uni-list-item title="About Me" :show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'info-filled'}" @click="goInfo"></uni-list-item>
			</uni-list>
		</view>
		{{hasLogin}}
		<view v-if="hasLogin">
			<view>{{userInfo.nickName}}</view>
			<view><image :src="userInfo.avatarUrl"/></view>
		</view>
		<view v-else >
			<button open-type='getUserInfo'   @click="getUserInfsso">登录</button>
		</view>
		
	</view>
</template>

<script>
	import uniTitle from "@/components/uni-ui/uni-title/uni-title.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue"
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue" 
	import uCharts from '../../components/u-charts/u-charts.js'
	
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
			uniIcons
		},
		computed:mapState(['hasLogin','userInfo']),
		data() {
			return {
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
			this.cWidth=uni.upx2px(710);
			this.cHeight=uni.upx2px(600);
			this.showPie();
			
			
		},
		onShow: function() {
			console.log('App Show11');
			
			let that = this;
			let userInfo = uni.getStorageSync('userInfo')||'';
			console.log(userInfo.openid);
			if(userInfo.openid){
				console.log(11111111)
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
			getUserInfsso(e){
				
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
	.charts-pie{
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
</style>
