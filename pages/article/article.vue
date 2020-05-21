<template>
	<view>
		<view>
			{{article.title}}
		</view>
		<view class="content">
			<view  class="content-info">
				<u-parse :content="article.article" @preview="preview" @navigate="navigate" />	
			</view>
			<view   class="content-tags">
				<view class="footer-box">
					<view class="tags-info" v-for="(tags,tagsKey) in article.tags" :key="tagsKey">
						<view @click="handleTagsClick(tags.title)" class="tags-label" :style="{background:tagColorArr[tagsKey]}">
							{{tags.title}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-bar">
			<view class="save-image">
				<uni-icons type="image" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	export default {
		components:{
			uParse,
			uniIcons
		},
		data() {
			return {
				tagColorArr:['#4AC41C','#673ab7','#225d64'],
				article:''
			}
		},
		onLoad(option){
			// let id = option.id;
			let id = '70d29fac5ec4ce730008b75710368de1';
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

<style lang="scss">
	$global-for-ie:false;
	.content{
		@include pad(10px);
	}
	.content-info{
		@include pad(10px 0);
	}
	.content-tags{
		@include pad(10px 0);
		@include bdt(1px solid #333);
	}
	.footer-box,.tags-info{
		@include flex;
	}
	.digest-text{
		@include flc(14,20,#4a5568);
	}
	.tags-label{
		@include mar(0 10px 0 0);
		@include pad(0 10px);
		@include flc(12,30,#fff);
	}
	
	.fixed-bar{
		@include fixed((l:0,b:0,w:100vw,h:50px));
	}
	.save-image{
		@include flex;
		@include jc(center);
		@include ac(center);
		@include wh(50);
		@include bdrs(50%);
		@include bgc(yellow);
	}
</style>
