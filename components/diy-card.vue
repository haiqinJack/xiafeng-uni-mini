<template>
	<view class="card bg-white" @click="$emit('choose')">
		<view class="card__header">
			<view class="card__thumb">
				<image :src="imageUrl" mode="scaleToFill" class="card__header__image"></image>
			</view>
			<view class="card__content">
				<view>
					<view class="card__title">{{ title }}</view>
					<view class="card__desc">{{ desc }}</view>
				</view>
			</view>
			<!-- <view class="card__right">
				<uni-icons type="location" size="60rpx"></uni-icons>
				<uni-icons type="phone" size="60rpx"></uni-icons>
				<view>{{ status }}</view>
			</view> -->
		</view>
		<view class="card__footer">
			<slot name="footer">
				
			</slot>	
		</view>				
	</view>
</template>

<script>
	export default {
		name:"diy-card",
		data() {
			return {
				
			};
		},
		props: {
			title: {
				type: String
			},
			imageUrl: {
				type: String,
				default: '/static/logo.jpeg'
			},
			desc: {
				type: String
			},
			status: {
				type: String
			}
		},
		emits: ['choose']
	}
</script>

<style lang="scss">
.card {
	box-sizing: border-box;
	padding: 16rpx 32rpx;
	position: relative;	
	
}
.card__header {
	display: flex;	
}
.card__content {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	min-height: 176rpx;
	min-width: 0;
	position: relative;
	
}
.card__thumb  {
	flex: none;
	height: 176rpx;
	width: 176rpx;
	margin-right: 16rpx;
	border-radius: 16rpx;
	position: relative;
	
}
.card__header__image {
	border-radius: 16rpx;
	width: 100%;
	height: 100%;
}
.card__title {
	font-weight: 700;
	line-height: 32rpx;
	word-wrap: break-word;
	font-size: 24rpx;
}
.card__desc {
	color: #646566;
	line-height: 20px;
	word-wrap: break-word;
	font-size: 24rpx;
}
.card__footer {
	flex: none;
	text-align: right;
	width: 100%;
	font-size: 24rpx;
	color: #323233;
}
</style>