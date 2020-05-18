<template>
	<view class="container">
		<view class="page-body">
			<uni-title type="h3" title="标题" align="center" color="#000" ></uni-title>
			<input  type="text"  v-model="title"   
                    placeholder="请输入文章标题" @input="onKeyUserNameInput" class="title-input"  />
			<view class='wrapper'>
				<view class='toolbar' @tap="format">
					<view :class="formats.code ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="code"></view>
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
					 data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
					 data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
					 data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
					 data-value="justify"></view>
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
					 data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
					 data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
					 data-value="20px"></view>
					<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
					 data-name="marginBottom" data-value="20px"></view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
					 data-value="24px"></view>

					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
					 data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
					 data-name="backgroundColor" data-value="#00ff00"></view>

					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
					 data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
					 data-value="bullet"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>

					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
					 :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
					 data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
					 data-value="super"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
					 data-value="rtl"></view>
				</view>

				<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
				 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
				<view class="in-time">
					<view class="time-name">输入时间:</view>
					<KXDateTime :data='date' :end='enddate' :start='startdate' @rundata='kxdatetime'></KXDateTime>
				</view>
				<view class="label-main">
					<biner-input-tags @change="changeClassify" :selectlist='selectlistClassify' :disabled='disabledClassify' :placeholder='placeholderClassify'></biner-input-tags>
				</view>
				<view class="label-main">
					<biner-input-tags @change="change" :selectlist='selectlist' :disabled='disabled' :placeholder='placeholder'></biner-input-tags>
				</view>
				<uni-title type="h3" title="摘要" align="center" color="#000" ></uni-title>
				<textarea  placeholder="请输入摘要" class="abstract" :value="textareaValue" @blur="bindTextAreaBlur"/>
				<button @click="publishArticle">发布</button>
				<u-parse :content="article" @preview="preview" @navigate="navigate" />			 
			</view>
		</view>

	</view>
</template>

<script>
	import uniTitle from "@/components/uni-ui/uni-title/uni-title.vue"
	import binerInputTags from '@/components/biner-input-tags/biner-input-tags'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	 import KXDateTime from "@/components/kx-datetime/kx-datetime.vue"
	export default {
		components:{
			uniTitle,
			binerInputTags,
			uParse,
			KXDateTime
		},
		data() {
			return {
				date:'1991-01-01 00:00',
				value: "# vue-admin-beautiful",
				html: '<h1 id="vue-admin-beautiful">vue-admin-beautiful</h1>',
                readOnly: false,
				formats: {},
				strings:'<p>asdas<code>var a="11"</code></p>',
				 article: '<p wx:nodeid="62">dsfsfs</p><p wx:nodeid="111">sdfsdf</p><p wx:nodeid="114">&lt;code&gt;var a=1</p><p wx:nodeid="117">&lt;/code&gt;</p>',
				title:'',
				disabled:false,//不禁用
				// 默认的数组 不填默认的是空数组
				selectlist:[],
				// 默认提示
				placeholder:'请输入标签',
				disabledClassify:false,//不禁用
				   // 默认的数组 不填默认的是空数组
				selectlistClassify:[],
				   // 默认提示
				placeholderClassify:'请输入分类',
				textareaValue:''
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				this.textareaValue=e.detail.value;
			 },
			 kxdatetime(e){
			            this.date=e
			        },
			handleAddText() {
			      this.$refs.mde.add("\n### 新增加的内容");
			    },
			    handleAddImg() {
			      this.$refs.mde.add(
			        "\n![](https://chu1204505056.gitee.io/byui-bookmarks/img/ewm.png)"
			      );
			    },
			    handleShowHtml(html) {
			      this.html = html;
			    },
			// 监听变化的数据
			change(arr){
				console.log(arr)
				if(arr.length>0){
					this.selectlist=arr;
				}else{
					this.selectlist=[];
				}
				
			},
			// 监听变化的数据
			changeClassify(arr){
				console.log(arr)
				if(arr.length>0){
					this.selectlistClassify=arr;
				}else{
					this.selectlistClassify=[];
				}
				
			},
			onKeyUserNameInput(event){
				this.title = event.target.value;
			},
			publishArticle(){
				let that = this;
				// title:event.title,
				// date:event.data,
				// article:event.article,
				// digest:event.digest,
				// tags:event.tags,
				// classify:event.classify
				this.editorCtx.getContents({
					success:(res)=>{
						console.log(res.html);
						console.log(that.title);
						console.log(that.date);
						//小程序端调用方法
						wx.cloud.init();
						wx.cloud.callFunction({
						  // 需要调用的云函数名
						  name: 'addArticle',
						  // 传给云函数的参数
						  data: {
						    title:that.title,
						    date:that.date,
						    article:res.html,
						    digest:that.textareaValue,
						    tags:that.selectlist,
						    classify:that.selectlistClassify
						  },
						  success: function(res) {
						    console.log(res.result.sum) // 3
						  },
						  fail: function(err) {
						      console.log(err)
						  }
						})
						// // that.strings=res.html;
					},
					fail:(res)=>{
						console.log("fail：" + res);
					},
				});
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		},
		onLoad() {
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
	}
</script>

<style lang="scss">
	@import "./editor-icon.css";
	@import url("/components/gaoyia-parse/parse.css");
	.title-input{
		@include  mar(10px);
		@include bd(1px solid #ccc);
		@include flc(16px,40px,#000);
		@include h(40px);
		@include pad(0 10px);
		@include box-sz();
	}
	
	.wrapper {
		padding: 5px;
	}
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
		@include bd(1px solid #ccc);
		@include mar(0 0 10px 0);
	}
	.ql-active {
		color: #06c;
	}
	
	.in-time{
		@include flex;
		@include mar(10px 0);
	}
	.time-name{
		@include flc(14,20,#000);
		@include mar(0 10px 0 0);
	}
	.label-main{
		@include mar(10px 0);
	}
	.abstract{
		@include bd(1px solid #ccc);
		@include bdrs(10px);
		@include w(100%);
		@include pad(10px);
		@include box-sz();
		@include mar(10px 0);
	}
</style>