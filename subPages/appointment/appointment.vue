<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="appointment-project">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">加载中...</view>
			<view v-else class="box bg-light">
				<uni-row :gutter="18">
					<uni-col :span="11" v-for="(item,index) in list" :key="index">
						<view class="card bg-white shadow-sm" >
							<image 
								class="card_image"
								mode="aspectFill"
								src="/static/logo.jpeg" 
							/>
							<view class="font-weight-bold font1">
								{{ item.title }}
							</view>
							<view class="card_footer">
								<view class="card_price_box">
									<view class="card_price">
										{{ item.desc }}
									</view>
								</view>
								<button  
									class="rounded-pill card_btn"
									round
									size="mini"
									@click="onAppointment(item._id)"
								>
									预约
								</button>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	import { mapState } from 'pinia';
	import { useShopStore } from '@/stores/shop';
	export default {
		onLoad(option) {
			console.log(option, 'option')
		},
		computed: {
			...mapState(useShopStore, ['shop'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
