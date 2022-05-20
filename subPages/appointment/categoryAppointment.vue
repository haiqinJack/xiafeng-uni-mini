<template>
	<view>
		<navigator open-type="switchTab" url="/pages/shop/shop">
			<view class="cell bg-white">
				<uni-icons type="location"></uni-icons>
				<text class="cell-title">{{ shop.title }}</text>
				<uni-icons type="right" class="cell-right-icon"></uni-icons>
			</view>
		</navigator>
		<unicloud-db ref="udb" loadtime="manual" v-slot:default="{data, loading, error, options}" collection="appointment-category" :where="where">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">加载中...</view>
			<view v-else-if="data.length === 0" class="n">门店目前没有服务项目</view>
			<view v-else class="box bg-light">
				<uni-row :gutter="18">
					<uni-col :span="11" v-for="(item,index) in data" :key="index">
						<view class="card bg-white shadow-sm" >
							<image 
								class="card_image"
								mode="aspectFill"
								src="/static/logo.jpeg" 
							/>
							<view class="font-weight-bold font1">
								{{ item.title }}
							</view>
							<view class="card_footer">
								<view class="card_price_box">
									<view class="card_price">
										{{ item.desc }}
									</view>
								</view>
								<button  
									class="rounded-pill card_btn"
									round
									size="mini"
									@click="onAppointment(item._id)"
								>
									预约
								</button>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	import diyCell from '@/components/diy-cell.vue'
	import { mapState } from 'pinia';
	import { useShopStore } from '@/stores/shop';
	export default {
		onLoad() {
			this.where = `shopId=='${this.shop._id}'`
			this.$nextTick(() => {
				this.$refs.udb.loadData()
			})
		},
		components:{
			diyCell
		},
		computed: {
			...mapState(useShopStore, ['shop'])
		},
		data() {
			return {
				where : '',
				list: [{
					_id: 'add',
					title:'猫咪洗护',
					desc: '25元起',
					imageUrl: '/static/logo.jpeg'
				}]
			}
		},
		methods: {
			onAppointment(id) {
				uni.navigateTo({
					url: `/subPages/appointment/appointment?cId=${id}`
				})
			}
		}
	}
</script>

<style>

.cell {
	border-bottom: 1px solid #f2f3f5;
	height: 100rpx;
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
.box {
    padding: 0 30rpx;
    width: 100%;
}
.card {
	box-sizing: border-box;
    width: 100%;
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;
}
.card_image {
	width: 320rpx;
	height: 320rpx;
}
.card_footer {
	height: 40rpx;
	display: flex;
	flex-shrink: 0;
	justify-content: space-between;
	padding: 30rpx 15rpx;
	align-items: center;
}
.card_price_box {
	display: inline-block;
	width: 60%;
	color: #e54d42;
}
.card_price {
	line-height: 60rpx;
	height: 60rpx;
	font-size: 40rpx;
	display: inline;
}
.card_btn {
	display: block;
	width: 140rpx;
	line-height: 60rpx;
	height: 60rpx;
	background-color: #ffc32c;
	color: #f2f3f5;
}
.n {
	padding-top: 60rpx;
	padding-bottom: 750rpx;
	width: 100%;
	text-align: center;
	color: #878688;
}
</style>
