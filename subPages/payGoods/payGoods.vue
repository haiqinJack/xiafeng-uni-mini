<template>
	<view class="">
		
		<template v-if="!address">
			<view class="cell-group">
				<view class="cell" @click="chooseAddress">
					<uni-icons type="location" size="26" color="#969799"></uni-icons>
					<view class="cell-title">
						选择收获地址
						<view class="cell-label">收货人</view>
					</view>
					<uni-icons type="right" size="26" color="#969799"></uni-icons>
				</view>			
			</view>		
		</template>
		<template v-else>
			<view class="cell-group">
				<view class="cell" @click="chooseAddress">
					<uni-icons type="location" size="26" color="#969799"></uni-icons>
					<view class="cell-title">
						{{ address.info }}
						<view class="cell-label">{{ address.userName }} {{ address.mobile }}</view>
					</view>
					<uni-icons type="right" size="26" color="#969799"></uni-icons>
				</view>			
			</view>
		</template>
		
		<view class="cell-group">
			
			<uni-list>
				<uni-list-chat 
					v-for="(goods, index) in cart"
					:key="index"
					:title="goods.name" 
					:note="goods.goods_desc"
					:avatar="goods.goods_thumb ? goods.goods_thumb.url : '/static/imageErr.png'"
				>
					<view class="chat-custom-right">
						<text>￥{{ parseFloat(goods.price / 100).toFixed(2) }}</text>
						<!-- 需要使用 uni-icons 请自行引入 -->
						<text  class="chat-custom-text">x{{ goods.num }}</text>
					</view>
				</uni-list-chat>
			</uni-list>
			
			<view class="quan">
				<view class="">					
					<uni-icons custom-prefix="iconfont" type="diy-quan" color="#ff0000" style="padding-right: 10rpx;"></uni-icons>
					<text>可用优惠券</text>					
				</view>
				<text style="color: #969799;text-align: right;">暂无优惠券可用</text>
			</view>
		</view>
	<!-- 	
		<view class="cell-group">
			<view class="">
				<uni-icons custom-prefix="iconfont" type="diy-ziqu" color="#ff0000" size="34" style="padding-right: 10rpx;"></uni-icons>
				
			</view>
		</view> -->
		
		<view class="cell-group" @click="to">
			<view class="cell">
				<view class="cell-title">
					备注
				</view>
				<view class="cell-value">
					{{ remarks }}
				</view>
				<uni-icons type="right" color="#969799"></uni-icons>
			</view>
		</view>
		
		<view class="bar"></view>
		
		<view class="submit-bar">
			<view class="submit-text">
				合计: <text style="font-size: 14px;">￥</text>
				<text style="font-size: 18px;">{{ parseFloat(totalPrice / 100).toFixed(2) }}</text>
			</view>
			<view class="submit-btn" @click="onSubmit">立即购买</view>
		</view>
		
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popup.type" :message="popup.message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
const db = uniCloud.database()
export default {
	onLoad() {
		this.cart = uni.getStorageSync('cart')
	},
	computed: {
		totalPrice() {
			return this.cart.reduce((total, current) => {
				return total + current.price * current.num;
			}, 0)
		},		
	},
	data() {
		let formData = {
			total_fee: 0,
			cart: []
		}
		return {
			formData,
			address: null,
			remarks: '',
			cart: [],
			popup: {
				type: 'error',
				message: ''
			}
		};
	},
	methods: {
		to() {
			uni.navigateTo({
				url: '/subPages/payGoods/remarks'
			})
		},
		async chooseAddress() {
			const { userName, telNumber, cityName, provinceName, countyName, detailInfo} = await uni.chooseAddress()
			this.address = {
				userName,
				mobile: telNumber,
				info: `${provinceName} ${cityName} ${countyName} ${detailInfo}`
			}
			
		},
		async onSubmit() {
			let validate = this.validate()
			if(validate) {
				uni.showLoading({
					mask: true
				});
				let totalFee = this.totalPrice
				console.log(totalFee, 'fee')
				
				try{
					const payment = await uniCloud.callFunction({
						name: 'uni-app-pay',
						data: {
							action : 'wxpayJSAPI',
							params: {
								totalFee
							}
						}
					})
					
					let { nonceStr,  timeStamp, signType, paySign, timestamp, outTradeNo} = payment.result
					const pay = await uni.requestPayment({
						provider: 'wxpay',
						package: payment.result.package,
						nonceStr, timeStamp, signType, paySign, timestamp,
						orderInfo: outTradeNo
					})
					
					if(pay.errMsg === 'requestPayment:ok') {
						let formData = this.formData
						let address = this.address
						let cart = this.cart
						db.collection('uni-id-base-order').add({
							cart,
							address,
							type: '商品订单',
							pay_type: 'wxpay',
							pay_pirce: totalFee,
							total_fee: totalFee,
							platform: 'mp-weixin',
							status: '已付款'
						}).then(({result}) => {
							console.log(result.code, 'add user')
							if(result.code){
								uni.showToast({
									title: '网络繁忙。',
									icon: "error"
								})
								return
							}
							
							uni.showToast({
								title: '购买成功',
								icon:'none',
								complete() {
									setTimeout(() => {
										uni.redirectTo({
											url: '/subPages/order/order'
										})
									}, 1000)
								}
							})
						})
					}
					
				}catch(e){
					console.error(e, 'err')
					if(e.errMsg !== 'requestPayment:fail cancel'){
						this.popup.message = '系统出现错误，请稍后再试！'
						this.$refs.popup.open()
					}
					//TODO handle the exception
				}finally{
					uni.hideLoading();
				}
				
			}
		},
		validate() {
			let flag = true
			let address = this.address
			if(!address) {
				uni.showToast({
					icon: 'none',
					title: '请选择收货人'
				});
				flag = false
				return 
			}
			let cart = this.cart
			if(cart.length < 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择商品'
				});
				flag = false
				return 
			}
			return flag
		}
	}
};
</script>

<style>
.cell-group {
	padding: 20rpx 20rpx;
}
.cell {
	border-radius: 6px;
	display: flex;
	align-items: center;
	background-color: #fff;
	width: 100%;
	padding: 20rpx 32rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	position: relative;
}
.cell-title {
	flex: 1;
	display: block;
}
.cell-label {
	color: #969799;
	font-size: 24rpx;
	line-height: 36rpx;
	margin-top: 6rpx;
}
.cell-value {
	flex: 1;
	color: #969799;
	overflow: hidden;
	text-align: right;
	vertical-align: middle;
}

.chat-custom-right {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}
.chat-custom-text {
	font-size: 12px;
	color: #999;
}

.quan {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80rpx;
	padding: 0 30rpx;
	border-top: 1px dashed #d4d4d4;
	border-bottom: 1px dashed #d4d4d4;
}
.bar {
	display: block;
	height: 120rpx;
}
.submit-bar {
	background-color: #fff;
	width: 750rpx;
	display: flex;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 0 30rpx;
	border-top: 1px solid #ccc;
	align-items: center;
	justify-content: flex-end!important;
	height: 100rpx;
}
.submit-text {
	margin-right: 40rpx;
}
.submit-btn {
	background: #ff0000;
	color: #fff;
	text-align: center;
	width: 224rpx;
	padding: 6px 6px;
	border-radius: 20px;
}
</style>
