<template>
	<view>
		<view>
			<m-label :labels="tags"  @handleClick="handleClick"></m-label>
			<m-label title="标签" :labels="classify" @handleClick="handleClick"></m-label>
		</view>
	</view>
</template>

<script>
	import mLabel from '@/components/m-label/m-label.vue'
	export default {
		components:{
			mLabel
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
				console.log(id);
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
