<template>
	<view>
		appointment
		<view class="">
			{{ shop }}
		</view>
	</view>
</template>

<script>
	import { mapState } from 'pinia';
	import { useShopStore } from '@/stores/shop';
	export default {
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
