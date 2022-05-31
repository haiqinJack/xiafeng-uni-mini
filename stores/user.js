// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({ 
		userInfo: {},
		sessionKey: '',
		hasAuthLogin: false,
		mobile: '',
		token: uni.getStorageSync('uni_id_token') || '',
		tokenExpired: uni.getStorageSync('uni_id_token_expired') || 0,
		
	}),
	actions: {
		async login() {
			this.logout()
			const { code } = await this.getProviderOauth()
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
				if(result.code === 0) {//0表示成功
					console.log('登录成功')
					this.userInfo = result.userInfo,
					this.sessionKey = result.sessionKey
					if(result.userInfo.mobile) {
						console.log("加密手机号")
						this.mobile = result.userInfo.mobile.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2")
					}
					uni.setStorageSync('uni_id_token', result.token)
					uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
				}
			}).catch(err => {		
				console.error(err, 'login 失败')
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
					console.log('登录支付宝成功')
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
					},
					fail(err) {
						reject(err)
					}						
				})		
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success(res){
						resolve(res)
					},
					fail(err) {
						reject(err)
					}
				})		
				// #endif
			})
		},
		setUserInfo(userInfo) {
			let oldUserInfo = this.userInfo
			let newUserInfo = Object.assign(oldUserInfo, userInfo)
			this.userInfo = newUserInfo
			if(userInfo.mobile) {
				this.mobile = userInfo.mobile.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2")
			}
		},
		setMobile(mobile) {
			this.userInfo.mobile = mobile
			this.mobile = mobile.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2")
		},
		setHasAuthLogin(has) {
			this.login()
			this.hasAuthLogin = has
		}
	}
});