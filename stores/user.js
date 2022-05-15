import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		userinfo: {
			nickname : 'pinia'
		},
		token: uni.getStorageSync('uni_id_token'),
		tokenExpired: uni.getStorageSync('uni_id_token_expired')
	}),
	
	actions: {
		setUserInfo(userinfo) {
			this.userinfo = userinfo
		},
		SET_TOKEN(token, tokenExpired) {
			this.token = token;
			uni.setStorageSync('uni_id_token', token)
			uni.setStorageSync('uni_id_token_expired', tokenExpired)
		}
	},
});