<template>
	<view class="launcher">
		<view style="width: 100%;height: 30%;display: flex;">
			<view class="time">
				<view class="one"
					style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
					{{time.hour}}:{{time.minute}}:{{time.second}}
				</view>
				<view class="two"
					style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;font-size: 20rpx;">
					{{time.year}}-{{time.month}}-{{time.day}}, 农历{{time.lunar}}
				</view>
			</view>
			<view class="weather" @click="show=true">
				<view class="one"
					style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
					<view style="width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;">
						<image src="../../static/luancher/城市.png"
							style="width: 40rpx;height: 40rpx;margin-right: 5rpx;"></image>
						<text>{{weather?.cityName ? weather?.cityName : '未知'}}</text>
					</view>
					<view style="width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;">
						<image src="../../static/luancher/温度.png"
							style="width: 40rpx;height: 40rpx;margin-right: 5rpx;"></image>
						<text>{{weather?.currentTemperature ? weather?.currentTemperature : '0'}}°C</text>
					</view>
				</view>
				<view class="two"
					style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
					<u-image :src="baseUrl+weather?.weatherIcon" width="60px" height="60px"
						style="margin-right: 5rpx;"></u-image>
					<text>{{weather?.weather ? weather?.weather : '天气'}}</text>
				</view>
			</view>
		</view>

		<view style="width: 100%;height: 30%;display: flex;">
			<view class="car">
				<view class="left"
					style="width: 40%;height: 100%;display: flex;align-items: center;justify-content: center;">
					<image src="../../static/desktop/car.png" style="width: 95%;height: 42%;"></image>
				</view>
				<view class="right" style="width: 60%;height: 100%;font-size: 18rpx;">
					<view style="width: 100%;height: 25%;padding-left: 3%;">行驶距离{{car?.kilometresTravelled}}km</view>
					<view style="width: 100%;height: 25%;padding-left: 3%;">出行次数{{car?.numberOfTrips}}次</view>
					<view style="width: 100%;height: 25%;padding-left: 3%;">车内温度{{car?.indoorTemperature}}°C</view>
					<view style="width: 100%;height: 25%;padding-left: 3%;">车外温度{{car?.outdoorTemperature}}°C</view>
				</view>
			</view>
			<view class="media">
				<view class="one"
					style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
					<view style="margin-top: 10rpx;"><up-image shape="circle"
							:src="baseUrl+musicList[musicIndex]?.previewImage" width="100px" height="100px"></up-image>
					</view>
				</view>
				<view class="two">
					<view style="width: 100%;height: 15%;text-align: center;font-size: 15rpx;">
						<text>{{musicList[musicIndex]?.songName ? musicList[musicIndex]?.songName : '未知'}}</text>
					</view>
					<view
						style="width: 90%;height: 25%;display: flex;justify-content: space-evenly;margin: 0 auto;align-items: center;">
						<image src="../../static/luancher/上一首.png" style="width: 25rpx;height: 25rpx;"
							@click="prevNext(-1)"></image>
						<image src="../../static/luancher/暂停.png" v-show="isPlaying" style="width: 25rpx;height: 25rpx;"
							@click="pause"></image>
						<image src="../../static/luancher/播放.png" v-show="!isPlaying"
							style="width: 25rpx;height: 25rpx;" @click="play"></image>
						<image src="../../static/luancher/下一首.png" style="width: 25rpx;height: 25rpx;"
							@click="prevNext(1)"></image>
					</view>
				</view>
			</view>
		</view>

		<view style="width: 100%;height: 20%;display: flex;">
			<view class="app">
				<view style="width: 60rpx;height: 60rpx;" v-for="(item,index) in appList"
					@click="addApp(item.app,index)" @longpress="show3=true">
					<image src="../../static/desktop/add.png" v-if="item.app===''" style="width: 60rpx;height: 60rpx;">
					</image>
					<image v-else :src="item.app" style="width: 60rpx;height: 60rpx;">
					</image>
				</view>
			</view>
		</view>

		<u-row justify="center" align="center" gutter="4" class="bottom">
			<u-col span="1" @click="close">
				<image src="../../static/close_icon.png" style="width: 20rpx;height: 20rpx;"></image>
			</u-col>
		</u-row>
		<up-popup mode="right" :show="show" @close="show=false" :overlayStyle="overlayStyle" :customStyle="popStyle">
			<view class="weather-popup">
				<view class="line">
					<view class="cxk">
						<image src="../../static/luancher/城市.png"
							style="width: 30rpx;height: 30rpx;margin-right: 5rpx;">
						</image>
						<text>{{weather?.cityName ? weather?.cityName : '未知'}}</text>
					</view>
					<view class="cxk">
						<image src="../../static/luancher/温度2.png"
							style="width: 30rpx;height: 30rpx;margin-right: 1rpx;"></image>
						<text>{{weather?.minTemperature}}°C~{{weather?.maxTemperature}}°C</text>
					</view>
					<view class="cxk">
						<u-image :src="baseUrl+weather?.weatherIcon" width="50px" height="50px"
							style="margin-right: 5rpx;"></u-image>
						<text>{{weather?.weather ? weather?.weather : '天气'}}</text>
					</view>
				</view>
				<view class="line">
					<view class="cxk">
						<image src="../../static/luancher/空气质量.png"
							style="width: 30rpx;height: 30rpx;margin-right: 5rpx;"></image>
						<text>{{weather?.airQuality ? weather?.airQuality : '未知'}}</text>
					</view>
					<view class="cxk">
						<image src="../../static/luancher/风速.png"
							style="width: 30rpx;height: 30rpx;margin-right: 1rpx;"></image>
						<text>{{weather?.windSpeed ? weather?.windSpeed : '0'}}km</text>
					</view>
					<view class="cxk">
						<image src="../../static/luancher/湿度.png"
							style="width: 30rpx;height: 30rpx;margin-right: 5rpx;"></image>
						<text>{{weather?.humidity ? weather?.humidity : '0'}}%</text>
					</view>
				</view>
				<hr style="border: 1px solid #dcdde1;width: 95%;">
				<view class="other">
					<scroll-view scroll-x="true" style="height: 100%;">
						<view class="list">
							<view class="item" v-for="item in weather?.weatherForecastList">
								<view
									style="width: 100%;height: 45%;display: flex;align-items: center;justify-content: center;">
									<image :src="baseUrl+item.weatherIcon" style="width: 30rpx;height: 30rpx;"></image>
								</view>
								<view
									style="width: 100%;height: 20%;display: flex;align-items: center;justify-content: center;">
									{{getDate(item?.date)}}
								</view>
								<view
									style="width: 100%;height: 20%;display: flex;align-items: center;justify-content: center;font-size: 15rpx;">
									{{item?.minTemperature}}°C~{{item?.maxTemperature}}°C
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</up-popup>

		<up-popup mode="center" :show="show2" @close="show2=false" :customStyle="popStyle2">
			<view class="app-popup">
				<view class="cxk">
					<view class="app-item" @click="selectApp('360')">
						<image src="../../static/desktop/360.png"></image>
					</view>
					<view class="app-item" @click="selectApp('application')">
						<image src="../../static/desktop/application.png"></image>
					</view>
				</view>
			</view>
		</up-popup>
		<up-action-sheet :actions="list" :show="show3" @close="show3=false" @select="handleAction"></up-action-sheet>
	</view>
</template>

<script setup>
	import {
		onBeforeMount,
		onMounted,
		ref
	} from 'vue'
	import calendarFormatter from 'lunar-calendar'
	import Command from '@/utils/command.js'
	import {
		getWeatherList,
		getCarSelected,
		getMusicList,
		login
	} from '@/api/common.js'
	import Constant from '@/utils/constant.js'
	let show = ref(false)
	let show2 = ref(false)
	let show3 = ref(false)
	let list = ref([{
		name: '替换其App',
		code: 1
	}, {
		name: '副屏启动',
		code: 2
	}])
	let baseUrl = Constant.baseUrl
	let overlayStyle = ref({
		background: 'rgba(0, 0, 0, 0)'
	})
	let popStyle = ref({
		width: '305rpx',
		background: '#00000000'
	})
	let popStyle2 = ref({
		width: '400rpx',
		background: '#00000000'
	})
	let time = ref({
		year: '2024',
		month: '6',
		day: '24',
		hour: '16',
		minute: '9',
		second: '55',
		week: '周一',
		lunar: ''
	})
	let appList = ref([{
		app: ''
	}, {
		app: ''
	}, {
		app: ''
	}, {
		app: ''
	}, {
		app: ''
	}])
	let weather = ref({})
	let car = ref({})
	let musicList = ref([])
	let musicIndex = ref(0)
	let isPlaying = ref(false)
	let music = ref({})
	let spIndex = ref(0)

	function handleAction(e) {
		if (e.code == 1) {
			show2.value = true
			show3.value = false
		} else {
			uni.sendSocketMessage({
				data: JSON.stringify({
					cmd: Command.to_panorama
				})
				
			})
		}
	}

	function selectApp(app) {
		if (app === '360') {
			appList.value[spIndex.value].app = '../../static/desktop/360.png'
		} else if (app === 'application') {
			appList.value[spIndex.value].app = '../../static/desktop/application.png'
		} else {
			console.log('未知')
		}
		show2.value = false
	}

	function play() {
		music.value.play()
		isPlaying.value = true
	}

	function pause() {
		music.value.pause()
		isPlaying.value = false
	}

	function prevNext(n) {
		music.value.stop()
		if (n < 0) {
			if (musicIndex.value == 0) {
				uni.showToast({
					title: '已经是第一首了',
					icon: 'error'
				})
				return
			}
			musicIndex.value--
		} else {
			if (musicIndex.value == musicList.value.length - 1) {
				uni.showToast({
					title: '已经是最后一首了',
					icon: 'error'
				})
				return
			}
			musicIndex.value++
		}
		music.value.src = baseUrl + musicList.value[musicIndex.value]?.mediaUrl
	}

	function addApp(app, index) {
		if (app === '') {
			show2.value = true
			spIndex.value = index
		} else {
			if (app.endsWith('360.png')) {
				uni.navigateTo({
					url: '/pages/panorama/panorama'
				})
			} else if (app.endsWith('application.png')) {
				uni.showToast({
					title: '暂无此页面',
					icon: 'error'
				})
				return
			}
		}
	}

	function close() {
		uni.navigateTo({
			url: '/pages/desktop/desktop'
		})
	}

	function getDate(str) {
		return str.slice(0, str.indexOf(' ') + 1)
	}

	function getTime() {
		let now = new Date()
		time.value.year = now.getFullYear()
		time.value.month = now.getMonth() + 1
		time.value.day = now.getDate()
		time.value.hour = now.getHours()
		time.value.minute = now.getMinutes()
		time.value.second = now.getSeconds()
		let arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		time.value.week = arr[now.getDay()]
		let lunar = calendarFormatter.solarToLunar(time.value.year, time.value.month, time.value.day)
		time.value.lunar = lunar.lunarMonthName + lunar.lunarDayName
		setTimeout(() => {
			getTime()
		}, 1000);
	}

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

	onMounted(() => {
		getTime()
		getWeatherList().then((res) => {
			weather.value = res.rows[0]
		})
		getCarSelected().then((res) => {
			car.value = res.data
		})

		getMusicList().then((res) => {
			musicList.value = res.rows
			music.value = uni.createInnerAudioContext()
			music.value.autoplay = false
			music.value.src = baseUrl + musicList.value[musicIndex.value]?.mediaUrl
		})
	})
</script>

<style lang="scss" scoped>
	.launcher {
		width: 100%;
		height: 100%;

		.time {
			margin-top: 1%;
			margin-left: 1%;
			width: 240rpx;
			height: 110rpx;
			background-image: url('../../static/time.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.weather {
			margin-top: 1%;
			margin-left: 2%;
			width: 240rpx;
			height: 110rpx;
			background-image: url('../../static/weather.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.car {
			margin-top: 1%;
			margin-left: 1%;
			width: 240rpx;
			height: 110rpx;
			background-image: url('../../static/time.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
		}

		.media {
			margin-left: 1%;
			width: 150rpx;
			height: 200rpx;
			background-image: url('../../static/desktop/music.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.app {
			margin-top: 7.5%;
			margin-left: 1%;
			width: 350rpx;
			height: 70rpx;
			background-image: url('../../static/app.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
		}

		.weather-popup {
			width: 300rpx;
			height: 180rpx;
			padding-left: 5rpx;
			padding-top: 5rpx;
			margin-top: 40%;
			background-image: url('../../static/desktop/popup.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.line {
				width: 100%;
				height: 24%;
				display: flex;
				align-items: center;
				justify-content: center;

				.cxk {
					width: 33%;
					height: 100%;
					display: flex;
					align-items: center;

					text {
						font-size: 16rpx;
					}
				}
			}

			.other {
				width: 100%;
				height: 50%;

				.list {
					width: 250%;
					height: 100%;
					display: flex;
					justify-content: space-evenly;

					.item {
						width: 90rpx;
						height: 90rpx;
						font-size: 16rpx;
					}
				}
			}
		}

		.app-popup {
			width: 400rpx;
			height: 200rpx;
			background-image: url('../../static/desktop/popup.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			padding: 20rpx;

			.cxk {
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: wrap;

				.app-item {
					width: 60rpx;
					height: 60rpx;
					margin: 5rpx 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
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