<template>
	<view>
		<button @click="login">LOGIN</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(res.provider)
						uni.login({
							provider: res.provider[0],
							scopes:'auth_user',
							success({code}) {
								uni.getUserInfo({
									provider: res.provider[0],
									success(user){
										console.log(user,'user')
									},
								})
							}
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
