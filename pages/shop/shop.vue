<!-- pages/shop/shop -->
<template>
	<view>
		<map
			:showMap="showMap"
			style="width: 100%; height: 500rpx;"
			show-location
			:latitude="latitude" 
			:longitude="longitude" 
			:markers="covers"
		>	
		</map>
	</view>
</template>

<script>
	import { onMounted, ref } from 'vue'
	export default {
		data() {
			return {
				showMap: true,
				covers: [{
					id: 1,
					latitude: 22.8403,
					longitude: 108.281,
					title: '夏天的风宠物生活馆(盛天尚都店)',
					decs: '南宁市西乡塘区心圩江东路8号盛天尚都1号楼2号商铺',
					iconPath: '/static/logo.jpeg',
					width: '100rpx',
					height: '100rpx',
				}]
			}
		},
		setup() {
			const latitude = ref(22.8415);
			const longitude = ref(108.27747);
			
			onMounted(() => getLocation()) 
			
			const getLocation = function() {
				uni.getLocation({
					type: 'gcj02' // gcj02 | wgs84 
				}).then(res => {
					latitude.value = res.latitude
					longitude.value = res.longitude
					console.log(res, 'res')
				}).catch(err => {
					console.error('getLocationErr:',err)
				})
			}
			
			return {
				getLocation,
				latitude,
				longitude
			}
		}
	}
</script>

<style>
</style>