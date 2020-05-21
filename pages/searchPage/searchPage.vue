<template>
	<view>
		<scroll-view class="scroll">
			<m-card @handleDigestClick="handleDigestClick" :blogList="blogList"></m-card>
		</scroll-view>
	</view>
</template>

<script>
	import mCard from '@/components/m-card/m-card.vue'
	export default {
		components:{
			mCard
		},
		data() {
			return {
				blogList:[]
			}
		},
		onLoad(option){
			let name = option.name;
			let that = this;
			uni.setNavigationBarTitle({
			　　title:name
			});
			this.$requestCloud("tcbRouter",{
			 	$url: "search",
			 	name: name
			}).then(res=>{
				that.blogList= [...res.result.data];
			});
		},
		methods: {
			handleDigestClick(){},
		}
	}
</script>

<style lang="scss">
	
</style>
