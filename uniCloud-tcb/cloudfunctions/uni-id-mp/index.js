'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {}
	let params = event.params || {}
	const { code } = params
	let payload = {}
	let noCheckAction = ['loginByAlipay', 'loginByWeixin']
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
			  code
			});
		break;
		
		case 'loginByWeixin': 
			res = await uniID.loginByWeixin({
			  code
			});
		break;
		
	}
	
	//返回数据给客户端
	return res
};
