<template>
	<view class="info">
		<view class="info-main">
			<uni-title type="h2" title="HTML工程师" color="#4CD964" ></uni-title>
			<uni-title type="h3" title="十年工作一年工作经验 专业切图仔" color="#4CD964" ></uni-title>
			<uni-title type="h3" title="联系方式" color="#4CD964" ></uni-title>
			<view class="info-relation">
				<view class="info-list"><text class="info-name">QQ:</text>278659513</view>
				<view class="info-list"><text class="info-name">Email:</text>278659513@qq.com</view>
				<view class="info-list"><text class="info-name">微信号:</text>tianqi_2786</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniTitle from "@/components/uni-ui/uni-title/uni-title.vue"
	export default {
		components:{
			uniTitle
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		@include wh(100vw,100vh);
		@include bgc(#eee);
		@include flex;
		@include jc(center);
		@include ai(center);
	}
	.info{
		@include wh(95vw,95vh);
		@include bgc(#fff);
		@include bdrs(5px);
	}
	
	.info-main{
		@include w(95%);
		@include mar(10px auto);
	}
	.info-relation{
		@include bd(1px solid #ccc);
		@include pad(10px);
		@include bdrs(5px);
	}
	.info-list{
		@include flc(12px,22px,#000);
	}
	.info-name{
		@include c(#4CD964);
		@include mar(0 10px 0 0);
	}
</style>
