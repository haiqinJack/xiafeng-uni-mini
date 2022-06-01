<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, hasMore, options}" 
			ref="udb"
			loadtime="manual"
			orderby="create_time desc "
			@load="onLoadData"
			:where="where"
			collection="uni-id-base-order">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view class="card bg-white rounded-llg" v-for="(item, index) in data" :key="index">
					<view class="card-header d-flex justify-content-between bg-white">
						<view class="card-time text-muted">
							{{ item.create_time }}
						</view>
						<view class="card-status text-info">
							{{ item.status }}
						</view>
					</view>
					
					<scroll-view class="card-body" scroll-x>
						<view class="" v-for="(cart, idx) in item.cart" :key="idx">
							<image class="card-image" :src="cart.goods_thumb ? cart.goods_thumb.url : '/static/imageErr.png'" mode="scaleToFill"></image>
						</view>
					</scroll-view>
					
					<view class="card-footer">
						<text style="font-size: 12px;color: #ccc;margin-right: 16rpx;">共{{ item.count }}件</text>
						<text>￥{{ parseFloat(item.pay_pirce / 100).toFixed(2) }}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	import utils from '/utils/index'
	
	const { uid } = uniCloud.getCurrentUserInfo()
	export default {
		onLoad() {
			this.$nextTick(() => {
				this.$refs.udb.loadData()
			})
		},

		data() {
			return {
				list: [],
				where: `user_id == '${uid}'`
			}
		},
		methods: {
			onLoadData(data) {
				data.map(item => {
					item.create_time = utils.timestampToTime(item.create_time)
					item.count = item.cart.reduce((total, v) => {
						return total += v.num
					},0)
					return item
				})
				this.list = data
				return data
			}
		}
	}
</script>

<style>

.card {
    margin: auto;
    margin-top: 10px;
    width: 700rpx;
    padding: 20rpx 20rpx;
    box-sizing: border-box;
}
.card-header {
	height: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.card-body {
	height: 120rpx;
	width: 100%;
}
.card-footer {
	padding: 10rpx 0;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: flex-end;
}
.card-image {
	width: 120rpx;
	height: 120rpx;
}
.card-time {
    font-size: 0.7rem;
}

.card-left {
    width: 130rpx;
    height: 130rpx;
}

.card-middle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
}
.card-left image {
    width: 110rpx;
    height: 110rpx;
}

.card-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-shrink: 0;
    text-align: right;
    width: 140rpx;
    height: 130rpx;
}

.coupon {
    text-align: center;
    height: 40px;
    font-size: 0.8rem;
    border-top: 1px dashed #d4d4d4;
    border-bottom: 1px dashed #d4d4d4;
}
.info {
    font-size: 0.8rem;
    padding-top: 20rpx;
    text-align: right;
    vertical-align: text-bottom;
}

</style>
