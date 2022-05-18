<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item>
					<image class="swiper-image" src="/static/logo.jpeg" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view style="height: 180px;position: relative; width: 700rpx;margin: 0 auto; margin-top: -40rpx; " class="d-flex align-middle bg-light my-radius-left my-radius-right" >
		    <view style="width: 50%;padding-top: 20rpx;" 
				class="bg-white shadow d-flex flex-column align-items-center my-radius-left"
				@click="to('/pages/shop/shop')"
		    >
		        <view>
		            <image
		                style="width: 140rpx; height: 140rpx;"
		                src="/static/xizao.png"
		            >
		            </image>
		        </view>
		        <view class="title">
		            洗护预约
		        </view>
		        <view style="font-size: x-small;" class="text-muted">
		            爱洗澡 爱健康
		        </view>
		        
		    </view>
		    <view style="width: 50%; padding-top: 20rpx;"
				class="bg-white shadow d-flex flex-column align-items-center my-radius-right"      
				@click="to('/pages/goods/goods')"
			>
		        <view>
		            <image
		                style="width: 140rpx; height: 140rpx;"
		                src="/static/food.png"
		            >
		            </image>
		        </view>
		        <view class="title">
		            宠物粮食
		        </view>
		        <view style="font-size: x-small;" class="text-muted">
		            简单便捷不社恐
		        </view>
		        
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				mode: 'dot',
			}
		},
		methods: {
			to(url){
				uni.switchTab({
					url
				})
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>
.swiper-box {
	width: 750rpx;
	height: 600rpx;
}
.swiper-image {
	width: 750rpx;
	height: 600rpx;
}
.my-radius-left {
    border-top-left-radius: 30rpx;
    border-bottom-left-radius: 30rpx;
}
.my-radius-right {
    border-top-right-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
}

.title {
	font-size: 48rpx;
	line-height: 60rpx;
	margin: 20rpx 0;
}
</style>
