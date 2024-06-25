<template>
	<view class="carinfo">
		<view class="card">
			<uni-swiper-dot :info="info" :current="current" field="content" style="width: 100%;height: 100%;">
				<swiper class="swiper-box" @change="change" autoplay circular style="height: 100%;">
					<swiper-item v-for="(item,index) of info">
						<view class="swiper-item">
							<h4 style="font-size: 25rpx;text-align: center;">车辆保养信息</h4>
							<view class="cxk">
								<image src="../../static/carinfo/公里数.png"></image>当前行驶公里数:
								{{item?.kilometresTravelled?item?.kilometresTravelled:0}}KM
							</view>
							<view class="cxk">
								<image src="../../static/carinfo/公里数(1).png"></image>距离下次保养剩余公里数:
								{{item?.remainingKilometers?item?.remainingKilometers:0}}KM
							</view>
							<view class="cxk">
								<image src="../../static/carinfo/battery.png"></image>剩余电量:
								{{item?.dumpEnergy?item?.dumpEnergy:0}}%
							</view>
							<view class="cxk">
								<image src="../../static/carinfo/电池状态.png"></image>
								健康状态: {{item?.batteryHealth>75?'健康':'不健康'}}
							</view>
							<view style="width: 100%;display: flex;justify-content: center;">
								<u-image :src="baseUrl+item?.rechargeImage"></u-image>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<u-row justify="center" align="center" gutter="4" class="bottom">
			<u-col span="1" @click="close">
				<image src="../../static/close_icon.png" style="width: 20rpx;height: 20rpx;"></image>
			</u-col>
		</u-row>
	</view>
</template>

<script setup>
	import {
		login,
		getCarList
	} from '@/api/common.js'
	import Constant from '@/utils/constant.js'
	import Command from '@/utils/command.js'
	import {
		ref,
		onMounted,
		onBeforeMount
	} from 'vue'
	let info = ref([{}])
	let current = ref(0)
	let baseUrl = Constant.baseUrl

	function change(e) {
		current.value = e.detail.current
		// console.log('变化' + current.value)
	}

	function close() {
		uni.sendSocketMessage({
			data: JSON.stringify({
				cmd: Command.to_index
			})
		})
		uni.navigateTo({
			url: '/pages/desktop/desktop'
		})
	}
	
	onMounted(() => {
		getCarList().then((res) => {
			if (res.rows) {
				info.value = res.rows
			}
		})
	})

	onBeforeMount(() => {
		if (uni.getStorageSync('token')) {
			return
		}
		login({
			username: 'admin',
			password: '123456'
		}).then((res) => {
			if (res.token) {
				console.log('token获取成功')
				uni.setStorageSync('token', res.token)
			}
		})
	})
</script>

<style lang="scss" scoped>
	.carinfo {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.card {
			width: 50%;
			height: 80%;
			border-radius: 10rpx;
			background: linear-gradient(150deg, #a1c4fd, #c2e9fb);
			box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);

			.cxk {
				height: 35rpx;
				font-size: 18rpx;
				display: flex;
				align-items: center;
				padding-left: 10rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
		}

		.bottom {
			width: 100%;
			position: absolute;
			bottom: 0%;
			left: 2.5%;
		}
	}
</style>