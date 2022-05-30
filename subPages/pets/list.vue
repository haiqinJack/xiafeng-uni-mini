<template>
	<view class="container">
		<unicloud-db
			ref="udb"
			v-slot:default="{ data, pagination, loading, hasMore, error }"
			loadtime="manual"
			:collection="collectionList"
			field="avatarUrl,nickname,pet_type{_id, title}"
		>
			<view v-if="error">{{ error.message }}</view>
			<view v-else-if="data">
				<uni-list>
					<uni-list-chat
						v-for="(item, index) in data"
						:key="index"
						:avatar-circle="true"
						:clickable="true"
						:title="item.nickname"
						:avatar="item.avatarUrl ? item.avatarUrl.url : '/static/pet.jpg'"
						@click="handleItemClick(item._id)"
						:note="item.pet_type[0].title"
					></uni-list-chat>
				</uni-list>
			</view>
			<uni-load-more :status="loading ? 'loading' : hasMore ? 'more' : 'noMore'"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
const db = uniCloud.database();
export default {
	onLoad() {
		const uid = uniCloud.getCurrentUserInfo()
		console.log(uid, 'uid')
	},
	onShow() {
		if (this.$refs.udb) {
			this.$refs.udb.refresh();
		}
	},
	onReady() {
		this.$refs.udb.loadData();
	},
	data() {
		return {
			collectionList: [db.collection('pets').getTemp(), db.collection('pet-type').getTemp()],
			loadMore: {
				contentdown: '',
				contentrefresh: '',
				contentnomore: ''
			}
		};
	},
	onPullDownRefresh() {
		this.$refs.udb.loadData(
			{
				clear: true
			},
			() => {
				uni.stopPullDownRefresh();
			}
		);
	},
	onReachBottom() {
		this.$refs.udb.loadMore();
	},
	methods: {
		handleItemClick(id) {
			uni.navigateTo({
				url: './edit?id=' + id
			});
		},
		fabClick() {
			// 打开新增页面
			uni.navigateTo({
				url: './add',
				events: {
					// 监听新增数据成功后, 刷新当前页面数据
					refreshData: () => {
						this.$refs.udb.loadData({
							clear: true
						});
					}
				}
			});
		}
	}
};
</script>

<style></style>
