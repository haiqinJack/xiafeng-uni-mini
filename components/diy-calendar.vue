<template>
	<view class="wrapper">
		<scroll-view scroll-x style="height: 40px; width: 635rpx;display: flex;" enable-flex>
			<view
				v-for="(item, index) in days"
				:key="index"
				class="dateBox"
				:class="curDay == index ? 'dayActive' : '', item.type === 'disabled' ? 'dayDisabled' : ''"
				@click="switchDay(index)"
			>
				<view class="week">{{ item.week }}</view>
				<view class="text">{{ item._date }}</view>
			</view>
			<view class="dateBox1"></view>
		</scroll-view>

		<view class="choose">
			<view class="week">
				<uni-icons type="calendar"></uni-icons>
			</view>
			<view class="text">选择</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'diy-calendar',
	created() {
		this.setWeek()
	},
	props: {
		maxDate: {
			type: Number,
			default: 7
		},
		//固定周几休息，0~6
		restWeek: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			curDay: 0,
			days: []
		};
	},
	methods: {
		switchDay(index) {
			console.log(index, 'switchindex')
			let day = this.days[index];
			console.log(day, 'day----')
			if (day.type !== 'disabled') {
				this.curDay = index
				console.log(this.curDay, 'this.curDay')
				this.$emit('change', day);
			}
		},
		setWeek() {
			let now = new Date();
			let year = now.getFullYear();
			let month = now.getMonth();
			let date = now.getDate();
			let dateDay = now.getDay(); //今天周几？
			let days = [];

			//循环7天的数据格式
			for (let i = 0; i < this.maxDate; i++) {
				let d = new Date(year, month, date);

				let week = d.getDay();
				let type = 'selected';
				switch (week) {
					case 0:
						week = '周日';
						break;
					case 1:
						week = '周一';
						break;
					case 2:
						week = '周二';
						break;
					case 3:
						week = '周三';
						break;
					case 4:
						week = '周四';
						break;
					case 5:
						week = '周五';
						break;
					case 6:
						week = '周六';
						break;
				}

				this.restWeek.forEach(n => {
					if (d.getDay() == n) {
						week = '休息';
						type = 'disabled';
					}
				});
				date++;
				days.push({
					week,
					_date: `${d.getMonth() + 1}.${d.getDate()}`,
					year: d.getFullYear(),
					month: d.getMonth(),
					date: d.getDate(),
					type
				});
			}
			console.log(days,'days')
			let currentIndex = this.setCurrentIndex(days);
			this.days = days
			this.curDay = currentIndex
			
		},
		setCurrentIndex(days, currentIndex = 0) {
			if (days[currentIndex].type === 'disabled') {
				currentIndex++;
				this.setCurrentIndex(days, currentIndex);
			}
			return currentIndex;
		}
	}
};
</script>

<style>
.wrapper {
	display: flex;
	background: #fff;
	margin: 0 10rpx;
}
.dateBox {
	width: 90rpx;
	align-items: center;
	flex-shrink: 0;
	border-radius: 0.25rem;
}
.dateBox1 {
	width: 20rpx;
	flex-shrink: 0;
}
.week {
	text-align: center;
	font-size: 0.8rem;
}
.text {
	font-size: 0.6rem;
	text-align: center;
	line-height: 34rpx;
	height: 34rpx;
}
.choose {
	width: 95rpx;
	box-shadow: -3px 0 3px 0 rgba(0, 0, 0, 0.075);
	align-items: center;
	flex-shrink: 0;
}

.dayActive {
	background: coral;
	color: #fff;
}
.dayDisabled {
	background: rgb(184, 184, 184);
	color: #fff;
}
</style>
