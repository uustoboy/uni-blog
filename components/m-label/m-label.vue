<template>
	<view class="label-main">
		<view class="label-title">{{title}}</view>
		<view class="label-info">
			<view class="label-text">面试题 <text class="label-number">10篇</text></view>
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
			}
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
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
		@include bgc(red);
		@include bdrs(5px);
		@include pad(0 10px);
		
	}
</style>
