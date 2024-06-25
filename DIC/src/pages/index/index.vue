<template>
	<view class="index">
		<image src="../../static/index/image2.jpg" style="height:100%;width: 37%;"></image>
		<view style="width:26%;height: 100%;display: flex;align-items: center;justify-content: center;">
			<view style="display: flex;align-items: center;">
				<image src="../../static/index/档位.png" style="width: 100rpx;height: 100rpx;margin-right: 50rpx;">
				</image>
				<text style="font-size: 170rpx;color: white;">{{num}}</text>
			</view>
		</view>
		<image src="../../static/index/image.jpg" style="height:100%;width: 37%;"></image>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	let num = ref(0)
</script>

<style lang="scss">
	.index {
		width: 100%;
		height: 100%;
		background-color: black;
		display: flex;
		justify-content: space-between;
	}
</style>