<template>
	<view class="container">
		<scroll-view class="scroll">
			<uni-card title="标题文字"  extra="额外信息" :note="Tips">
			    内容主体，可自定义内容及样式
				<template v-slot:footer>
				        <view class="footer-box">
				           <uni-tag text="标签" type="primary" size="small"></uni-tag>
				        </view>
				    </template>
			</uni-card>
		</scroll-view>
	</view>
</template>

<script>
	import mIcon from '../../components/icon/m-icon.vue'
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	export default {
		components:{
			mIcon,
			uniCard,
			uniTag
		},
		data() {
			return {
				Tips:['vue','css']
			}
		},
		created(){
			
			 wx.cloud.callFunction({
			      // 要调用的云函数名称
			      name: "tcbRouter",
			      // 传递给云函数的参数
			      data: {
			        $url: "user", // 要调用的路由的路径，传入准确路径或者通配符*
			        
			      }
			    }).then(res=>{
			      console.log(res)
			    })
			  
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container,.scroll{
	@include wh(100vw,100vh);
}
.container{
	@include bgc(#F2F2F2);
}

.uni-list{
	@include w(95%);
	@include mar(20px auto 0);
	@include bgc(#fff);
	@include bdrs(5px);
}

.footer-box{
	@include flex;
}
</style>
