<template>
	<view class="cell bg-white">
		<slot name="left">
		</slot>	
		<text class="cell-title">{{ title }}</text>
		<uni-icons type="right" class="cell-right-icon"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"diy-cell",
		props: {
			title: {
				type: String
			},
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
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