<template>
	<view>
		<view class="tab-bar" :style={position:position}>
			<view v-for="(item,index) in list" :key="index" class="tab-list" :class="selected==index?'tab-cur':''" @click="handleCLick(index)"> 
				<view class="tab-img" >
					<image :src="selected==index?item.selectedIconPath:item.iconPath" mode="widthFix" style="width:100%;height:100%;"></image>
				</view>
				<view class="tab-text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selected:{
				type: String,
				default: "0"
			},
			disabled:{
				type: String,
				default: "-1"
			},
			position:{
				type:String,
				default: "fixed"
			}
		},
		data() {
			return {
				"list":[
					{
						"pagePath":"/pages/index/index",
						"iconPath":"/static/img/tabBar/home.png",
						"selectedIconPath":"/static/img/tabBar/home-cur.png",
						"text":"首页"
					},
					{
						"pagePath":"/pages/search/search",
						"iconPath":"/static/img/tabBar/search.png",
						"selectedIconPath":"/static/img/tabBar/search-cur.png",
						"text":"搜索"
					},
					{
						"pagePath":"/pages/classify/classify",
						"iconPath":"/static/img/tabBar/classify.png",
						"selectedIconPath":"/static/img/tabBar/classify-cur.png",
						"text":"分类"
					},
					{
						"pagePath":"/pages/me/index",
						"iconPath":"/static/img/tabBar/me.png",
						"selectedIconPath":"/static/img/tabBar/me-cur.png",
						"text":"我"
					}
				]
			}
		},
		methods: {
			handleCLick(index){
				if(this.disabled == index){
					return ;
				}
				uni.redirectTo({
				    url: this.list[index].pagePath
				});
			}
		}
	}
</script>

<style lang="scss">
$global-for-ie:false;
.tab-bar{
	@include fixed((l:0,b:0,w:100vw,h:50,z:100));
	@include bgc(#fff);
	@include box-s(0px 0px 8px #d5d5d5);
	@include flex;
}
.tab-list{
	@include fx;
	@include tac;
}
.tab-img{
	@include wh(20px);
	@include mar(7px auto 0);
}
.tab-text{
	@include h(20px);
	@include flc(12,20,#3c4555);
}
.tab-cur .tab-text{
	@include c($green-color);
}
</style>
