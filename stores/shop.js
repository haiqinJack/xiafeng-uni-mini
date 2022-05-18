// stores/shop.js
import { defineStore } from 'pinia';
export const useShopStore = defineStore('shop', {
	state: () => ({
		shop: uni.getStorageSync('shop') || {}
	}),
	actions: {
		setShop(shop) {
			this.shop = shop
			uni.setStorageSync('shop', shop)
		}
	}
})