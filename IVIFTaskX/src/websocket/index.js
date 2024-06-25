import Command from '@/utils/command.js'
import Constant from "../utils/constant";
uni.connectSocket({
	url: Constant.wsUrl
});
uni.onSocketOpen(function(res) {
	console.log('已连接websocket');
});

uni.onSocketMessage(function(res) {
	let obj = JSON.parse(res.data)
	console.log('收到服务器内容：' + res.data);
	switch (obj.cmd) {
		case Command.to_panorama:
			uni.navigateTo({
				url: '/pages/panorama/panorama'
			})
			break
		default:
			break;
	}
});