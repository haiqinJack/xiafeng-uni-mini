'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {}
	let params = event.params || {}

	let noCheckAction = ['loginByAlipay', 'loginByWeixin', 'checkToken', 'encryptPwd', 'login', 'sendSmsCode',
		'setVerifyCode', 'loginBySms', 'loginByEmail', 'code2SessionWeixin', 'code2SessionAlipay'
	]
	if (noCheckAction.indexOf(event.action) === -1) {
		console.log('进来了')
		console.log(event.uniIdToken, 'event.uniIdToken')
		if (!event.uniIdToken) {
			console.log(event.uniIdToken, '!event.uniIdToken')
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		payload = await uniID.checkToken(event.uniIdToken, {
			needPermission: true
		})
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}

	const {
		code
	} = params
	res = await uniID.loginByAlipay({
		code
	});
	//返回数据给客户端
	return res
};
