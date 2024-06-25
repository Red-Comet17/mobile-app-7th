// 获取鱼眼图像
export const getFisheyeImage = () => {
	return uni.$u.http.get('/api/camera/getFisheyeImage')
}
// 获取全景
export const getPanoramicImage = () => {
	return uni.$u.http.get('/api/camera/getPanoramicImage')
}
// 获取去畸图片
export const getOriginal = () => {
	return uni.$u.http.get('/api/camera/getOriginal')
}

// 查询媒体列表
export const getVideo = () => {
	return uni.$u.http.get('/control/media/list?status=1')
}

// 查询音乐列表
export const getMusicList = () => {
	return uni.$u.http.get('/control/media/list?status=2')
}
// 获取验证码
export const getCode = (phone) => {
	return uni.$u.http.get('/api/user/code', {
		params: {
			phone
		}
	})
}

// 手机号登录/手机号免密登录
export const phoneLogin = (data) => {
	return uni.$u.http.post('/api/phone/login', data)
}

// 注册
export const userRegister = (data) => {
	return uni.$u.http.post('/api/user/register', data)
}

// 通过旧密码/验证码修改密码
export const updatePassword = (data) => {
	return uni.$u.http.put('/api/user/password', data)
}

// 查询指定城市的天气
export const getWeatherList = (cityId = '', cityName = '') => {
	return uni.$u.http.get('/control/weather/list', {
		params: {
			cityId,
			cityName
		}
	})
}

// 登录
export const login = (data) => {
	return uni.$u.http.post('/login', data)
}

// 查询用户车辆列表
export const getCarList = () => {
	return uni.$u.http.get('/api/recharge/vehicle/list')
}

// 查询默认选中车辆
export const getCarSelected = () => {
	return uni.$u.http.get('/api/recharge/vehicle/selected')
}
