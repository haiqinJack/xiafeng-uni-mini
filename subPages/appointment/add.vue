<template>
	<view>
		<diy-calendar :restWeek="shop.restWeek" @change="changeCalender"></diy-calendar>
		<template v-if="hours.length > 0">
			<view class="times">
				<view v-for="(item, index) in formarHours" :key="index" class="time" :class="[hoursIndex == index ? 'timeActive' : '']" @click="chooseHours(index)">
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
			<text style="padding-left: 20rpx;font-weight: 600 ;">选择服务宠物</text>
			<scroll-view scroll-x enable-flex style="height:260rpx; 750rpx;display: flex;">
				<view class="d-flex">
					<unicloud-db v-slot:default="{ data, loading, error, options }" loadtime="manual" ref="petsdb" collection="pets" >
						<view v-if="error">网络连接超时</view>
						<view v-else class="d-flex">
							<view v-for="(item, index) in data" :key="index" @click="onChoosePet(item, index)" class="pet">
								<template v-if="choosePetIndex == index">
									<view class="">
										<image :src="item.avatarUrl ? item.avatarUrl.url : '/static/pet.jpg'" class="pet-image pet-image-active"></image>
										<uni-icons type="checkbox-filled" class="pet-icon" size="22" color="#e62c2c"></uni-icons>
									</view>
									<view class="pet-nickname">{{ item.nickname }}</view>
								</template>
								<template v-else>
									<view class="">
										<image
											:src="item.avatarUrl ? item.avatarUrl.url : '/static/pet.jpg'"
											class="pet-image"
											style="border: 2px solid rgb(255, 255, 255, 0)"
										></image>
									</view>
									<view class="pet-nickname">{{ item.nickname }}</view>
								</template>
							</view>
							<view class="pet" @click="toPet">
								<view class="">
									<view class="pet-image-list"></view>
									<uni-icons color="#c5c5c5" type="list" size="44" class="pet-list"></uni-icons>
								</view>
								<view style="font-size: 14px; width: 140rpx; padding-top: 4px;padding-left: 10px;">管理宠物</view>
							</view>
						</view>
					</unicloud-db>
				</view>
			</scroll-view>
		</view>
		<view style="box-sizing: border-box; width: 750rpx; padding: 0 10rpx; overflow: hidden;">
			<text style="padding-left: 20rpx;font-weight: 600 ;">
				增值服务
				<text style="font-size: 12px;color: rgb(150,150,150);">(可多选)</text>
			</text>
			<view class="row" style="margin-top: 20rpx;">
				<view class="col" v-for="(item, index) in formOptions.project_single" :key="index">
					<template v-if="item.choose">
						<view @click="onChooseSignle(item, index)" style="border: 1px solid #e62c2c;" class="position-relative">
							<image src="../../static/cat.png" mode="widthFix" style="width: 100%;"></image>
							<uni-icons type="checkbox-filled" class="single-icon" size="22" color="#e62c2c"></uni-icons>
							<view class="" style="width: 100%;text-align: center;overflow: hidden;">{{ item.title }}</view>
							<view style="width: 100%;text-align: center;">￥{{ parseFloat(item.price / 100).toFixed(2) }}元</view>
						</view>
					</template>
					<template v-else>
						<view @click="onChooseSignle(item, index)" style="border: 1px solid #ccc;">
							<image src="../../static/cat.png" mode="widthFix" style="width: 100%;"></image>
							<view class="" style="width: 100%;text-align: center;overflow: hidden;">{{ item.title }}</view>
							<view style="width: 100%;text-align: center;">￥{{ parseFloat(item.price / 100).toFixed(2) }}元</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view style="box-sizing: border-box; width: 750rpx; padding: 0 10rpx; overflow: hidden;">
			<view class="shop_item" style="font-weight: 600 ;">
				<text style="padding-left: 24rpx;">预约信息</text>	
			</view>
			<view class="shop_item">
				<text style="padding-left: 24rpx;">预约地点 </text> 
				<text style="padding-left: 30rpx;">夏天的风宠物生活馆（翰林华府店）</text>
			</view>
			<view class="shop_item">
				<text style="padding-left: 24rpx;">预约时间 </text> 
				<text style="padding-left: 30rpx;">{{formOptions.time}}</text>
			</view>
			<view class="shop_item">
				<text style="padding-left: 24rpx;">预约项目 </text> 
				<text style="padding-left: 30rpx;">{{formData.appointment_project_title}}</text>
			</view>
		</view>
		<view style="color: red; font-size: 8px; margin-left: 20rpx ;padding-bottom: 60px;">*具体费用以实际体重及项目为准。</view>
		
		<view class="submit-bar">
			<view class="d-flex align-items-center justify-content-between">
				<view style="color: #ee0a24;">合计:￥{{ parseFloat(totalFee / 100).toFixed(2) }}</view>
				<view class="d-flex">
					<button class="meituan rounded-pill" @click="meituan">美团券</button>
					<button class="submit-btn rounded-pill" @click="onSubmit" style="margin-left: 20rpx;">确定预约</button>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popup" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
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
		let project = uni.getStorageSync('appointment');
		console.log(project, 'project')
		this.hours = project.hours;
		this._init()
	},
	onShow() {
		if (this.$refs.petsdb) {
			this.$refs.petsdb.refresh();
		}
	},
	onReady() {
		this.$refs.petsdb.loadData();
		let arr = [];
		for (let i = 0; i < 6; i++) {
			arr.push({
				_id: i,
				title: 'adaddddasdsadsadasdd' + i,
				price: 200 + i,
				choose: false
			});
		}
		this.formOptions.project_single = arr;
	},
	computed: {
		...mapState(useShopStore, ['shop']),
		formarHours() {
			//初始化格式前台看的清楚
			let arr = [];
			this.hours.forEach(item => {
				arr.push({
					hour: item,
					info: ''
				});
			});
			return arr;
		},

		totalFee() {
			let fee = this.formOptions.project_price
			this.formOptions.project_single.forEach(item => {
				if(item.choose) {
					fee += item.price
				}
			})
			return fee
		}
	},
	data() {
		let formData = {
			appointment_project_id: '',
			shop_id: '',
			pet: {},
			project_single_id: [],
			mobile: '',
			order_price: '',
			pay_pirce: '',
			pay_type: '',
			year: -1,
			month: -1,
			date: -1,
			hour: -1
		}
		return {
			formData,
			where: '',
			hours: [],
			hoursIndex: -1,
			choosePetIndex: -1,
			popup: 'error',
			message: '',
			formOptions: {
				project_price: 0,
				project_single: [],
				time: ''
			}
		};
	},
	methods: {
		_init() {
			this.setFormData()
		},
		setFormData() {
			let project = uni.getStorageSync('appointment');			
			let now = new Date();
			let year = now.getFullYear();
			let month = now.getMonth();
			let date = now.getDate();
			this.formData.appointment_project_id = project._id;
			this.formOptions.project_price = project.price
			this.setFormDataDate(year, month, date)
			this.formData.shop_id = this.shop._id;
		},
		setFormDataDate(year, month, date) {
			this.formData.year = year
			this.formData.month = month
			this.formData.date = date
			this.formData.hour = -1
			this.hoursIndex = -1
			this.formOptions.time = ''
		},
		setFormDataPet(pet) {
			this.formData.pet = pet
			this.formData.mobile = pet.phone
		},
		setFormDataProjectSingle() {
			let arr = []
			this.formOptions.project_single.forEach(item => {
				if(item.choose) {
					arr.push(item._id)
				}	
			})
			this.formData.project_single_id = arr
		},
		onChooseSignle(item, index) {
			item.choose = !item.choose;
		},
		onChoosePet(item, index) {
			this.choosePetIndex = index;
			console.log(item, 'item');
			this.setFormDataPet(item)
		},
		changeCalender(e) {
			let { year, month, date } = e
			this.setFormDataDate(year, month, date)
		},
		chooseHours(index) {
			if (this.hoursIndex == index) return;
			this.hoursIndex = index;
			this.formData.hour = parseInt(this.formarHours[index].hour)
			let { year, month, date, hour } = this.formData
			this.formOptions.time = `${year}-${month + 1}-${date} ${hour}:00`
			console.log(this.formarHours[index], 'chooseHours')
		},
		toPet() {
			uni.navigateTo({
				url: '/subPages/pets/list'
			});
		},
		onSubmit() {
			this.setFormDataProjectSingle()
			let val = this.val()
			if(val) {
				uni.showLoading({
					mask: true
				});
				this.formData.pay_pirce = this.totalFee,
				this.formData.pay_type = 'meituan'
				uniCloud.callFunction({
					name: 'uni-app-pay',
					data: {
						action : 'wxpayJSAPI'
					}
				}).then(({result}) => {
					console.log(result,' res----')
					
				}).finally(() => {
					uni.hideLoading();
				});
			}	
		},
		meituan() {
			this.setFormDataProjectSingle()
			let validate = this.validate()
			if(validate) {
				uni.showLoading({
					mask: true
				});
				this.formData.order_price = this.totalFee // 目前订单金额跟付款金额一致。因为没有优惠减免
				this.formData.pay_pirce = 0 //美团按钮的支付金额为：0
				this.formData.pay_type = 'meituan'
				this.formData.status = "预约中"
				this.formData.pay_status = "未支付"
				uniCloud.database().collection('appointment-user').add(this.formData).then(res => {					
					if(res.code){
						uni.showToast({
							title: '网络繁忙。',
							icon: "error"
						})
						return
					}
					uni.showToast({
						title: '预约成功。',
						icon:'none',
						complete() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/subPages/appointment/user'
								})
							}, 1000)
						}
					})
				}).catch(err => {
					this.message = '系统出现错误，请稍后再试！'
					this.$refs.popup.open()
				}).finally(() => {
					uni.hideLoading();
				})
			}	
		},
		validate() {
			let { hour, pet } = this.formData;
			let flag = true
			if(hour <= -1) {
				uni.showToast({
					icon: 'none',
					title: '请选择时间'
				});
				flag = false
				return 
			}
			if(pet._id.trim() == '') {
				uni.showToast({
					icon: 'none',
					title: '请选择宠物'
				});
				flag = false
				return 
			}
			return flag
		}
		
	}
};
</script>

<style>
.row {
	display: flex;
	flex-wrap: wrap;
}
.col {	
	box-sizing: border-box;
	margin-bottom: 20rpx;
	padding: 0 10rpx;
	display: block;
	max-width: 240rpx;
	min-width: 240rpx;
	flex-shrink: 0;
}
.shop_item {
	border-bottom: 1px solid #ccc;
	height: 100rpx;
	text-align:start;
	line-height: 100rpx;
}
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

.pet {
	margin-top: 30rpx;
	margin-left: 20rpx;
	position: relative;
	display: block;
}
.pet-image {
	border-radius: 50%;
	width: 140rpx;
	height: 140rpx;
}

.pet-image-list {
	border-radius: 50%;
	width: 140rpx;
	height: 140rpx;
	border: 2px solid #c5c5c5;
	position: relative;
}
.pet-image-active {
	border: 2px solid #e62c2c;
}
.pet-icon {
	position: absolute;
	right: -8rpx;
	top: -6rpx;
}

.pet-list {
	position: absolute;
	top: 30rpx;
	left: 32rpx;
}
.pet-nickname {
	font-size: 14px;
	width: 140rpx;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.single-icon {
	position: absolute;
	top: -14rpx;
	right: -14rpx;
}

.submit-bar {
	background-color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	z-index: 100;
	box-sizing: border-box;
	padding: 16rpx 40rpx;
}

.meituan {
	background-color: #FFC300;
	font-size: 14px;
	color: #fff;
}
.submit-btn {
	font-size: 14px;
	color: #fff;
	background-color: #ee0a24;
}
</style>
