<template>
	<view>
		<button @click="login">LOGIN</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				uni.login({
					success(res) {
						console.log(res,'res')
					}
				})
			}
		}
	}
</script>

<style>

</style>
