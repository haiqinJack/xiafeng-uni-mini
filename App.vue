<script>

import { useUserStore } from '@/stores/user'

export default {
	onLaunch: function() {
		const updateManager = uni.getUpdateManager();
		
		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});
		
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		
		});
		
		updateManager.onUpdateFailed(function (res) {
		  // 新的版本下载失败
		});
		this.login()
	},
	setup() {
		const userStroe = useUserStore()
		const login = function() {
			try{
				userStroe.login()
			}catch(e){
				console.error(e, 'appLogin 失败')
				// userStroe.login()
			}
		}
		return {
			userStroe,
			login
		}
	}
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	@import '@/diy.scss';
	@import "@/static/iconfont.css";
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
