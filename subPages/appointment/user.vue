<template>
	<view class="bg-light" style="padding: 10rpx 0;">
		<unicloud-db v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList" 
			field="appointment_project_id{bannerfile, title},shop_id{title, desc, latitude, longitude}, project_single_id{title},status, year,month,date,hour">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				
				<view v-for="(item, index) in data" :key="index" style="width: 680rpx;margin: 40rpx auto; padding: 10rpx 10rpx;" class="bg-white shadow">
				        <view class="header d-flex justify-content-between font-weight-normal" style="padding: 10rpx 10rpx;">
				            <view style="display: flex;">
				                <view style="margin-right: 20rpx;">{{ item.shop_id[0].title }}</view>
				                <!-- <van-icon name="guide-o" color="green" @click="openLocation" /> -->
								<uni-icons type="paperplane" color="green" @click="openLocation(item.shop_id[0])"></uni-icons>
				            </view>
				            <view>{{ item.status }}</view>
				        </view>
				        <!-- <view class="font-weight-lighter text-muted" style="margin: 20rpx 0; padding: 10rpx 10rpx;">
				            {{ item.createTime }}
				        </view> -->
				        <view class="body">
				            <view class="d-flex" style="padding: 10rpx 10rpx;">
				                <image style="width: 160rpx;height: 160rpx;" mode="scaleToFill" :src="item.appointment_project_id[0].bannerfile.url" />
				                <view style="padding-left: 16rpx;">
				                    <view style="line-height: 32rpx;">{{ item.appointment_project_id[0].title }}</view>
				                   
									<uni-tag v-for="(tag, t) in item.project_single_id || []" :text="tag.title" :key="t" circle ></uni-tag>
				                    <view class="text-muted" style="font-size: small;margin-top: 10rpx;">预约时间：{{ item.year }}-{{item.month +1 }}-{{item.date}} {{item.hour}}:00</view>
				                </view>
				            </view>
				        </view>
				    </view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				collectionList: [db.collection('appointment-user').getTemp(), db.collection('shops').getTemp(),db.collection('appointment-project').getTemp(),db.collection('appointment-project-single').getTemp()]
			}
		},
		methods: {
			openLocation(shop) {
				uni.openLocation({
					latitude: shop.latitude,
					longitude: shop.longitude,
					name: shop.title,
					address: shop.desc,
					fail() {
						uni.showToast({
							title: '系统繁忙',
							icon:"error"
						})
					},
				})
			}
		}
	}
</script>

<style>
.header {
    padding-top: 40rpx;
    font-size: 30rpx;
}

</style>
