<template>
	<view class="panorama">
		<u-row justify="space-evenly" align="center" gutter="16" style="height: 80%;">
			<u-col align="center" justify="center" span="5.5">
				<u-image :src="baseUrl+leftUrl" width="430px" height="400px" radius="10px"
					style="position: relative;"></u-image>
				<image src="../../static/backCar.png" width="300px" height="200px" radius="10px"
					style="position: absolute;left: 8.5%;top: 11%;" v-show="back"></image>
			</u-col>
			<u-col align="center" justify="center" span="5.5">
				<u-image :src="baseUrl+rightUrl" width="430px" height="400px" radius="10px"></u-image>
			</u-col>
		</u-row>
		<u-row justify="center" align="center" gutter="4" class="bottom">
			<u-col span="1" @click="show=true">
				<image src="../../static/focus.png" style="width: 24rpx;height: 20rpx;"></image>
			</u-col>
			<u-col span="1" @click="close">
				<image src="../../static/close_icon.png" style="width: 20rpx;height: 20rpx;"></image>
			</u-col>
		</u-row>
		<up-action-sheet :actions="list" :show="show" @close="show=false" round="10"
			@select="changePic"></up-action-sheet>
	</view>
</template>

<script setup>
	import Constant from '@/utils/constant.js'
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		getFisheyeImage,
		getPanoramicImage
	} from '@/api/common.js'
	let baseUrl = Constant.baseUrl
	let leftUrl = ref('')
	let rightUrl = ref('')
	let fisheyeImage = ref({})
	let show = ref(false)
	let list = [{
		name: '前',
		code: 'front'
	}, {
		name: '后',
		code: 'back'
	}, {
		name: '左',
		code: 'left'
	}, {
		name: '右',
		code: 'right'
	}, {
		name: '360度',
		code: '360'
	}]
	let back = ref(false)

	function close() {
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}

	function changePic(e) {
		if (e.code == '360') {
			leftUrl.value = rightUrl.value
			setTimeout(() => {
				back.value = false
			}, 1500)
		} else if (e.code == 'back') {
			leftUrl.value = fisheyeImage.value.back
			setTimeout(() => {
				back.value = true
			}, 1500)
		} else {
			leftUrl.value = fisheyeImage.value[e.code]
			setTimeout(() => {
				back.value = false
			}, 1500)
		}
	}
	onMounted(() => {
		getFisheyeImage().then((res) => {
			const {
				data
			} = res
			fisheyeImage.value = data
			leftUrl.value = fisheyeImage.value.left
		})
		getPanoramicImage().then((res) => {
			rightUrl.value = res.msg
		})
	})
</script>

<style lang="scss" scoped>
	.panorama {
		width: 100%;
		height: 100%;

		.bottom {
			width: 100%;
			position: absolute;
			bottom: 0%;
			left: 3%;
		}
	}
</style>