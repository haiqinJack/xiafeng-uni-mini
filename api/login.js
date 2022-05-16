export default {
	login(){		
		return this.getCode()
		.then((code) => {
			return uniCloud.callFunction({
				name: 'uni-id-mp',
				data: {
					action: 'loginByAlipay',
					params: {
						code,
					}
				}
			})
		})
		// .then((res) => {
		// 	uni.showModal({
		// 		showCancel: false,
		// 		content: JSON.stringify(res.result)
		// 	})
		// 	if (res.result.code === 0) {
		// 		uni.setStorageSync('uni_id_token', res.result.token)
		// 		uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
		// 	}
		// })
		// .catch((e) => {
		// 	console.error(e)
		// 	uni.showModal({
		// 		showCancel: false,
		// 		content: '支付宝登录失败，请稍后再试'
		// 	})
		// })
	},	
	getCode() {
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: 'oauth',
				success({provider}) {
					uni.login({
						provider,
						onlyAuthorize: true,
						success(res) {
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('登录失败'))
						}
					})
				}
			})
		})
	},
}