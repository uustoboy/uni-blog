<template>
	<view>
		<view v-for="item in blogList" :key="item._id">
			<uni-card :title="item.title"  :extra="item.date"  :note="true">
				<view class="digest-text">{{item.digest}}<text class="reading">Reading...</text></view>
				<template v-slot:footer>
					<view class="footer-box">
						<view class="tags-info" v-for="(tags,tagsKey) in item.tags" :key="tagsKey">
							<view class="tags-label" :style="{background:tagColorArr[tagsKey]}">
								{{tags.title}}
							</view>
						</view>
					</view>
				</template>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import mIcon from '../icon/m-icon.vue'
	import uniCard from '../uni-ui/uni-card/uni-card.vue'
	import uniTag from "../uni-ui/uni-tag/uni-tag.vue"
	
	export default {
		components:{
			mIcon,
			uniCard,
			uniTag
		},
		props: {
			blogList:{
				type: Array,
				defult:[]
			}
		},
		data() {
			return {
				tagColorArr:['#4AC41C','#673ab7','#225d64']
			};
		}
	}
</script>

<style lang="scss">
	.uni-list{
		@include w(95%);
		@include mar(20px auto 0);
		@include bgc(#fff);
		@include bdrs(5px);
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
	.reading{
		@include c($green-color);
	}
</style>
