<template>
	<view class="label-main">
		<view class="label-title">{{title}}</view>
		<view class="label-info" >
			<view @click="handleClick(item._id)" class="label-text" v-for="(item,i) in labels" :key="i" :style="{background:colorArr[i%colorArr.length] }">{{item._id}} <text class="label-number">{{item.count}}篇</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'mLabel',
		props: {
			title:{
				type: String,
				default: '分类'
			},
			labels:{
				type: Array,
				defult:[]
			}
		},
		data() {
			return {
				colorArr:['#f9ebea','#f5eef8','#d5f5e3','#e8f8f5','#fef9e7','#f8f9f9','#82e0aa','#d7bde2','#a3e4d7','#85c1e9','#f8c471','#f9e79f'],
			}
		},
		computed:{
			styleObject:function (i){
				// let color = this.colorArr[this.colorArr%i];
				return {
					'background' : 'blue'
				};
			}
		},
		methods: {
			handleClick(id){
				 this.$emit('handleClick',id);
			}
		}
	}
</script>

<style lang="scss">
	.label-main{
		@include bgc(#fff);
		@include pad(10px 0);
		@include tac;
		@include mar(20px 0);
	}
	.label-title{
		@include flc(16px,24px,#000);
	}
	.label-info{
		@include flex;
		@include jc(center);
		@include fx-w(wrap);
		@include pad(10px);
	}
	.label-text{
		@include flc(12px,26px,#666);
		@include mar(0 10px 10px 0);
		@include bdrs(5px);
		@include pad(0 10px);
	}
	.label-number{
		@include mar(0 5px);
		@include c(#999);
	}
</style>
