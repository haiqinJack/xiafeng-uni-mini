<script>
import { useUserStore } from '@/stores/user';
import { mapState, mapActions} from 'pinia'
import loginApi from '@/api/login.js'
export default {
	onLaunch: async function() {
		console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
		console.log('App Launch')
		const { result } = await loginApi.login()
		console.log(result, 'userinfo--login')
		uni.showModal({
			showCancel: false,
			content: JSON.stringify(result)
		})
		if (result.code === 0) {
			uni.setStorageSync('uni_id_token', result.token)
			uni.setStorageSync('uni_id_token_expired', result.tokenExpired)
		}
	},
	onShow: function() {
		console.log('App Show')
		
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
