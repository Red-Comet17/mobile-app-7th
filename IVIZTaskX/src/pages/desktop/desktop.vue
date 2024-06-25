<template>
	<view class="desktop">
		<u-row justify="space-evenly" align="center" style="height: 40%;" gutter="16">
			<u-col span="3" class="item" @click="toPanorama">
				<view class="box">
					<image src="../../static/360度全景.png" style="width: 100rpx;height: 50rpx;"></image>
				</view>
			</u-col>
			<u-col span="3" class="item" @click="toCarInfo">
				<view class="box">
					<image src="../../static/车辆信息.png" style="width: 60rpx;height: 60rpx;"></image>
					<text style="font-size: 22rpx;">车辆信息</text>
				</view>
			</u-col>
			<u-col span="3" class="item" @click="toLuancher">
				<view class="box">
					<image src="../../static/桌面.png" style="width: 60rpx;height: 60rpx;"></image>
					<text style="font-size: 22rpx;">Launcher</text>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script setup>
	import Command from '@/utils/command.js'

	function toPanorama() {
		uni.navigateTo({
			url: '/pages/panorama/panorama'
		})
	}

	function toLuancher() {
		uni.navigateTo({
			url: '/pages/launcher/launcher'
		})
	}

	function toCarInfo() {
		uni.sendSocketMessage({
			data: JSON.stringify({
				cmd: Command.to_carinfo
			})
		})
		uni.navigateTo({
			url: '/pages/carinfo/carinfo'
		})
	}
</script>

<style lang="scss" scoped>
	.desktop {
		width: 100%;
		height: 100%;

		.item {
			width: 200rpx;
			height: 120rpx;
			border-radius: 5rpx;
			background: linear-gradient(150deg, #a1c4fd, #c2e9fb);
			box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);

			.box {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>