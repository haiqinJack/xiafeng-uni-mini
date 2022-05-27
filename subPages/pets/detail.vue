<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" 
	collection="pets,pet-group,pet-type,vaccines" 
	field="avatarUrl,nickname,phone,pet_group{title as text},pet_type{title as text},vaccines{title as text},pet_sex,pet_weight,isSterilization,birthday" 
	:where="queryWhere" 
	:getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>宠物头像</text>
          <uni-file-picker v-if="data.avatarUrl && data.avatarUrl.fileType == 'image'" :value="data.avatarUrl" :file-mediatype="data.avatarUrl && data.avatarUrl.fileType" return-type="object" readonly></uni-file-picker>
          <uni-link v-else-if="data.avatarUrl" :href="data.avatarUrl.url" :text="data.avatarUrl.url"></uni-link>
          <text v-else></text>
        </view>
        <view>
          <text>宠物昵称</text>
          <text>{{data.nickname}}</text>
        </view>
        <view>
          <text>联系方式</text>
          <text>{{data.phone}}</text>
        </view>
        <view>
          <text>宠物种类</text>
          <text>{{data.pet_group && data.pet_group[0] && data.pet_group[0].title}}</text>
        </view>
        <view>
          <text>宠物品种</text>
          <text>{{data.pet_type && data.pet_type[0] && data.pet_type[0].title}}</text>
        </view>
        <view>
          <text>疫苗情况</text>
          <text>{{data.vaccines && data.vaccines[0] && data.vaccines[0].title}}</text>
        </view>
        <view>
          <text>性别</text>
          <text>{{options.pet_sex_valuetotext[data.pet_sex]}}</text>
        </view>
        <view>
          <text>体重(kg)</text>
          <text>{{data.pet_weight}}</text>
        </view>
        <view>
          <text>是否绝育</text>
          <text>{{options.isSterilization_valuetotext[data.isSterilization]}}</text>
        </view>
        <view>
          <text>出生年月</text>
          <text>{{data.birthday}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/pets.js';

  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
