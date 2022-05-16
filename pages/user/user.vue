<!-- pages/user.vue -->
<template>
	<view>
		<view class="bg-light" style="min-height: 99vh;">
			<view class="d-flex align-items-center flex-column" style="margin-bottom: 30px; padding-top: 30px;">
				<template>
					<image class="login-image" mode="center" src="~@/static/logo.jpeg" />
					<button class="login-button">登录</button>
				</template>
			</view>
		</view>
		<view @click="login">LOGIN</view>
		<view>{{ userStroe.userInfo._id }}</view>
		<view>{{ userStroe.userInfo.nickName }}</view>
		<image :src="userStroe.userInfo.avatarUrl" />
	</view>
</template>
<script>
import { useUserStore } from '@/stores/user';

import { mapState, mapActions} from 'pinia'
import loginApi from '@/api/login.js'

export default {
	computed:{
		...mapState(useUserStore, ['userInfo', 'token', 'tokenExpired'])
	},
	setup(){
		const userStore = useUserStore()
		
		return {
			userStore
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		async login(e){
			const { result } = await loginApi.login()
			console.log(result, 'userinfo--login')
			uni.showModal({
				showCancel: false,
				content: JSON.stringify(result)
			})
			if (res.result.code === 0) {
				uni.setStorageSync('uni_id_token', res.result.token)
				uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
			}
		}
	}
}

</script>

<style>
.login-button {
	-webkit-tap-highlight-color: transparent;
	background-color: #f8f8f8;
	border-radius: 5px;
	box-sizing: border-box;
	color: #000;
	cursor: pointer;
	display: block;
	font-size: 18px;
	line-height: 2.55555556;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	padding-left: 14px;
	padding-right: 14px;
	position: relative;
	text-align: center;
	text-decoration: none;
}
.login-image {
	width: 160rpx; 
	height: 160rpx;
	border-radius: 50%;
	margin-bottom: 20rpx;
}
</style>
