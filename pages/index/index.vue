<template>
	<view class="container">
		<scroll-view class="scroll">
			<m-card :blogList="blogList"></m-card>
		</scroll-view>
	</view>
</template>

<script>
	import mCard from '@/components/m-card/m-card.vue';
	export default {
		components:{
			mCard
		},
		data() {
			return {
				page:-1,
				blogList:[]
			}
		},
		created(){
			this.getList();
		},
		methods: {
			getList: function(){
				let that = this;
				this.page =  this.page+1;
				this.$requestCloud("tcbRouter",{
					$url: "blog",
					page: this.page
				}).then(res=>{
					that.blogList = [...res.result.data];
				})
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
.container{
	@include wh(100vw,100vh);
}
.container{
	@include bgc(#F2F2F2);
}
</style>
