var schemas = require('../mongoose/schema.js');
var mTool = require('../mongoose/mTool.js');


// mTool.insert(User,{
//     name : "damon",                 
//     password: "1",
//     userType: "youke"
// });
// mTool.find(User,{},function(err,data){
// 	res.send(data);
// })
// mTool.delet(User,{"name":"damon"},function(err,data){
// 	res.send("delet ok"+data);
// })
// mTool.update(User,'585b755cdff0de27b417bfcf',{"name":"sun4343"},function(err,data){
// 	res.send(data);
// })

module.exports = function(app){
	//login
	app.get("/",function(req,res){
		res.send("ok");
	})
	
	app.post('/register',function(req,res){

		var phone = req.body.phone;
		var password = req.body.password;
		console.log("pass "+password);
		mTool.find(schemas.personal,{"phone": phone},function(err,data){
			console.log("find "+data)
			if(data.length>0){
				res.send({"status": "0","data": "已经被注册了，请选择其他账号"});
				return ;
			}
			console.log("pass2 "+password)
			mTool.insert(schemas.personal,{
			    "phone": phone,                 
			    "password": password,
			    "id": (new Date()).valueOf(),
			},function(err,data){
				if(err){
					res.send(err)
				}else{
					console.log("databack "+ data);
					res.send({"status": "1","data": data});
				}
			});
		})
	})

	app.post('/login',function(req,res){
		var phone = req.body.phone;
		var password = req.body.password;
		console.log(phone,password);
		mTool.find(schemas.personal,{"phone": phone},function(err,data){
			var data = data[0];
			console.log("from-----login---"+data)
			if(!data){
				res.send({"status": "0","data": "账号输入有误"});
				return;
			}else{
				if(data.password!=password){
					res.send({"status": "0","data": "密码输入错误"});
					return;
				}else{
					res.send({"status": "1","data": data});
				}
			}
		})

	})
	app.post('/personal/save',function(req,res){
		
		var obj = {};
		var id = req.body.id;
		for(var key in req.body){
			obj[key] = req.body[key];
		}
		console.log("obj "+JSON.stringify(obj));

		mTool.update(schemas.personal,{"id": id},{$set: obj},function(err,data){
			if(err){
				console.log("something wrong"+err);
			}else{
				console.log('updata '+JSON.stringify(data));
				res.send(data);
			}
		})
	});

	//上传故障
	app.post('/notice/upload',function(req,res){
		var obj = {};
		var type = req.body.type;
		var trainNumber = req.body.trainNumber;
		var detail = req.body.detail ||"";
		console.log("11"+JSON.stringify(req.body));
		for(var key in req.body){
			obj[key] = req.body[key];
		}
		mTool.find(schemas.noticeList,{"trainNumber": trainNumber},function(err,data){//查询存在
			var data = data[0] || {};
			console.log('typeof ---'+  mTool.isEmptyObject(data));
			 if(mTool.isEmptyObject(data)){
				mTool.insert(schemas.noticeList,obj, //不存在就添加
					function(err,data){
					if(err){
						res.send(err)
					}else{
						res.send({"status": 1,"data": data});
					}
				});
			}else{
				if(detail===""){
					res.send({"status": 1,"data": []});
					return
				}
				console.log(JSON.stringify(obj["methods"]))
				schemas.noticeList.update({"trainNumber": trainNumber},{
					$push: {"solvingList": obj["methods"]}
				},function(err,data){
					if(err){
						res.send(err)
					}else{
						res.send({"status": 1,"data": data})
					}
				})
			}
			
		})
		
	})
	//创建etag标志
	app.get('/getEtag',function(req,res){
		var etag = (new Date()).valueOf();
		console.log("sendetag "+etag);
		res.send({"status": "1","data": {"etag": etag}});
	});

	//mainPage列表
	app.get("/noticeList",function(req,res){
		mTool.find(schemas.noticeList,{},function(err,data){
			if(err){
				console.log("/noticeList error"+ err)
			}else{
				res.send(data);
			}
		})
	})

	//solving 操作记录
	app.post("/solvingList", function(req,res){
		var body = req.body;
		var obj = {};
			obj.etag = body.etag;
			obj.phone = body.phone;
			obj.id = body.id;
			obj.time =body.time;
			obj.name = body.name;
			obj.positions = body.positions;
			obj.reason = body.reason;
			obj.trainNumber = body.trainNumber;
			obj.userType = body.userType;
			obj.solvingList = JSON.parse(body.solvingList);
		mTool.insert(schemas.solvingList,obj, 
			function(err,data){
				console.log('insert')
			if(err){
				res.send(err)
			}else{
				res.send({"status": 1,"data": data});
			}
		});
	})

	//历史记录
	app.post("/historyList",function(req,res){
		var body = req.body;
		var query = {};
		if(body.id){
			query.id = body.id;
			console.log("get---"+body.id)
		}

		mTool.find(schemas.noticeList,query,function(err,data){
			if(err){
				console.log("/noticeList error"+ err)
			}else{
				res.send({list: data,status: "1"});
			}
		})
	})

	//历史记录详情查看
	app.post("/historyList",function(req,res){
		var id = req.body.id;
		mTool.find(schemas.noticeList,{"id": id},function(err,data){
			if(err){
				console.log("/noticeList error"+ err)
			}else{
				res.send({list: data,status: "success"});
			}
		})
	})

	//历史纪录查询
	app.post('/historyQuery',function(req,res){
		var body = req.body;
		var query = {};
			var dayTime = parseInt(body.time) + 86400000; //一天
			if(body.name){
				query.name = body.name;
			}
			if(body.time){
				query.time = {$gt: parseInt(body.time),$lt: dayTime};
			}

			if(body.profession){
				query.userType = body.profession;
			}
			if(body.phone){
				query.phone = body.phone;
			}
			console.log("/historyQuery----"+JSON.stringify(query))
			mTool.find(schemas.noticeList,{},function(err,data){
				if(err){
					console.log("/historyQuery error"+err)
				}else{
					res.send({list: data,status: "1"})
				}
			})
	})

	//删除数据
	app.post('/delet',function(req,res){
		var body = req.body;
		var type = body.type;
		mTool.delet(schemas[type],{},function(err,data) {
			if(err){
				console.log("/noticeList error"+ err)
			}else{
				res.send({list: data,status: 1});
			}
		})
	})

	//实时消息
	app.post('/sendInfo',function(req,res){
		var body = req.body;
		var obj = {};
			obj.trainNumber = body.trainNumber;
			obj.recordsList = body.sendInfo;
			console.log(JSON.stringify(body))

		mTool.find(schemas.recordsList,{"trainNumber": obj.trainNumber},function(err,data){//查询存在
			var data = data[0] || {};
			 if(mTool.isEmptyObject(data)){
				mTool.insert(schemas.recordsList,obj, //不存在就添加
					function(err,data){
					if(err){
						res.send(err)
					}else{
						res.send({"status": 1,"data": data});
					}
				});
			}else{

				schemas.recordsList.update({"trainNumber": obj.trainNumber},{
					$push: {"recordsList": obj.recordsList}
				},function(err,data){
					if(err){
						res.send(err)
					}else{
						res.send({"status": 1,"data": data})
					}
				})
			}
			
		})

	})

	//查看即时消息

	app.post('/showRecords',function(req,res){
		var body = req.body;
		console.log("/showRecords--"+JSON.stringify(body))
		mTool.find(schemas.recordsList,{trainNumber: body.trainNumber},function(err,data){
			if(err){
				console.log("/recordsList error"+err)
			}else{
				res.send({list: data,status: "success"})
			}
		})
	})
}
