<!-- pages/user.vue -->
<template>
	<view>
		<view class="bg-light" style="min-height: 99vh;">
			<view class="d-flex align-items-center flex-column" style="margin-bottom: 30px; padding-top: 30px;">
				
				<template v-if="!hasAuthLogin">
					<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
					<!-- #ifdef MP-WEIXIN -->
					<button class="login-button" @click="to">授权登录</button>
					<!-- #endif -->
				</template>
				<template v-else>
					<image class="login-image" mode="scaleToFill" src="~@/static/logo.jpeg" />
					<view class="nickName">{{ mobile }}</view>
				</template>
				
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
					<navigator url="/subPages/order/order">
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
import { mapState, mapActions } from 'pinia'
export default {
	onReady() {
		const { uid } = uniCloud.getCurrentUserInfo()
		if(!uid) {
			this.login()
		}
	},
	computed:{
		...mapState(useUserStore, ['hasAuthLogin', 'mobile',]),
	},
	methods: {
		...mapActions(useUserStore, ['login']),
		to() {
			uni.navigateTo({
				url: '/subPages/login/login'
			})
		},
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
