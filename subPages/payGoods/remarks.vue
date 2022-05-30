<template>
	<view class="">
		<view class="container bg-light">
			<textarea maxlength="20" auto-focus @input="inputChange" v-model="remarks"/>
			<text>{{ length }}/20</text>
		</view>

		<view class="container-button"><button type="warn" class="rounded-lg" @click="confirm">完成</button></view>
	</view>
</template>

<script>
export default {
	onLoad() {
		let pages = getCurrentPages();
		let page = pages[pages.length - 2];
		this.remarks = page.remarks
	},
	computed: {
		length() {
			return this.remarks.length
		}
	},
	data() {
		return {
			disabled: false,
			remarks: ''
		};
	},
	methods: {
		inputChange(e) {
			this.remarks = e.detail.value;
		},
		confirm() {
			let pages = getCurrentPages();
			let page = pages[pages.length - 2];
			let remarks = this.remarks;

			page.remarks = remarks
			
			uni.navigateBack();
		}
	}
};
</script>

<style>
.container {
	width: 700rpx;
	height: 200rpx;

	margin: auto;
}
textarea {
	width: 700rpx;
	height: 150rpx;
}
text {
	float: right;
	margin-right: 20rpx;
}
.container-button {
	width: 700rpx;
	height: 80rpx;
	margin: 30rpx auto;
	line-height: 80rpx;
	text-align: center;
}
</style>
