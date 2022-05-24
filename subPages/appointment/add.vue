<template>
	<view>
		<diy-calendar :restWeek="shop.restWeek" @change="change"></diy-calendar>			
		<template v-if="hours.length > 0">
			<view class="times">
				<view v-for="(item, index) in formarHours"
					:key="index" class="time" 
					:class="[hoursIndex == index ? 'timeActive' : '']" 
					@click="chooseHours(index)"
				>
					<view v-if="item.info">
						<view class="hour">{{ item.hour + ':00' }}</view>
						<view class="info">{{ item.info }}</view>
					</view>
					<view v-else>{{ item.hour }}:00</view>
				</view>
			</view>
		</template>
		<view class="nullTime" v-else>暂无可预约时间段</view>	
		<view style="box-sizing: border-box; width: 750rpx; padding: 0 10rpx; overflow: hidden;">
			<text>选择服务宠物</text>
			<scroll-view scroll-x enable-flex style="height: 160rpx; width: 750rpx;display: flex;">
				<view class="d-flex">
					<unicloud-db v-slot:default="{data, loading, error, options}" collection="pets">
						<view v-if="error">{{error.message}}</view>
						<view v-else>
							<view v-for="(item, index) in data" :key="index">
								<image :src="item.avatarUrl.url" style="width: 160rpx;height: 160rpx;"></image>
							</view>
						</view>
					</unicloud-db>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { useShopStore } from '@/stores/shop.js';
import { mapState } from 'pinia';
import diyCalendar from '@/components/diy-calendar.vue';
export default {
	components: {
		diyCalendar
	},
	onLoad() {
		let project = uni.getStorageSync('appointment')
		this.hours = project.hours
		console.log(project, 'project')
	},
	computed: {
		...mapState(useShopStore, ['shop']),
		formarHours() {//初始化格式前台看的清楚
			let arr = []
			this.hours.forEach(item => {
				arr.push({
					hour: item,
					info: ''
				})
			})
			return arr
		},
	},
	data() {

		return {
			where: '',
			hours: [],
			hoursIndex: -1,
		};
	},
	methods: {
		change() {},
		chooseHours(index){
			this.hoursIndex = index
		},
		onDBLoad(){},
		onDBerror() {
			uni.showToast({
				title: '数据加载失败！请稍后再试',
				icon:'error'
			})
		},
		
	}
};
</script>

<style>
.times {
	display: flex;
	flex-flow: row wrap;
	text-align: flex-end;
	padding-bottom: 40rpx;
}

.time {
	height: 30px;
	margin-top: 40rpx;
	width: 124rpx;
	text-align: center;
	margin-left: 10rpx;
	padding: 10rpx 5rpx;
	padding-bottom: 15rpx;
	border: 1px solid black;
	border-radius: 6rpx;
}

.info {
	font-size: 20rpx;
	overflow: hidden;
}

.nullTime {
	display: flex;
	width: 750rpx;
	margin: 0 auto;
	margin-top: 20rpx;
	text-align: center;
	font-size: 14px;
	color: rgb(190, 190, 190);
	justify-content: center;
}

.timeActive {
	color: burlywood;
	background: rgb(222, 184, 135, 0.2);
	border: 1px solid burlywood;
	border-radius: 6rpx;
}
</style>
