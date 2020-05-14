<template>
	<view>
		<view>
			<m-label></m-label>
			<m-label title="标签"></m-label>
		</view>
	</view>
</template>

<script>
	import mLabel from '@/components/m-label/m-label.vue'
	export default {
		components:{
			mLabel
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
page{
	@include bgc(#F2F2F2);
	@include w(100%);
	@include over-x(hidden);
}
</style>
