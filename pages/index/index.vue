<template>
	<view class="container">
		<scroll-view class="scroll">
			<view v-for="item in blogInfo" :key="item._id">
				<uni-card :title="item.title"  :extra="item.date"  :note="true">
					{{item.digest}}
					<template v-slot:footer>
						<view class="footer-box">
							<view class="tags-info" v-for="(tags,tagsKey) in item.tags" :key="tagsKey">
								 <uni-tag :text="tags.title" type="primary" size="small"></uni-tag>
							</view>
						</view>
					</template>
				</uni-card>
			</view>
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
				Tips:['vue','css'],
				blogInfo:[]
			}
		},
		created(){
			let that = this;
			 wx.cloud.callFunction({
			      // 要调用的云函数名称
			      name: "tcbRouter",
			      // 传递给云函数的参数
			      data: {
			        $url: "blog", // 要调用的路由的路径，传入准确路径或者通配符*ss
			      }
			    }).then(res=>{
			      console.log(res)
				 
				  if(res.errMsg='cloud.callFunction:ok'){
					that.blogInfo = [...res.result.data]	
				  }
				  // that.res
			    })
			 console.log(that.blogInfo);
		},
		methods: {
			
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
