<!-- pages/shop/shop -->
<template>
	<view>
		<template v-if="hasLocation">
			<view style="margin-top: 500rpx;margin-right: auto;">
				<view style="text-align: center;">未开启定位权限，无法为您匹配附近门店</view>
				<view style="text-align: center;">(请先确认微信的位置权限是否开启)</view>
				<!-- #ifdef MP-WEIXIN -->
				<button style="width: 400rpx;margin-left: 175rpx;margin-top: 30rpx;"
					type="warn"
					open-type="openSetting"
					@opensetting="openSetting"
				>
					去开启位置信息wx
				</button>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<button style="width: 400rpx;margin-left: 175rpx;margin-top: 30rpx;"
					type="warn"
					@click="openSetting"
				>
					去开启位置信息
				</button>
				<!-- #endif -->
				
			</view>
		</template>
		<template v-else>
			<unicloud-db v-slot:default="{data, loading, error, options}" collection="shops">
				<map :showMap="showMap" style="width: 100%; height: 500rpx;" show-location :latitude="latitude" :longitude="longitude" :markers="data"></map>
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="loading">正在加载...</view>
				<view v-else>
					<view>
						<template v-for="(item, index) in data" :key="index">
							<diy-card :title="item.title" :desc="item.desc" :status="item.status" @choose="chooseShop(item)" @callphone="makePhone(item.phone)">
								<template v-slot:footer>
									<view >距离1km</view>
								</template>
							</diy-card>
						</template>
					</view>					
				</view>
			</unicloud-db>
		</template>
	</view>
</template>

<script>
import { mapActions } from 'pinia';
import { useShopStore } from '@/stores/shop';
import diyCard from '@/components/diy-card.vue';

export default {
	onShareAppMessage(res) {
		return {
			title: "夏天的风宠物生活馆",
			path: '/pages/index',
			imageUrl: "/static/logo.jpeg"
		}
	},
	components: {
		diyCard
	},
	created() {
		this.hasAuthLocation()
	},
	data() {
		return {
			showMap: true,
			covers: [],
			latitude: 22.8415,
			longitude: 108.27747,
			hasLocation: true,	
		};
	},
	methods: {
		...mapActions(useShopStore, ['setShop']),
		hasAuthLocation() {
			// #ifdef MP
			uni.getSetting({
				success: ({ authSetting }) => {
					if (authSetting['scope.userLocation'] || authSetting['location']) {
						this.hasLocation = false;
						this.getLocation();
					} else {
						this.onAuthLocation()
						this.hasLocation = true;
					}
				}
			});
			// #endif
			// #ifdef H5
			this.hasLocation = false;
			this.getLocation();
			// #endif
		},
		onAuthLocation(){
			uni.authorize({
				scope: 'scope.userLocation',
				success:(e) => {
					console.log(e, 'authsuccess')
					this.hasLocation = false;
					this.getLocation();
				},
				fail() {
					uni.showToast({
						title: '获取位置失败！'
					})
				}
			})
		},
		openSetting(e) {
			uni.openSetting({
				success:({authSetting}) => {
					if (authSetting['scope.userLocation'] || authSetting['location']) {
						this.hasLocation = false;
						this.getLocation();
					} else {
						this.hasLocation = true;
					}
				}
			})
		},
		getLocation() {
			uni.getLocation({
				type: 'gcj02' // gcj02 | wgs84
			})
			.then(res => {
				this.latitude = res.latitude;
				this.longitude = res.longitude;
			})
			.catch(err => {
				uni.showToast({
					title: '获取位置失败!',
					icon: 'error'
				})
				console.error('getLocationErr:', err);
			});
		},
		chooseShop(shop) {
			this.setShop(shop);
			uni.navigateTo({
				url: `/subPages/appointment/categoryAppointment`
			})
		},
		makePhone(phoneNumber){
			console.log(phoneNumber, 'phoneNumber')
			uni.makePhoneCall({
				phoneNumber: `${phoneNumber}`,
				success(res){
					console.log(res,'res')
				},
				fail(err) {
					console.error(err)
				}
			})
		}
	}
};
</script>