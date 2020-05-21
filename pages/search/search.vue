<template>
	<view>
		<uni-search-bar placeholder="请输入关键字搜索" class="search-bar" @clear="cancelSearch"  @confirm="search" @cancel="cancelSearch"></uni-search-bar>
		<view class="hot-title">
			<view class="hot-name"><m-icon type="ziyuan" color="red" size="20" class="hot-ico"></m-icon>热门标签:</view>
			<text @click="handleTagsClick(item)" class="hot-tag" v-for="(item,index) in hostList" :key="index" :style="{background:colorBgArr[index]}">{{item}}</text>
		</view>
		<view v-show="!showLilst">
			<View class="no-data">没有找到文章</View>
		</view>
		<view v-show="showLilst">
			<m-card @handleDigestClick="handleDigestClick" @handleTagsClick="handleTagsClick" :blogList="blogList"></m-card>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue'
	import mIcon from '@/components/icon/m-icon.vue'
	import mCard from '@/components/m-card/m-card.vue'
	export default {
		components:{
			uniSearchBar,
			mIcon,
			mCard
		},
		data() {
			return {
				colorBgArr:["#f5eef8","#d5f5e3","#e8f8f5","#fef9e7","#f8f9f9"],
				blogList:[],
				hostList:[]
			}
		},
		onShow(){
			let that = this;
			this.$requestCloud("tcbRouter",{
			 	$url: "hotTags"
			}).then(res=>{
				that.hostList= [...res.result.data];
			});
		},
		computed:{
			showLilst(){
				let show = false;
				if(this.blogList.length>0){
					show = true
				}
				return show;
			}
		},
		methods: {
			// searchInput(value){
			// 	console.log(value.value == undefined);
			// 	// if(value.value == null){
			// 	// 	this.blogList = [];;
			// 	// }
			// },
			search(value){
				let name = value.value;
				let that = this;
				this.$requestCloud("tcbRouter",{
				 	$url: "search",
				 	name: name
				}).then(res=>{
					that.blogList= [...res.result.data];
				});
			},
			cancelSearch(){
				this.blogList = [];
			},
			handleDigestClick(){},
			handleTagsClick(tag){
				uni.navigateTo({
				    url: `../searchPage/searchPage?name=${tag}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.hot-title{
		@include pad(10px);
		@include flc(14px,30px,#000);
		@include w(100%);
		@include over;
		@include box-sz();
	}
	.hot-name{
		@include fl;
		@include flex;
		@include h(30);
		@include mar(0 5 0 5);
	}
	.hot-ico{
		@include mar(0 6px 0 0);
		@include vic;
	}
	.no-data{
		@include tac;
		@include pad(218px 0 0 0);
		@include bgiz('../../static/img/no-data.png',$position:center 0,$size:205px 218px);
		@include mar(15% 0 0 0);
		@include flc(16,30,#999);
	}
	.hot-tag{
		@include fl;
		@include flc(12,30,#4a5568);
		@include pad(0 12px);
		@include bdrs(5px);
		@include bgc(red);
		@include mar(0 5px 5px 5px);
	}
</style>
