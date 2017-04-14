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
		console.log("saving")
		var obj = {};
		var id = req.body.id;
		var etag = req.body.etag;
		console.log('getTag '+etag);
		for(var key in req.body){
			obj[key] = req.body[key];
		}
		mTool.find(schemas.noticeList,{"id": id},function(err,data){//查询存在
			var data = data[0] || {};
			console.log('查询是否存在etag '+ JSON.stringify(data))
			console.log('typeof ---'+  mTool.isEmptyObject(data));
			 if(mTool.isEmptyObject(data)||("etag" in data)&&etag !=data['etag']){
				mTool.insert(schemas.noticeList,obj, //不存在就添加
					function(err,data){
					if(err){
						res.send(err)
					}else{
						res.send({"status": 1,"data": data});
					}
				});
			}else{
				console.log("db obj "+JSON.stringify(obj))
				mTool.update(schemas.noticeList,{"id": id},{$set: obj},function(err,data){ //存在就更新
					if(err){
						res.send("error: "+err)
					}else{
						res.send({"status": "1","data": data});
					}
				});
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
	app.get("/historyList",function(req,res){

		mTool.find(schemas.solvingList,{},function(err,data){
			if(err){
				console.log("/noticeList error"+ err)
			}else{
				res.send({list: data,status: "success"});
			}
		})
	})

	//历史记录详情查看
	app.post("/historyList",function(req,res){
		var etag = req.body.etag;
		mTool.find(schemas.solvingList,{"etag": etag},function(err,data){
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
				query.name = name
			}
			if(body.time){
				query.time = {$gt: parseInt(body.time)};
			}

			if(body.profession){
				query.userType = body.profession;
			}
			if(body.phone){
				query.phone = body.phone;
			}
			console.log("/historyQuery----"+JSON.stringify(query))
			mTool.find(schemas.solvingList,query,function(err,data){
				if(err){
					console.log("/historyQuery error"+err)
				}else{
					res.send({list: data,status: "success"})
				}
			})
	})
}
