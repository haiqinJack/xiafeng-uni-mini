<!-- pages/user.vue -->
<template>
	<view>
		<view class="bg-light" style="min-height: 99vh;">
			<view class="d-flex align-items-center flex-column" style="margin-bottom: 30px; padding-top: 30px;">
				<template v-if="!userInfo.nickName">
					<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
					<!-- #ifdef MP-WEIXIN -->
					<button class="login-button" @click="getUserProfile">登录</button>
					<!-- #endif -->
				</template>
				<template v-else>
					<image class="login-image" mode="scaleToFill" :src="userInfo.avatarUrl" />
					<view class="nickName">{{userInfo.nickName}}</view>
				</template>
				<view>{{ userInfo._id}}</view>
			</view>
			<view class="bg-white">
				<view class="cell-group">
					<view class="cell">
						<uni-icons custom-prefix="iconfont" type="diy-chongwu" class="cell-left-icon"></uni-icons>
						<text class="cell-title">我的宠物</text>
						<uni-icons type="right" class="cell-right-icon"></uni-icons>
					</view>
					<view class="cell">
						<uni-icons custom-prefix="iconfont" type="diy-ontimeshipment" class="cell-left-icon"></uni-icons>
						<text class="cell-title">我的预约</text>
						<uni-icons type="right" class="cell-right-icon"></uni-icons>
					</view>
					<view class="cell">
						<uni-icons custom-prefix="iconfont" type="diy-searchcart" class="cell-left-icon"></uni-icons>
						<text class="cell-title">我的订单</text>
						<uni-icons type="right" class="cell-right-icon"></uni-icons>
					</view>
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
		...mapState(useUserStore, ['userInfo', 'token', 'tokenExpired'])
	},
	data() {
		return {
			
		}
	},
	setup(){
		const userStore = useUserStore()
		const getPhoneNumber = function(e) {
			console.log('hha', e)
			// #ifdef MP-ALIPAY
			my.getPhoneNumber({
			    success: (res) => {
			        let encryptedData = JSON.parse(res.response);
					console.log(encryptedData)
					console.log(typeof encryptedData)
					uniCloud.callFunction({
						name: 'alipay-AES',
						data: {
							content : encryptedData.response,
							sign : encryptedData.sign
						}
					})
			    },
			    fail: (res) => {
			        console.log(res);
			        console.log('getPhoneNumber_fail', res);
			    },
			});
			// #endif
		}
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
			getPhoneNumber,
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
.nickName {
	font-size: 18px;
	line-height: 2.55555556;
}
.cell-group {
	border-top: 1px solid #f2f3f5;
}
.cell {
	border-bottom: 1px solid #f2f3f5;
	height: 4rem;
	align-items: center;
	box-sizing: border-box;
	display: flex;
	font-size: 14px;
	line-height: 24px;
	padding: 10px 16px;
	position: relative;
	width: 100%;
}
.cell:hover {
	background-color: #f2f3f5
}
.cell-left-icon {
	margin-right: 4px;
	align-items: center;
	display: flex;
	font-size: 16px;
	height: 24px;
	justify-content: center;
}
.cell-title {
	flex: 1;
	display: block;
}
.cell-right-icon {
	margin-left: 4px;
	align-items: center;
	display: flex;
	font-size: 16px;
	height: 24px;
	justify-content: center;
}
</style>
