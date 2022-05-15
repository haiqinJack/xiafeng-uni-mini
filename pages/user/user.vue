<template>
	<view>
		<view>{{ userinfo }}</view>
		<view>{{ token }}</view>
		<view>{{ tokenExpired }}</view>
		<button @click="login">LOGIN</button>
		<button @click="updateuserinfo"></button>
	</view>
</template>
<script>
import { useUserStore } from '@/stores/user';
import { mapState, mapActions} from 'pinia'
import loginApi from '@/api/login.js'

export default {
	computed:{
		...mapState(useUserStore, ['userinfo', 'token', 'tokenExpired'])
	},
	setup(){
		const userStore = useUserStore()
		const updateuserinfo = function(e) {
			console.log(e)
			userStore.setUserInfo({nickname: 'userStore'})
		}
		return {
			updateuserinfo
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		...mapActions(useUserStore, ['SET_TOKEN']),
		async login(e){
			const { result } = await loginApi.login()
			console.log(result, 'userinfo--login')
			uni.showModal({
				showCancel: false,
				content: JSON.stringify(result)
			})
			if (res.result.code === 0) {
				this.SET_TOKEN()
				uni.setStorageSync('uni_id_token', res.result.token)
				uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
			}
		}
	}
}
</script>

<style>

</style>
