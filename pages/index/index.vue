<template>
	<view class="container">
		<scroll-view class="scroll">
			<m-card @handleDigestClick="handleDigestClick" :blogList="blogList"></m-card>
			<view class="loading">{{loading}}</view>
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
				blogList:[],
				loading:'LOADING',
				lodingThrottle: true,
			}
		},
		created(){
			this.getList();
			this.$requestCloud("tcbRouter",{
				$url: "search",
				name: 'vue'
			}).then(res=>{
				console.log(res);
			})
		},
		methods: {
			handleDigestClick(id){
				console.log(id);
			},
			getList: function(){
				let that = this;
				if(this.lodingThrottle){
					this.lodingThrottle = false;
					this.page =  this.page+1;
					this.$requestCloud("tcbRouter",{
						$url: "blog",
						page: this.page
					}).then(res=>{
						console.log(res);
						if(res.result.data.length == 0){
							that.loading='No Data';
						}else{
							that.lodingThrottle = true;
							that.blogList = [...that.blogList,...res.result.data];
						}
					})
				}
				
			}
		},
		onReachBottom: function() {
			this.getList();
		}
	}
</script>

<style lang="scss">
	page{
		@include bgc(#F2F2F2);
		@include w(100%);
		@include over-x(hidden);
	}
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
</style>
