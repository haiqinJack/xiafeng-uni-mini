<template>
	<view>
		<uni-calendar 
			:insert="true"
			:lunar="true" 
			:start-date="'2019-3-2'"
			:end-date="'2019-5-20'"
			@change="change"
			 />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			change() {
				
			}
		}
	}
</script>

<style>

</style>
