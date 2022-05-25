'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	console.log('create : ', event)
	//event为客户端上传的参数
	event.status = "预约中"
	event._updateTime = new Date().getTime()
	// db.collection('appointment-user').add(event)
	
	//返回数据给客户端
	return event
};
