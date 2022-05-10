<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">LOGIN</button>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<button 
			open-type="getAuthorize" 
			scope="userInfo"
			onGetAuthorize="onGetAuthorize"
			@onGetAuthorize="getuserinfo"
			onError="onAuthError"
		>
			ALI-LOGIN
		</button>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getuserinfo(e){
				console.log(e, 'e')
			},
			onGetAuthorize(e) {
				console.log(e, 'onGetAuthorize')
				// #ifdef MP-ALIPAY
				
					my.getOpenUserInfo({
						fail: (res) => {
							console.log(res, 'fail res')
						},
						success: (res) => {
							console.log(res, 'success res')
							let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
						}
					});
				// #endif
			},
			onAuthError(err) {
				console.log(err, 'err')
			},
			onClick(e) {
				console.log(e, 'onclick')
			}
		}
	}
</script>

<style>

</style>
