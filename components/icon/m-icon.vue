
<template>
	<view>
		<view class="iconfont" :class="['uni-'+type]" :style="{color:color,'font-size':fontSize,'background':background}" @click="onClick()"></view>
	</view>
</template>

<script>
	export default {
		name:"mIcon",
		props: {
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: String,
				/**
			 * 图标背景颜色
			 */
			background: String,
			/**
			 * 图标大小
			 */
			size: {
				type: [Number, String],
				default: 24
			}
		},
		computed: {
			fontSize() {
				var size = Number(this.size)
				size = isNaN(size) ? 24 : size
				return `${size}px`
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
@import "./m-icon.css";
</style>
