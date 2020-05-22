<template>
	<view>
		<view class="article-top">
			<view class="article-title">{{article.title}}</view>
			<view class="article-basics">
				<view class="article-date">
					<m-icon type="rili" color="#727272" size="14" class="article-ico"></m-icon>{{article.date|formatTime}}
				</view>
				<view class="article-dot"></view>
				<view class="article-classify">
					<m-icon type="wenjianjia" color="#ff4081" size="14" class="article-ico" style="marginTop:30px;"></m-icon>{{article.classify[0].title}}
				</view>
				<view class="article-dot"></view>
				<view class="article-look">
					<m-icon type="yanjing" color="#727272" size="16" class="article-ico"></m-icon>{{article.look}}
				</view>
				<view class="article-dot"></view>
				<view class="article-chatNumber">
					<m-icon type="liaotian" color="#727272" size="14" class="article-ico"></m-icon>{{article.chatNumber}}
				</view>
			</view>
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
			<view class="comment-main">
				<view class="comment-strip">1 条评论</view>
				<view class="chat-main">
					<view class="chat-list">
						<view class="chat-left"></view>
						<view class="chat-right">
							<view class="chat-info">
								<view class="chat-name">xxxx</view>
								<view class="chat-time">2020-20-20 11:21:21</view>
							</view>
							<view class="chat-text">xxxxxxxxxxxxxxxxxxxx</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-bar">
			<input type="text" 
				   v-model="comment"   
			       placeholder="评论" @input="onKeycomment" class="input " />  
			<view class="share-main">
				<view class="save-image">
					<uni-icons type="image" size="16" color="#fff"></uni-icons>
				</view>
				<view class="share-filled" @click="handleShare">
					<uni-icons type="paperplane-filled" size="16" color="#fff"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	import mIcon from '@/components/icon/m-icon.vue'
	export default {
		filters:{
			formatTime(value){
				if (!value) return '';
				let time = value.split(' ');
				return time[0];
			}
		},
		components:{
			uParse,
			uniIcons,
			mIcon
		},
		data() {
			return {
				tagColorArr:['#4AC41C','#673ab7','#225d64'],
				article:'',
				comment:''
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
			onKeycomment(event){
				 this.comment = event.target.value  
			},
			handleShare(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: this.article.titile,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	$global-for-ie:false;
	page{
		@include bgc('#fafafa');
	}
	.content{
		@include pad(0 10px 80px);
	}
	
	.article-top{
		@include rel();
		@include pad(0 20px);
		@include h(75px);
		@include bgc($green-color);
		@include mar(0 0 52px 0);
	}
	.article-title{
		@include flc(16,50,#fff);
		@include tofl;
	}
	.article-basics{
		@include wh(100%,56px);
		@include bgc(#fff);
		@include bdrs(5px);
		@include flex;
		@include ai(center);
		@include pad(0 15px);
		@include box-sz;
		@include box-s(0px 0px 8px #999);
	}
	.article-date,.article-classify,.article-look,.article-chatNumber{
		@include flex;
		@include flc(12,14,#727272);
		@include vic;
	}
	.article-classify{
		@include c(#ff4081);
	}
	.article-ico{
		@include mar(0 5px 0 0);
		@include vic;
	}
	.article-dot{
		@include wh(3px);
		@include bgc(#999);
		@include mar(0 6px);
	}
	
	
	.content-info{
		@include pad(10px 0);
	}
	.content-tags{
		@include pad(10px 0);
		@include bdt(1px solid #dddddd);
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
	
	//留言板
	.comment-main{
		@include pad(0 10px);
	}
	.comment-strip{
		@include h(40);
		@include flc(16,40,#2d3748);
		@include bdb(1px solid #ddd);
	}
	.chat-main{
		@include pad(15px 0 0 0);
	}
	.chat-list{
		@include flex;
	}
	.chat-left{
		@include wh(48px);
		@include mar(0 10px 0 0);
	}
	.chat-right{
		@include fx;
	}
	.chat-info{
		@include flex;
	}
	.chat-name{
		@include flc(14px,24px,#2d3748);
		@include mar(0 16px 0 0);
	}
	.chat-time{
		@include flc(12px,24px,#787878);
		@include mb(2px);
	}
	.chat-text{
		@include flc(12,24,#586986);
	}
	
	//底部
	.fixed-bar{
		@include fixed((l:0,b:0,w:100vw,h:60px));
		@include flex;
		@include ai(center);
		@include bgc(#fff);
		@include pad(0 14px);
		@include box-sz;
		@include box-s(0px 0px 8px #999);
	}
	.input{
		@include fx;
		@include h(38px);
		@include bgc(#232323);
		@include pad(0 0 0 10px);
		@include flc(14px,38px,#fff);
		@include box-sz;
		@include box-s(0px 0px 8px #999);
	}
	.share-main{
		@include flex;
		@include mar(0 0 0 20px);
	}
	.save-image,.share-filled{
		@include flex;
		@include jc(center);
		@include ai(center);
		@include wh(38px);
		@include bdrs(50%);
	}
	.save-image{
		@include bgc(#ffde01);
		@include mar(0 12px 0 0);
	}
	.share-filled{
		@include bgc(#50768f);
	}
</style>
