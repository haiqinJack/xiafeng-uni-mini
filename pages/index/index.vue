<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="opendb-banner">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item, index) in data" :key="index">
							<image class="swiper-image" :src="item.bannerfile.url" mode="scaleToFill"></image>
						</swiper-item>						
					</swiper>
				</uni-swiper-dot>
			</view>
		</unicloud-db>
		<view style="height: 180px;position: relative; width: 700rpx;margin: 0 auto; margin-top: -40rpx; " class="d-flex align-middle bg-light border-top-left-radius border-top-right-radius" >
		    <view style="width: 50%;padding-top: 20rpx;" 
				class="bg-white shadow d-flex flex-column align-items-center border-top-left-radius"
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
				class="bg-white shadow d-flex flex-column align-items-center border-top-right-radius "      
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
		            小夏臻选
		        </view>
		        <view style="font-size: x-small;" class="text-muted">
		            简单便捷不社恐
		        </view>
		        
		    </view>
		</view>
		<view style="height: 180px;position: relative; width: 700rpx;margin: 0 auto; margin-top: 0; " class="d-flex align-middle bg-light border-bottom-left-radius border-bottom-right-radius" >
		    <view style="width: 50%;padding-top: 20rpx;" 
				class="bg-white shadow d-flex flex-column align-items-center border-bottom-left-radius "
				@click="n"
		    >
		        <view>
		            <image
		                style="width: 140rpx; height: 140rpx;"
		                src="~@/static/jiyang.png"
		            >
		            </image>
		        </view>
		        <view class="title">
		            寄养服务
		        </view>
		        <view style="font-size: x-small;" class="text-muted">
		            一条龙寄养服务
		        </view>
		        
		    </view>
		    <view style="width: 50%; padding-top: 20rpx;"
				class="bg-white shadow d-flex flex-column align-items-center border-bottom-right-radius"      
				@click="n"
			>
		        <view>
		            <image
		                style="width: 140rpx; height: 140rpx;"
		                src="~@/static/cat.png"
		            >
		            </image>
		        </view>
		        <view class="title">
		            活体销售
		        </view>
		        <view style="font-size: x-small;" class="text-muted">
		            小夏精选健康宠物
		        </view>
		        
		    </view>
		</view>
	</view>
</template>

<script>
	import { useUserStore } from '@/stores/user';
	import { mapState, mapActions } from 'pinia'
	export default {
		onReady() {
			const { uid } = uniCloud.getCurrentUserInfo()
			if(!uid) {
				this.login()
			}
		},
		onShareAppMessage(res) {
			return {
				title: "夏天的风宠物生活馆",
				path: '/pages/index',
				imageUrl: "/static/logo.jpeg"
			}
		},
		data() {
			return {
				current: 0,
				mode: 'dot',
			}
		},
		methods: {
			...mapActions(useUserStore, ['login']),
			to(url){
				uni.switchTab({
					url
				})
			},
			change(e) {
				console.log(e.detail.current)
				this.current = e.detail.current;
			},
			n() {
				uni.showToast({
					title: '暂未开放',
					icon:"error"
				})
			}
		}
	}
</script>

<style>
.swiper-box {
	width: 750rpx;
	height: 500rpx;
}
.swiper-image {
	width: 750rpx;
	height: 500rpx;
}
.border-top-left-radius {
	border-top-left-radius: 30rpx;
}
.border-top-right-radius {
    border-top-right-radius: 30rpx;
}
.border-bottom-left-radius {
    border-bottom-left-radius: 30rpx;
}
.border-bottom-right-radius {
    border-bottom-right-radius: 30rpx;
}
.title {
	font-size: 48rpx;
	line-height: 60rpx;
	margin: 20rpx 0;
}
</style>
