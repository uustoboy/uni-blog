<template>
	<view>
		<view>
			{{article.title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:''
			}
		},
		onLoad(option){
			let id = option.id;
			let that = this;
			
			this.$requestCloud("tcbRouter",{
			 	$url: "getArticle",
			 	id: id
			}).then(res=>{
				that.article= res.result.data;
				let title = res.result.data.title;
				uni.setNavigationBarTitle({
				　　title:title
				});
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
