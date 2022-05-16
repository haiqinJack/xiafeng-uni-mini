// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({ 
		userInfo: {},
		token: uni.getStorageSync('uni_id_token'),
		tokenExpired: uni.getStorageSync('uni_id_token_expired'),
		
	}),
	actions: {
		async login() {
			const { code } = await this.getProviderOauth()
			console.log(code, 'code----')
			// #ifdef MP-WEIXIN
			uniCloud.callFunction({
				name: 'uni-id-mp',
				data: {
					action: 'loginByWeixin',
					params: {
						code
					},
				}
			}).then(({result}) => {
				console.log(result, 'logRes')
				if(result.code === 0) {//0表示成功
					this.userInfo = result.userInfo,
					uni.setStorageSync('uni_id_token', result.token)
					uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
				}
			}).catch(err => {
				console.error(err)
			})
			// #endif
			// #ifdef MP-ALIPAY
			uniCloud.callFunction({
				name: 'uni-id-mp',
				data: {
					action: 'loginByAlipay',
					params: {
						code
					},
				}
			}).then(({result}) => {
				console.log(result, 'logRes')
				if(result.code === 0) {//0表示成功
					this.userInfo = result.userInfo,
					uni.setStorageSync('uni_id_token', result.token)
					uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
				}
			}).catch(err => {
				console.error(err)
			})
			// #endif
		},
		logout(){
			uni.removeStorageSync('uni_id_token')
			uni.removeStorageSync('uni_id_token_expired')
		},
		getProviderOauth(){
			return new Promise((resolve, reject) => {
				// #ifdef MP-ALIPAY
				uni.login({
					provider: 'alipay',
					scopes: 'auth_base',
					success(res){
						resolve(res)
					}							
				})		
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success(res){
						resolve(res)
					}							
				})		
				// #endif
			})
		},
		setUserInfo(userInfo) {
			let oldUserInfo = this.userInfo
			let newUserInfo = Object.assign(oldUserInfo, userInfo)
			this.userInfo = newUserInfo
		}
	}
});