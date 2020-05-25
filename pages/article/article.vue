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
				<view class="save-image" @click="handleImg">
					<uni-icons type="image" size="16" color="#fff"></uni-icons>
				</view>
				<view class="share-filled" @click="handleShare" open-type="share">
					<uni-icons type="paperplane-filled" size="16" color="#fff"></uni-icons>
				</view>
			</view>
		</view>
		<view class="layer" v-show="layer">
			<view class="layer-loadding" v-show="!layerLoading">
				<view>
					<image class="loading-img" src="../../static/img/synthesis.gif" mode="widthFix"></image>
					<view class="loading-text">生成中...</view>
				</view>
			</view>
			<view class="layer-mian" v-show="layerLoading">
				<view class="layer-generate">
					<view class="layer-canvas" :id="elId">
						<canvas style="width:100%; height: 100%;" canvas-id="firstCanvas"></canvas>
					</view>
				</view>
				<view class="layer-btnMain">
					<view class="layer-btnList"><text class="layer-btn" @click="hideLoayer">返回</text></view>
					<view class="layer-btnList"><text class="layer-btn" @click="saveImg">保存图片</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue"
	import mIcon from '@/components/icon/m-icon.vue'
	let canvasMain = null;
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
				layer:false,
				layerLoading: false,
				qr:'',
				tagColorArr:['#4AC41C','#673ab7','#225d64'],
				article:'',
				comment:'',
				title_id:'',
				canvasContext:null,
				elId:'elId'
			}
		},
		onLoad(option){
			// let id = option.id;
			let id = '70d29fac5ec4ce730008b75710368de1';
			let that = this;
			this.title_id = id;
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
			saveImg(){
				console.log(111)
				// uni.saveImageToPhotosAlbum({
				// 	filePath: this.qr,
				// 	success: function () {
				// 		console.log('save success');
				// 		this.layer = false;
				// 	}
				// });
				// uni.downloadFile({
				// 	url: this.qr,
				// 	success: (res) =>{
				// 		console.log(res)
				// 		// if (res.statusCode === 200){
				// 		// 	uni.saveImageToPhotosAlbum({
				// 		// 		filePath: res.tempFilePath,
				// 		// 		success: function() {
				// 		// 			uni.showToast({
				// 		// 				title: "保存成功",
				// 		// 				icon: "none"
				// 		// 			});
				// 		// 		},
				// 		// 		fail: function() {
				// 		// 			uni.showToast({
				// 		// 				title: "保存失败，请稍后重试",
				// 		// 				icon: "none"
				// 		// 			});
				// 		// 		}
				// 		// 	});
				// 		// }
				// 	}
				// })
			//重点：这边本来保存图片是写在draw之后，但第一次保存时空白，第二次才生效，写在draw回调里面就OK了。
				that.canvasContext.draw(false,function(){
					uni.canvasToTempFilePath({
						canvasId:'firstCanvas',
						success: function(res){
							// uni.hideLoading()
							// console.log(res.tempFilePath)
							// uni.saveImageToPhotosAlbum({
							// 	filePath:res.tempFilePath,
							// 	success : function(res){
							// 		uni.showToast({title : '图片已保存'})
							// 	}
							// })
						}
					})
				})
				
			},
			hideLoayer(){
				this.layer = false;
			},
			onKeycomment(event){
				this.comment = event.target.value  
			},
			async handleImg (){
				let that = this;
				this.layer = true;
				 const json = await this.$requestCloud("createQRCode",{
					$url: "createQr",
				 	scene: `?id=${that.title_id}`,
					path: 'pages/article/article'
				}).then(res=>{
					
					that.layerLoading = true;
					that.qr = res.result.data;
					
					canvasMain = uni.createCanvasContext('#firstCanvas');
					canvasMain.setFillStyle('red'); 
					// uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {  
					// 	console.log(ret)
					// 	if(ret[0]){  
					// 		// this.height = ret[0].height + 'px'  
					// 		console.log(ret[0].height)  
							
					// 	}  
					// });  
					console.log(that.qr)
					uni.getImageInfo({
						src: that.qr,
						success: function (image) {
							console.log(image);
							canvasMain.drawImage(image.path, 0, 0, 150, 100);
							    canvasMain.draw();
						}
					});
					
					
				});
			},
			handleShare(){
				uni.share({
				    provider: 'weixin',
				    scene: "WXSceneSession",
				    type: 5,
				    imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
				    title: '欢迎体验uniapp',
				    miniProgram: {
				        id: 'gh_abcdefg',
				        path: 'pages/index/index',
				        type: 0,
				        webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				        console.log(JSON.stringify(ret));
				    },
                    fail: function(err) {
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
	
	//
	.layer{
		@include fixed((l:0,t:0,w:100vw,h:100vh,z:100));
		@include bgc(rgba(0,0,0,0.5));
	}
	.layer-loadding{
		@include abs((t:0,l:0,w:100vw,h:100vh));
		@include bgc(#181818);
		@include flex;
		@include jc(center);
		@include ai(center);
	}
	.loading-img{
		@include mar(0 auto);
	}
	.loading-text{
		@include flc(14px,20px,#fff);
		@include tac;
	}
	.layer-mian{
		@include fixed((t:0,l:0,z:10));
		@include wh(100%,100%);
		@include flex;
		@include fx-f(column);
	}
	.layer-generate{
		@include fx(1);
		@include bgc(#fff);
		@include over-y(auto);
	}
	.layer-canvas{
		@include wh(90%,100%);
		@include mar(0 auto);
		@include bgc(#ccc);
	}
	.layer-btnMain{
		@include tac;
		@include mar(20 0 0 0);
	}
	.layer-btnList{
		@include mar(16px 0);
	}
	.layer-btn{
		@include inblock;
		@include h(38);
		@include bgc(#3c5f81);
		@include pad(0 22px);
		@include bdrs(40);
		@include flc(16,38,#fff);
		@include bd(2 solid #fff);
	}
	
</style>
