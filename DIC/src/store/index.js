import {
	createStore
} from "vuex";
// Vuex.Store 构造器选项
const store = createStore({
	// 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
	state: {
		$token: uni.getStorageSync("token") || "",
	},
	mutations: {
		setToken(state, payload) {
			state.$token = payload.token
		}
	},
	actions: {
		setToken(context, payload) {
			context.commit('setToken', payload)
			return uni.setStorage({
				key: "token",
				data: payload.token
			})
		}
	}
})

export default store