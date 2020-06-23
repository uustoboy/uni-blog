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
					<!-- <view class="layer-canvas" :id="elId"> -->
						<canvas :style="{width:styleWidth,height:styleHeight}" canvas-id="firstCanvas" class="firstCanvas"></canvas>
					<!-- </view> -->
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
	import { mapState } from 'vuex'
	export default {
		components:{
			uParse,
			uniIcons,
			mIcon
		},
		filters:{
			formatTime(value){
				if (!value) return '';
				let time = value.split(' ');
				return time[0];
			}
		},
		computed:mapState(['hasLogin','userInfo']),
		data() {
			return {
				layer:false,
				layerLoading: false,
				qr:'',
				tagColorArr:['#4AC41C','#673ab7','#225d64'],
				article:'',
				comment:'',
				title_id:'',
				context:null,
				elId:'elId',
				styleWidth:'0px',
				styleHeight:'0px',
				imgPath: null
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
			console.log(this.userInfo)
		},
		methods: {
			saveImg(){
				console.log(111)
				uni.saveImageToPhotosAlbum({
					filePath: this.imgPath,
					success: function () {
						console.log('save success');
					}
				});
				
			},
			hideLoayer(){
				this.layer = false;
			},
			onKeycomment(event){
				this.comment = event.target.value  
			},
			 //这是一个封装好的方法 
			promisify: api => {
				return (options, ...params) => {
					return new Promise((resolve, reject) => {
						const extras = {
							success: resolve,
							fail: reject
						}
						api({ ...options, ...extras }, ...params)
					})
				}
			},
			async handleImg (){
				let that = this;
				this.layer = true;
				const json = await this.$requestCloud("createQRCode",{
					$url: "createQr",
				 	scene: `?id=${that.title_id}`,
					path: 'pages/article/article'
				});
				
				this.layerLoading = true;
				this.qr = json.result.data;
				
				const wxGetImageInfo = this.promisify(uni.getImageInfo);
				const wxDownLoadFile = this.promisify(uni.downloadFile)
				
				Promise.all([
						// 图片目前只随机找了几张图片，后期可自行替换
						wxGetImageInfo({
								src: 'cloud://uustoboy-yryxc.7575-uustoboy-yryxc-1301998997/_20200526171819.png'   // 背景图片
						}),
						wxGetImageInfo({
								src: this.userInfo.avatarUrl   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>
						}),
						wxGetImageInfo({
								src: that.qr   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>
						})
				]).then(res => {
					
					const { windowWidth, windowHeight,pixelRatio } = uni.getSystemInfoSync();
					let endWidth = (windowWidth - 40);
					let endHeight = (windowHeight - 42); 
					that.styleWidth = endWidth+'px';
					that.styleHeight = endHeight+'px';
					let context = uni.createCanvasContext('firstCanvas')
					context.setFillStyle('red'); //canvas背景颜色
					context.fillRect(0, 0, endWidth, endHeight);
					// context.textAlign = 'center';	// 设置位置
					context.setTextAlign('center');
					context.setFillStyle('#eee8aa')//文字颜色：默认黑色
					context.font = 'normal bold 12px sans-serif';
					context.fillText('给您分享了一篇文章~',endWidth/2, 100);
					context.fillText(that.userInfo.nickName,endWidth/2, 80);
					context.beginPath()
					context.setFillStyle('#fff'); //canvas背景颜色
					context.fillRect(20, 130, endWidth-40, endHeight-150);
					context.save()
					
					let endImgHeight
					// await uni.getImageInfo({
					// 	src: 'cloud://uustoboy-yryxc.7575-uustoboy-yryxc-1301998997/_20200526171819.png',
					// 	success: function (image) {
					// 		console.log(image)
							let ratio = (endWidth-40)/res[0].width;
							endImgHeight = res[0].height*ratio;
							context.drawImage(res[0].path, 20, 130,endWidth-40, endImgHeight);
							context.beginPath();
							context.setTextAlign('left');
							context.setFillStyle('#000')//文字颜色：默认黑色
							context.font = 'normal bold 16px sans-serif';
							context.fillText(that.article.title,30, 130+endImgHeight+30);
							context.font = 'normal 16px sans-serif';
							
							var initHeight = 130+endImgHeight+60; //绘制字体距离canvas顶部初始的高度
							var lastSunStrIndex = 0; //每次开始截取的字符串的索引
							var contentWidth = 0;
							var canvasWidth = endWidth-40;
							if (context.measureText(that.article.digest).width <= canvasWidth) {
								context.fillText(that.article.digest, 30, initHeight);
							}else{
								for (let i = 0; i < that.article.digest.length; i++) {
									contentWidth += context.measureText(that.article.digest[i]).width;
									if (contentWidth > canvasWidth - 32) {
										context.fillText(that.article.digest.substring(lastSunStrIndex, i), 30, initHeight) //绘制未截取的部分
										initHeight += 25;
										contentWidth = 0;
										lastSunStrIndex = i;
									}
									if (i == that.article.digest.length - 1) {
										context.fillText(that.article.digest.substring(lastSunStrIndex, i + 1), 30, initHeight);
									}
						
								}
							}
							
							
							// context.fillText(that.article.digest,30, );
							
							
						// }
					 // });
					
					//绘制头像;
					// await wx.downloadFile({
					//     url: this.userInfo.avatarUrl,
					//     success: function (res) {
							context.save()
							//绘制头像
							context.beginPath(); //开始绘制
							//先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
							context.arc((endWidth/2), 35, 25, 0, Math.PI * 2, false);
							context.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。
							// 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
							context.drawImage(res[1].path,(endWidth/2)-25, 10,50,50);
							context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图问下文即状态 还可以继续绘制
							// context.draw(true);
					 //    }
					 // })
							 
					 //圆点
					 context.beginPath();
					 context.arc(20,(endHeight*0.7),10,0,2*Math.PI);
					 context.fillStyle="red";
					 context.fill();
					 context.beginPath();
					 context.arc((endWidth-40)+20,(endHeight*0.7),10,0,2*Math.PI);
					 context.fillStyle="red";
					 context.fill();
					 //横线
					 context.beginPath();
					 context.moveTo (40,(endHeight*0.7));       //设置起点状态
					 context.lineTo (endWidth-40,(endHeight*0.7));       //设置末端状态
					 context.lineWidth = 1;          //设置线宽状态
					 context.strokeStyle = "#ccc" ;  //设置线的颜色状态
					 context.stroke();               //进行绘制
					// await uni.getImageInfo({
						// src: that.qr,
						// success: function (image) {
							context.drawImage(res[2].path,(endWidth/2)-((endWidth/2)*0.5/2), endHeight*0.75,(endWidth/2)*0.5,(endWidth/2)*0.5);
							// context.draw(true);
						// }
					// });		
						 
					context.textAlign = 'center';	// 设置位置
					context.setFillStyle('#eee8aa')//文字颜色：默认黑色
					context.setFontSize(12);
					// let ws = context.measureText("长按小程序码阅读~").width;
					context.fillText('长按小程序码阅读',endWidth/2,endHeight*0.75+(endWidth/2)*0.5+15);
					context.draw(true,()=>{
						console.log('123123')
						 setTimeout(()=>{
							uni.canvasToTempFilePath({
								canvasId: 'firstCanvas',
								fileType: 'jpg',
								x: 0,
								y: 0,
								width: endWidth,
								height: endHeight,
								destWidth: endWidth*pixelRatio,
								destHeight: endHeight*pixelRatio,
								success: function(res) {
									console.log('baocu')
									
									that.imgPath = res.tempFilePath;
									console.log(that.imgPath)
									return
								},
								fail: function(error) {
									console.log(error)
								}
							}) 
						 }, 300);
						
					});
					
					
				})
				
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
		@include h(95%);
		@include ai(center);
		@include jc(center);
		@include over-y(auto);
	}
	.layer-canvas{
		@include h(100%);
		@include pad(0 20px);
		@include bgc(#ccc);
	}
	.layer-btnMain{
		@include flex;
		@include tac;
		@include ai(center);
		@include jc(center);
		// @include mar(20 0 0 0);
	}
	.layer-btnList{
		// @include mar(16px 0);
	}
	.layer-btn{
		@include inblock;
		@include h(38);
		@include bgc(#3c5f81);
		@include pad(0 22px);
		@include flc(16,38,#fff);
		@include bd(2 solid #fff);
	}
	.firstCanvas{
		@include mar(0 auto);
	}
</style>
