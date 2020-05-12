<template>
	<view>
		<uni-search-bar  @confirm="search"></uni-search-bar>
		<view>
			<m-icon tyle="ziyuan"></m-icon>热门标签
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue'
	import mIcon from "@/components/icon/m-icon.vue"
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


</style>
