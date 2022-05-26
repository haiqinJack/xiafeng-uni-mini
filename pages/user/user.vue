<!-- pages/user.vue -->
<template>
	<view>
		<view class="bg-light" style="min-height: 99vh;">
			<view class="d-flex align-items-center flex-column" style="margin-bottom: 30px; padding-top: 30px;">
				<template v-if="hasAuthLogin">
					<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
					<button class="login-button" @click="to">授权登录</button>
					<text>{{ hasAuthLogin }}</text>
				</template>
				<template v-else>
					<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
					<view class="nickName">{{ mobile }}</view>
				</template>
				<view>{{ userInfo._id}}</view>
			</view>
			<view class="bg-white">
				<view class="cell-group">
					<navigator url="/subPages/pets/list">
						<view class="cell">
							<uni-icons custom-prefix="iconfont" type="diy-chongwu" class="cell-left-icon"></uni-icons>
							<text class="cell-title">我的宠物</text>
							<uni-icons type="right" class="cell-right-icon"></uni-icons>
						</view>
					</navigator>
					<navigator url="/subPages/appointment/user">
						<view class="cell">
							<uni-icons custom-prefix="iconfont" type="diy-ontimeshipment" class="cell-left-icon"></uni-icons>
							<text class="cell-title">我的预约</text>
							<uni-icons type="right" class="cell-right-icon"></uni-icons>
						</view>						
					</navigator>
					<navigator url="/subPages/appointment/user">
						<view class="cell">
							<uni-icons custom-prefix="iconfont" type="diy-searchcart" class="cell-left-icon"></uni-icons>
							<text class="cell-title">我的订单</text>
							<uni-icons type="right" class="cell-right-icon"></uni-icons>
						</view>						
					</navigator>
				</view>
			</view>	
		</view>		
	</view>
</template>
<script>
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia'

export default {
	computed:{
		...mapState(useUserStore, ['userInfo', 'token', 'tokenExpired', 'hasAuthLogin', 'mobile']),
	},
	data() {
		return {
			
		}
	},
	methods: {
		to() {
			uni.navigateTo({
				url: '/subPages/login/login'
			})
		},
		getPhoneNumber(option){
			console.log(...option, 'getPhoneNumber')
		},
		getProvider(){
			return new Promise((resolve, reject) => {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						console.log(result, 'getProvider')
						resolve((result))
					},
					fail: (err) => {
						reject(err)
					}
				})				
			})
		}
	},
	setup(){
		const userStore = useUserStore()
		const onGetAuthorize = function(e) {
			console.log(e,'eee')
		}
		const onAuthError = function(e) {
			console.error(e, 'errr')
		}
		const getPhoneNumberByWeixin = function(e) {
			console.log(e, 'e---')
			console.log('bindMobileByMpWeixin>>>', e)
			uni.showLoading({
				title: 'loading'
			});
			uniCloud.callFunction({
				name: "uni-id-cf",
				data: {
					"action": "bindMobileByMpWeixin",
					"params": e.detail
				},
				
				success: ({
					result
				}) => {
					
					uni.showToast({
						title: result.msg || '绑定成功',
						icon: 'none'
					});
					if (result.code === 0) {
						this.mobile = result.mobile
					}
				},
				fail(err) {
					console.log(err, 'err----')	
				},
				complete: () => {
					uni.hideLoading()
				},
			})
		}
		const getUserProfile = function(e) {
			uni.getUserProfile({
				desc: '完善用户资料',
				success: (result) => {
					userStore.setUserInfo(result.userInfo)
				},
				fail: (err) => {
					console.error(err, 'err----')
				}
			})
		}
		
		return {
			onGetAuthorize,
			onAuthError,
			getPhoneNumberByWeixin,
			getUserProfile
		}
	}
}

</script>

<style>
.login-button {
	-webkit-tap-highlight-color: transparent;
	background-color: #f8f8f8;
	border-radius: 10rpx;
	box-sizing: border-box;
	color: #000;
	cursor: pointer;
	display: block;
	font-size: 36rpx;
	line-height: 2.55555556;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	padding-left: 28rpx;
	padding-right: 28rpx;
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
.nickName {
	font-size: 36rpx;
	line-height: 2.55555556;
}
.cell-group {
	border-top: 2rpx solid #f2f3f5;
}
.cell {
	border-bottom: 1px solid #f2f3f5;
	height: 128rpx;
	align-items: center;
	box-sizing: border-box;
	display: flex;
	font-size: 28rpx;
	line-height: 2;
	padding: 20rpx 32rpx;
	position: relative;
	width: 100%;
}
.cell:hover {
	background-color: #f2f3f5
}
.cell-left-icon {
	align-items: center;
	display: flex;
	height: 48rpx;
	justify-content: center;
}
.cell-title {
	flex: 1;
	display: block;
	padding-left: 10rpx;
}
.cell-right-icon {
	margin-left: 8rpx;
	align-items: center;
	display: flex;
	font-size: 32rpx;
	height: 48rpx;
	justify-content: center;
}
</style>
