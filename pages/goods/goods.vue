<template>
	<view>
		<view class="container">
			<scroll-view class="nav_left" scroll-y>
				<view 
					v-for="{{ list }}"
					:key="index"
					class="nav_left_items {{ curNav == item._id ? 'active' : ''}}"
					bindtap="switchRightTab"
					data-id="{{ item._id }}"
				>
					{{ item.label }}
				</view>
			</scroll-view>
			<!-- 商品卡片 -->
			<scroll-view 
				scroll-y
				class="nav_right"
				scroll-into-view="{{ curNav }}"
			>
				<view v-for="{{ list }}" :key="index">
					<text id="{{ item._id }}">{{ item.label }}</text>
					<block v-for="{{ item.goods }}" :key="idx">
					
						<view class="card d-flex" >
							<view class="card_left">
								<van-image
									fit="cover" 
									src="{{ goods.banners[0] }}"
								/>
							</view>
							<view class="card_right">
								<view class="card_right_title ">
									{{ goods.title }}
								</view>
								<view v-if="{{ true }}" class="text-muted card_right_desc  van-multi-ellipsis--l3">
									{{ goods.description }}
								</view>
								<view class="card_right_foot d-flex justify-content-between align-items-center">
									<view 
										class="price_box" 
									>
										¥
										<view style="display: inline;font-size: 1.5rem;">
											{{ goods.price }}
										</view>
									</view>
									<!-- <view class="card_right_foot_button">
										选规格
									</view> -->
									<!-- <view class="card_right_foot_button">
										<van-icon name="shopping-cart-o" color="#fff" size="25rpx"/>
									</view> -->
									<view class="card_right_foot_buttonBox">
											<!-- minus 按钮 -->
											<view 
												hidden="{{ !goods.num }}"
												class="rounded-circle card_right_foot_buttonBox_icon">
												<van-icon 
													name="minus"  
													size="30rpx"
													color="#fff"
													custom-style="font-weight: 700;"
													data-item="{{ goods }}"
													bindtap="minus"
												/>
											</view>
											<!-- 数量 -->
											<view 
												hidden="{{ !goods.num }}"
												class="card_right_foot_num"
											>
												{{ goods.num }}
											</view>
											<!-- plus 按钮 -->
										<view class="rounded-circle card_right_foot_buttonBox_icon"
										data-item="{{ goods }}"
										capture-catch:tap="plus"
										>
											<van-icon 
												name="plus"  
												size="30rpx"
												color="#fff"
												custom-style="font-weight: 700;"
												data-item="{{ goods }}"
												capture-catch:tap="plus"
											/>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				
				<view class="last_item">
					没有更多了
				</view>
			</scroll-view>
			<!-- 购物车 -->
			<view 
				class="cart rounded-pill d-flex" 
				hidden="{{ cart.length < 1 ? true : false}}"
			>
				<view class="cart_icon" bindtap="showPopup">
					<van-icon 
						name="shopping-cart-o" 
						color="#1989fa" 
						size="40px"
						info="{{ totalCart }}"
					/>
				</view>
				<view class="cart_price_box">
					<view>
						¥
						<view style="display: inline;font-size: 1.5rem;">
							{{ totalPrice }}
						</view>
					</view>
				</view>
				<!-- <view class="cart_button_disabled">
					休息中
				</view> -->
				<view 
					class="cart_button"
					bindtap="confirm"
				>
					结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			
		}
	}
</script>

<style>

.container {
	width: 100%;
	height: 100%;
	max-height: 100%;
	background: #fff;
}

.nav_left {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 50px;
	width: 150rpx;
	background: #f5f5f5;
	overflow: scroll;
	height: 610px;
	-webkit-overflow-scrolling: touch;
}
.last_item {
	font-size: 0.7rem;
	text-align: center;
	color: rgba(170, 170, 170, 0.925);
	margin-bottom: 150px;
	padding-bottom: 150px;
}
.nav_left_items {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30px;
	padding: 6px 0;
	font-size: 14px;
}
.active {
	background: #fff;
	color: #3385ff;
	border-left: 3px solid #3385ff;
}

.nav_right {
	position: absolute;
	top: 0;
	left: 150rpx;
	right: 10rpx;
	width: 600rpx;
	max-width: 600rpx;
	height: 100vh;
	margin-bottom: 50px;
	background: #fff;
	padding: 20rpx;
	box-sizing: border-box;
	overflow: scroll;
	-webkit-overflow-scrolling: touch;
}

.card {
	max-width: 580rpx;
	border: 1px solid rgba(202, 202, 202, 0.808);
	margin-bottom: 20rpx;
}

.card_left image {
	width: 180rpx;
	height: 180rpx;
}

.card_right {
	width: 400rpx;
	max-width: 400rpx;
	padding: 0 5rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.card_right_title {
	width: 360rpx;
	height: 45rpx;
	padding-top: 5rpx;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.card_right_desc {
	flex-grow: 1;
	width: 360rpx;
	overflow: hidden;
	font-size: 75%;
	line-height: 1.2;
	box-sizing: border-box;
}
.card_right_foot {
	width: 360rpx;
	height: 60rpx;
}
.card_right_foot_button {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	text-align: center;
	line-height: 36rpx;
	background: #dc3545;
}
.card_right_foot_buttonBox {
	display: flex;
	width: 140rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	align-items: center;
	justify-content: flex-end;
	flex-shrink: 0;
}
.card_right_foot_num {
	font-size: small;
	flex-grow: 1;
	text-align: center;
	height: 46rpx;
	line-height: 46rpx;
}
.card_right_foot_buttonBox_icon {
	width: 46rpx;
	height: 46rpx;
	display: flex;
	text-align: center;
	background: rgb(241, 185, 62);
	align-items: center;
	justify-content: center;
}

.price_box {
	display: inline-block;
}

.cart {
	z-index: 300;
	position: fixed;
	bottom: 64px;
	left: 30rpx;
	right: 30rpx;
	height: 60px;
	box-shadow: 0 0 2px rgb(185, 180, 180);
	background: #fff;
}

.cart_icon {
	width: 60px;
	height: 60px;
	padding-left: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-left-radius: 50rem;
	border-bottom-left-radius: 50rem;
}
.cart_price_box {
	height: 60px;
	display: flex;
	align-items: center;
	flex-grow: 1;
}
.cart_button {
	width: 120px;
	height: 60px;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 50rem;
	border-bottom-right-radius: 50rem;
	background: rgb(233, 86, 86);
	color: rgb(235, 233, 233);
}

.cart_button_disabled {
	width: 120px;
	height: 60px;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 50rem;
	border-bottom-right-radius: 50rem;
	background: rgb(53, 51, 50);
	color: rgb(177, 175, 174);
}

/* 购物车商品卡片 */
.cart_card {
	width: 90%;
	margin: 10rpx 30rpx;
	margin-bottom: 20rpx;
}

.cart_card_left image {
	width: 140rpx;
	height: 140rpx;
}

.cart_card_right {
	width: 600rpx;
	max-width: 600rpx;
	padding: 0 5rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.cart_card_right_title {
	width: 500rpx;
	height: 45rpx;
	padding-top: 5rpx;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.cart_card_right_desc {
	flex-grow: 1;
	width: 500rpx;
	overflow: hidden;
	font-size: 75%;
	line-height: 1.2;
	box-sizing: border-box;
}
.cart_card_right_foot {
	width: 500rpx;
	height: 60rpx;
}
.cart_card_right_foot_button {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	text-align: center;
	line-height: 36rpx;
	background: #dc3545;
}
.cart_card_right_foot_buttonBox {
	display: flex;
	width: 120rpx;
	height: 36rpx;
	line-height: 36rpx;
	text-align: center;
	align-items: flex-end;
	justify-content: flex-end;
}
.cart_card_right_foot_num {
	font-size: small;
	flex-grow: 1;
	text-align: center;
}
.cart_card_right_foot_buttonBox_icon {
	background-color: rgb(241, 185, 62);
	width: 36rpx;
	height: 36rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
