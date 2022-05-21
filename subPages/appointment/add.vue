<template>
	<view>
		<diy-calendar :restWeek="shop.restWeek" @change="change"></diy-calendar>
		<view class="times">
			<unicloud-db 
				ref="udb" 
				v-slot:default="{data, loading, error, options}" 
				collection="appointment" 
				:where="where" 
				getone 
				loadtime="manual" 
				@load="onDBLoad" 
				@error="onDBerror"
			>
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="data">
					<view v-for="(item, index) in data.hours" 
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
				<view class="nullTime" v-else>暂无可预约时间段</view>
			</unicloud-db>				
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
		...mapState(useShopStore, ['shop'])
	},
	data() {
		return {
			where: '',
			hours: []
		};
	},
	methods: {
		change() {},
		chooseHours(index){},
		onDBLoad(){},
		onDBerror() {
			uni.showToast({
				title: '数据加载失败！请稍后再试',
				icon:'error'
			})
		}
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
	width: 126rpx;
	text-align: center;
	margin-left: 10rpx;
	padding: 10rpx 5rpx;
	padding-bottom: 15rpx;
	border: 1px solid black;
	border-radius: 6rpx;
}

.info {
	font-size: 20rpx;
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
