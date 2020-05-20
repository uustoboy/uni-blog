<template>
	<view>
		<uni-search-bar  @confirm="search"></uni-search-bar>
		<view class="hot-title">
			<m-icon type="ziyuan" color="red" size="20"></m-icon><view class="hot-name">热门标签</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue'
	import mIcon from '@/components/icon/m-icon.vue'
	export default {
		components:{
			uniSearchBar,
			mIcon
		},
		data() {
			return {
				
			}
		},
		methods: {
			search:function(value){
				console.log(value.value)
				uni.redirectTo({
				    url: '../searchPage/searchPage'
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

.hot-title{
	@include flex;
	@include pad(10px);
	@include flc(14px,18px,#000);
}
.hot-name{
	@include mar(0 0 0 5);
}
</style>
