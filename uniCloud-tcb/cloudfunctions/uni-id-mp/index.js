'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {}
	let params = event.params || {}
	let payload = {}
	let noCheckAction = ['loginByAlipay', 'loginByWeixin', 'wxBizDataCrypt', 'checkToken', 'loginByUniverify', 'bindMobileByMpWeixin']
	// if (!noCheckAction.includes(event.action)) {
	//   // if (!event.uniIdToken) {
	//   //   return {
	//   //     code: 403,
	//   //     msg: '缺少token'
	//   //   }
	//   // }
	//   payload = await uniID.checkToken(event.uniIdToken, {
	//     needPermission: true
	//   })
	//   console.log(payload, 'payload')
	//   if (payload.code && payload.code > 0) {
	//     return payload
	//   }
	//   params.uid = payload.uid
	// }
	switch (event.action) {
		case 'loginByAlipay': 
			res = await uniID.loginByAlipay({
			  code: params.code
			});
		break;
		
		case 'loginByWeixin': 
			res = await uniID.loginByWeixin({
			  code: params.code
			});
		break;
		
		case 'bindMobileByMpWeixin': 
			payload = await uniID.checkToken(event.uniIdToken)
			if(payload.userInfo.mobile) {
				res = payload
			}else {
				res = await uniID.wxBizDataCrypt({
					encryptedData: params.encryptedData,
					iv: params.iv,
					sessionKey: params.sessionKey
				})
				if(res.code) return res
				res = await uniID.bindMobile({
					uid: payload.uid,
					mobile: res.purePhoneNumber
				})		
				if(res.code) return res
			}
		break;
	}
	
	//返回数据给客户端
	return res
};
