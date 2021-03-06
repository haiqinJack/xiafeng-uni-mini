<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="avatarUrl" label="宠物头像">
				<uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatarUrl"></uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="nickname" label="宠物昵称" required><uni-easyinput v-model="formData.nickname" trim="both"></uni-easyinput></uni-forms-item>
			<uni-forms-item name="phone" label="联系方式" required><uni-easyinput v-model="formData.phone" trim="both"></uni-easyinput></uni-forms-item>
			<uni-forms-item name="pet_group" label="宠物种类" required>
				<uni-data-checkbox
					placeholder="请选择宠物种类"
					v-model="formData.pet_group"
					@change="onChange"
					collection="pet-group"
					field="_id as value, title as text"
					trim="both"
				></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="pet_type" label="宠物品种" required>
				<uni-data-picker
					placeholder="请选择宠物品种"
					v-model="formData.pet_type"
					:localdata="formOptions.pet_type"
					:readonly="readonly_pet_type"
					trim="both"
				></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="vaccines" label="疫苗情况" required>
				<uni-data-picker
					placeholder="请选择疫苗情况"
					v-model="formData.vaccines"
					:localdata="formOptions.vaccines"
					:readonly="readonly_vaccines"
					trim="both"
				></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="pet_sex" label="性别" required>
				<uni-data-checkbox v-model="formData.pet_sex" :localdata="formOptions.pet_sex_localdata" trim="both"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="pet_weight" label="体重(kg)" required><uni-easyinput type="number" v-model="formData.pet_weight"></uni-easyinput></uni-forms-item>
			<uni-forms-item name="isSterilization" label="是否绝育">
				<uni-data-checkbox v-model="formData.isSterilization" :localdata="formOptions.isSterilization_localdata" trim="both"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="birthday" label="出生年月"><uni-datetime-picker return-type="date" v-model="formData.birthday"></uni-datetime-picker></uni-forms-item>
			<view class="uni-button-group"><button type="primary" class="uni-button" @click="submit">提交</button></view>
			<view class="uni-button-group" style="margin-top: 20px;color: #a9a9a9;" @click="remove">删除</view>
		</uni-forms>
	</view>
</template>

<script>
import { validator } from '../../js_sdk/validator/pets.js';

const db = uniCloud.database();
const dbCollectionName = 'pets';

function getValidator(fields) {
	let result = {};
	for (let key in validator) {
		if (fields.indexOf(key) > -1) {
			result[key] = validator[key];
		}
	}
	return result;
}

export default {
	computed: {
		readonly_vaccines() {
			return this.formOptions.vaccines.length == 0;
		},
		readonly_pet_type() {
			return this.formOptions.pet_type.length == 0;
		}
	},
	data() {
		let formData = {
			avatarUrl: null,
			nickname: '',
			phone: '',
			pet_group: '',
			pet_type: '',
			vaccines: '',
			pet_sex: '公',
			pet_weight: null,
			isSterilization: '否',
			birthday: null
		};
		return {
			formData,
			formOptions: {
				pet_type: [],
				vaccines: [],
				pet_sex_localdata: [
					{
						value: '公',
						text: '公'
					},
					{
						value: '母',
						text: '母'
					}
				],
				isSterilization_localdata: [
					{
						value: '是',
						text: '是'
					},
					{
						value: '否',
						text: '否'
					}
				]
			},
			rules: {
				...getValidator(Object.keys(formData))
			}
		};
	},
	onLoad(e) {
		if (e.id) {
			const id = e.id;
			this.formDataId = id;
			this.getDetail(id);
		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules);
	},
	methods: {
		_init(id) {
			let pet_group_id = id;
			uni.showLoading({
				mask: true
			});
			
			db.collection('pet-type')
				.where(`pet_group_id=='${pet_group_id}'`)
				.field('_id as value, title as text')
				.get()
				.then(({ result }) => {
					this.formOptions.pet_type = result.data;
				})
				.finally(() => {
					uni.hideLoading();
				});
			db.collection('vaccines')
				.where(`pet_group_id=='${pet_group_id}'`)
				.field('_id as value, title as text')
				.get()
				.then(({ result }) => {
					this.formOptions.vaccines = result.data;
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		onChange(e){
			let pet_group_id = e.detail.value
			uni.showLoading({
				mask: true
			});
			
			db.collection('pet-type')
				.where(`pet_group_id=='${pet_group_id}'`)
				.field('_id as value, title as text')
				.get()
				.then(({ result }) => {
					this.formData.pet_type = '';
					this.formOptions.pet_type = result.data;
				})
				.finally(() => {
					uni.hideLoading();
				});
			db.collection('vaccines')
				.where(`pet_group_id=='${pet_group_id}'`)
				.field('_id as value, title as text')
				.get()
				.then(({ result }) => {
					this.formData.vaccines = '';
					this.formOptions.vaccines = result.data;
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		/**
		 * 验证表单并提交
		 */
		submit() {
			uni.showLoading({
				mask: true
			});
			this.$refs.form
				.validate()
				.then(res => {
					return this.submitForm(res);
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
				});
		},

		/**
		 * 提交表单
		 */
		submitForm(value) {
			// 使用 clientDB 提交数据
			return db
				.collection(dbCollectionName)
				.doc(this.formDataId)
				.update(value)
				.then(res => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					});
					this.getOpenerEventChannel().emit('refreshData');
					setTimeout(() => uni.navigateBack(), 500);
				})
				.catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				});
		},
		remove() {
			uni.showLoading({
				mask: true
			});
			db.collection(dbCollectionName).doc(this.formDataId).remove()
			.then(res => {
				uni.navigateBack()
			}).finally(() => {
				uni.hideLoading();
			});
		},
		/**
		 * 获取表单数据
		 * @param {Object} id
		 */
		getDetail(id) {
			uni.showLoading({
				mask: true
			});
			db.collection(dbCollectionName)
				.doc(id)
				.field('avatarUrl,nickname,phone,pet_group,pet_type,vaccines,pet_sex,pet_weight,isSterilization,birthday')
				.get()
				.then(res => {
					const data = res.result.data[0];
					if (data) {
						this.formData = data;
						this._init(data.pet_group)
					}
				})
				.catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				})
				.finally(() => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style>
.uni-container {
	padding: 15px;
}

.uni-input-border,
.uni-textarea-border {
	width: 100%;
	font-size: 14px;
	color: #666;
	border: 1px #e5e5e5 solid;
	border-radius: 5px;
	box-sizing: border-box;
}

.uni-input-border {
	padding: 0 10px;
	height: 35px;
}

.uni-textarea-border {
	padding: 10px;
	height: 80px;
}

.uni-button-group {
	margin-top: 50px;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
}

.uni-button {
	width: 184px;
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 4px;
	line-height: 1;
	margin: 0;
}
</style>
