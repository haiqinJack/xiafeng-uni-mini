<template>
	<view>
		<!-- 分类 -->
		<scroll-view class="nav_left" scroll-y>
			<view 
				v-for="(item, index) in list"
				:key="index"
				class="nav_left_items"
				:class="curNav == item._id._value ? 'active' : ''"
				@click="switchRightTab(item._id)"
				v-show="item._id['opendb-mall-goods'].length > 0"
			>
				{{ item.name }}
			</view>
		</scroll-view>
		<!-- 分类end -->
		<!-- 右则商品区 -->
		<scroll-view 
			scroll-y
			class="nav_right"
			:scroll-into-view="curNav"
		>
			<view v-for="(item, index) in list " :key="index" v-show="item._id['opendb-mall-goods'].length > 0">
				<text :id="item._id" style="font-size: 14px;">{{ item.name }}</text>
				<template v-for="(goods, idx) in item._id['opendb-mall-goods']">
					<view class="card d-flex">
						 <view class="card_left">
							<image
								mode="aspectFill"
								:src="goods.goods_thumb ? goods.goods_thumb.url : '/static/imageErr'"
							/>
						</view>
						
						<view class="card_right">
							<view class="card_right_title ">
								{{ goods.name }}
							</view>
							<view class="text-muted card_right_desc  multi-ellipsis--l3">
								{{ goods.goods_desc }}
							</view>
							
							<view class="card_right_foot d-flex justify-content-between align-items-center">
								 <view 
									class="price_box" 
								>
									¥
									<text style="display: inline;font-size: 1.5rem;">
										{{ goods.price }}
									</text>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</scroll-view>
		<!--  右则商品区 end -->
		<!-- 购物车 -->
		<view 
			class="cart rounded-pill d-flex"
			v-show="cart.length > 0 ? true : false"
		>
			<view class="cart_icon" bindtap="showPopup">
				<uni-icons type="cart" color="#1989fa" size="40px"></uni-icons>
				<!-- <van-icon 
					name="shopping-cart-o" 
					
					
					info="{{ totalCart }}"
				/> -->
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
				@click="confirm"
			>
				结算
			</view>
		</view>
		<!-- 购物车end -->
		
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popup.type" :message="popup.message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		onLoad() {
			this._init()
		},
		computed: {
			totalPrice() {
				return 1
			}
		},
		data() {
			return {
				list: [],
				cart:[1],
				curNav: '',
				popup: {
					message: '',
					type: 'error'
				}
				
				
			}
		},
		methods: {
			_init(){
				this.apiGetCategories()
			},
			async apiGetCategories() {
				try{
					// const cate =  db.collection('opendb-mall-categories').getTemp()
					// const { result } = await db.collection(cate,sku).get()
					
					const goods = db.collection('opendb-mall-goods').field('_id, category_id,goods_sn, name, goods_desc, goods_thumb, remain_count').getTemp()
					const cate = await db.collection(	'opendb-mall-categories').get({
      getOne:true
    })
					// const result = await db.collection(goods,'opendb-mall-sku', 'opendb-mall-categories')
					// .groupBy('name')
					// .groupField('mergeObjects("$$category_id") as cate')
					// .get()
					// let { data } = result
					
					console.log(cate, 'cate')
					// this.list = data
					// this.curNav = data[0]._id._value
				}catch(err) {
					console.error(err)
					this.popup.message = '系统出现错误，请稍后再试！'
					this.$refs.popup.open()
				}finally{
					
				}
				
			}
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
	border: 1px solid red;
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
