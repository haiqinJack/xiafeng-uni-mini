<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view @click="login">LOGIN</view>
		<!-- #endif -->
	</view>
</template>
<script>
const db = uniCloud.database()
export default {
	data() {
		return {};
	},
	methods: {
		login(e) {
			// #ifdef MP-WEIXIN
			uni.getUserProfile({
				desc: '为了更好的服务',
				success(userinfo) {
					console.log(userinfo, 'userinfo');
				},
				fail(err) {
					console.error(err, 'err');
				}
			});
			//#endif
		},
		getUserInfo() {
			my.getAuthCode({
				scopes: 'auth_user',
				fail: error => {
					console.error('getAuthCode', error);
				},
				success: () => {
					// do login...
					// then
					my.getAuthUserInfo({
						fail: error => {
							console.error('getAuthUserInfo', error);
						},
						success: userInfo => {
							console.log(`userInfo:`, userInfo);
							this.setData({
								userInfo,
								hasUserInfo: true
							});
							abridge.alert({
								title: JSON.stringify(userInfo) // alert 框的标题
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style></style>
