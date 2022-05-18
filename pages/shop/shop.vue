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
					去开启位置信息weixin
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
			<map :showMap="showMap" style="width: 100%; height: 500rpx;" show-location :latitude="latitude" :longitude="longitude" :markers="covers"></map>
			<view>
				<template v-for="(item, index) in covers" :key="index">
					<diy-card :title="item.title" :desc="item.desc" @choose="chooseShop(item)"><view slot="footer">距离您 1 km</view></diy-card>
				</template>
			</view>
		</template>
	</view>
</template>

<script>
import { mapActions } from 'pinia';
import { useShopStore } from '@/stores/shop';
import diyCard from '@/components/diy-card.vue';

export default {
	components: {
		diyCard
	},
	created() {
		this.hasAuthLocation()
	},
	data() {
		return {
			showMap: true,
			covers: [
			{
				id: 1,
				latitude: 22.8403,
				longitude: 108.281,
				title: '夏天的风宠物生活馆(盛天尚都店)',
				desc: '南宁市西乡塘区心圩江东路8号盛天尚都1号楼2号商铺',
				iconPath: '/static/logo.jpeg',
				width: '100rpx',
				height: '100rpx'
			},
			{
				id: 1,
				latitude: 22.8403,
				longitude: 108.281,
				title: '夏天的风宠物生活馆(翰林店)',
				desc: '南宁市西乡塘区心圩江东路8号盛天尚都1号楼2号商铺',
				iconPath: '/static/logo.jpeg',
				width: '100rpx',
				height: '100rpx'
			}
			],
			latitude: 22.8415,
			longitude: 108.27747,
			hasLocation: true,	
		};
	},
	methods: {
		...mapActions(useShopStore, ['setShop']),
		hasAuthLocation() {
			uni.getSetting({
				success: ({ authSetting }) => {
					if (authSetting['scope.userLocation'] || authSetting['location']) {
						this.hasLocation = false;
						this.getLocation();
					} else {
						this.hasLocation = true;
					}
				}
			});
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
				console.error('getLocationErr:', err);
			});
		},
		chooseShop(shop) {
			console.log('选中门店')
			this.setShop(shop);
			uni.navigateTo({
				url: '/subPages/appointment/categoryAppointment'
			})
		}
	}
};
</script>