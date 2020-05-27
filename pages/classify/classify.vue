<template>
	<view>
		<view>
			<m-label :labels="tags"  @handleClick="handleClick"></m-label>
			<m-label title="标签" :labels="classify" @handleClick="handleClick"></m-label>
		</view>
		<uni-tabbar :selected="2"></uni-tabbar>
	</view>
</template>

<script>
	import mLabel from '@/components/m-label/m-label.vue';
	import uniTabbar from '@/components/uni-tabbar/uni-tabbar.vue';
	export default {
		components:{
			mLabel,
			uniTabbar
		},
		data() {
			return {
				tags:[],
				classify:[]
			}
		},
		created(){
			let that = this;
			this.$requestCloud("tcbRouter",{$url: "getClassify"}).then(res=>{
				console.log(res.result.data);
				that.tags = res.result.data;
			});
			this.$requestCloud("tcbRouter",{$url: "getClassify",name:"classify"}).then(res=>{
				console.log(res.result.data);
				that.classify = res.result.data;
			});
		},
		methods: {
			handleClick(id){
				uni.navigateTo({
				    url: `../searchPage/searchPage?name=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>
