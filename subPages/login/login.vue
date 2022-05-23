<template>
	<view class="container">
		<view class="main">
			<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
			<text>夏天的风宠物生活馆</text>
			<text style="font-size: 18px;font-weight: 500;margin-top: 100rpx;">成为会员，立享更多优惠福利</text>
			<text style="font-size: 12px;margin-top: 60rpx;color: #464646;">授权绑定手机号码 为您提供更好的服务</text>
			<!-- #ifdef MP-WEIXIN -->			
			<button v-if="!userInfo.mobile" @getphonenumber="getphonenumber" open-type="getPhoneNumber" type="warn" style="width: 100%; display: block;margin-top: 20rpx;" >一键登录</button>
			<button v-else @click="login" type="warn" style="width: 100%; display: block;margin-top: 20rpx;" >一键登录</button>
			<!-- #endif -->
			<text style="margin-top: 40rpx;color: #a9a9a9;" @click="cancel">取消</text>
		</view>
	</view>
</template>

<script>
	import { useUserStore } from '@/stores/user.js'
	import { mapState } from 'pinia';
	export default {
		computed: {
			...mapState(useUserStore, ['userInfo', 'sessionKey', 'hasAuthLogin'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				this.hasAuthLogin = true
				uni.navigateBack()
			},
			// #ifdef MP-WEIXIN
			getphonenumber(e){
				let sessionKey = this.sessionKey
				uniCloud.callFunction({
					name: 'uni-id-mp',
					data: {
						action: 'bindMobileByMpWeixin',
						params: {
							...e.detail,
							sessionKey
						},						
					}
				}).then((res) => {
					console.log(res,'res-----')
				})
			},
			// #endif			
			cancel(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
.container {
	height: 700rpx;
	left: 60rpx;
	right: 60rpx;
	top: 120rpx;
	position: fixed;
	margin: auto;
}
.main {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
}
.login-image {
	width: 160rpx; 
	height: 160rpx;
	border-radius: 50%;
	margin-bottom: 20rpx;
}
</style>
