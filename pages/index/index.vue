<template>
	<view class="container">
		<view>
			<view class="scroll">
				<m-card  @handleDigestClick="handleDigestClick" @handleTagsClick="handleTagsClick" :blogList="blogList"></m-card>
				<view class="loading">{{loading}}</view>
			</view>
		</view>
		<view class="index-scrollBar" :animation="animationData">
			<uni-tabbar :selected="0" position="absolute"></uni-tabbar>
		</view>
	</view>
</template>

<script>
	import mCard from '@/components/m-card/m-card.vue';
	import uniTabbar from '@/components/uni-tabbar/uni-tabbar.vue';
	export default {
		components:{
			mCard,
			uniTabbar
		},
		data() {
			return {
				animationData: {},
				page:0,
				blogList:[],
				loading:'LOADING',
				lodingThrottle: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollBar:0
			}
		},
		 onUnload() {
		  this.animationData = {}
		  // 页面关闭后清空数据
		},
		onLoad(){
			this.styleObj = {position:"absolute"};
			this.animation = uni.createAnimation({
				duration: 800,
				timingFunction: 'ease',
			});
			
		},
		created(){
			this.getList();
		},
		methods: {
			running(num) {
				this.animation.bottom(num).step({duration:1000})
				this.animationData = this.animation.export()
			 },
			handleDigestClick(id){
				uni.navigateTo({
				    url: `../article/article?id=${id}`
				});
			},
			handleTagsClick(tag){
				uni.navigateTo({
				    url: `../searchPage/searchPage?name=${tag}`
				});
			},
			getList: function(){
				let that = this;
				if(this.lodingThrottle){
					this.lodingThrottle = false;
					this.page =  this.page+1;
					
					console.log(this.page)
					this.$requestCloud("tcbRouter",{
						$url: "blog",
						page: that.page
					}).then(res=>{
						console.log(res);
						if(res.result.data.length == 0){
							that.loading='No Data';
						}else{
							that.lodingThrottle = true;
							that.blogList.push(...res.result.data);
						}
					})
				}
			}
		},
		onPageScroll:function(e){
			let scrollT = e.scrollTop;
			let oldScrollT = this.old.scrollTop;
			if(scrollT>10){
				if(scrollT<oldScrollT){
				this.running(0);
				}else{
				this.running(-50);
				}
				this.old.scrollTop = e.scrollTop
			}
		},
		onReachBottom: function() {
			this.getList();
		}
	}
</script>

<style lang="scss">
	$global-for-ie:false;
	.loading{
		@include h(32);
		@include flc(16px,32,#d14f4f);
		@include tac();
		@include mar(10px 0);
	}
	.container{
		@include wh(100vw,100vh);
	}
	.container{
		@include bgc(#F2F2F2);
	}
	.scroll{
		@include h(100vh);
	}
	.index-scrollBar{
		@include fixed((l:0,b:0,w:100vw,h:50,z:100));
		@include bgc(#fff);
		@include box-s(0px 0px 8px #d5d5d5);
		@include flex;
	}
</style>
