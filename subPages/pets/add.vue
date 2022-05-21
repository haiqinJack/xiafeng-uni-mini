<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="avatarUrl" label="宠物头像">
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatarUrl"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="nickname" label="宠物昵称" required>
        <uni-easyinput v-model="formData.nickname" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="phone" label="联系方式" required>
        <uni-easyinput v-model="formData.phone" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pet_group" label="宠物种类" required>
        <uni-data-checkbox v-model="formData.pet_group" collection="pet-group" field="_id as value, title as text" trim="both"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pet_type" label="宠物品种" required>
        <uni-data-checkbox v-model="formData.pet_type" collection="pet-type" field="_id as value, title as text" trim="both"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pet_sex" label="性别" required>
        <uni-data-checkbox v-model="formData.pet_sex" :localdata="formOptions.pet_sex_localdata" trim="both"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pet_weight" label="体重(kg)" required>
        <uni-easyinput type="number" v-model="formData.pet_weight"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="isSterilization" label="是否绝育" required>
        <uni-data-checkbox v-model="formData.isSterilization" :localdata="formOptions.isSterilization_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="birthday" label="出生年月">
        <uni-datetime-picker return-type="date" v-model="formData.birthday"></uni-datetime-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/pets.js';

  const db = uniCloud.database();
  const dbCollectionName = 'pets';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  export default {
    data() {
      let formData = {
        "avatarUrl": null,
        "nickname": "",
        "phone": "",
        "pet_group": "",
        "pet_type": "",
        "pet_sex": "",
        "pet_weight": null,
        "isSterilization": 0,
        "birthday": null
      }
      return {
        formData,
        formOptions: {
          "pet_sex_localdata": [
            {
              "value": "公",
              "text": "公"
            },
            {
              "value": "母",
              "text": "母"
            }
          ],
          "isSterilization_localdata": [
            {
              "value": "1",
              "text": "是"
            },
            {
              "value": "0",
              "text": "否"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
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
