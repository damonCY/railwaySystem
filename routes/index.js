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
		console.log("pass "+password)
		mTool.find(schemas.personal,{"phone": phone},function(err,data){
			console.log("find "+data)
			if(data.length>0){
				res.send({"status": "0","data": "已经被注册了，请选择其他账号"});
				return ;
			}
			console.log("pass2 "+password)
			mTool.insert(schemas.personal,{
			    "phone": phone,                 
			    "password": password
			},function(err,data){
				if(err){
					res.send(err)
				}else{
					console.log("databack "+ data);
					console.log(data.phone,data.password,data._id);
					res.send({"status": "1","data": data});
				}
			});
		})
	})

	app.post('/login',function(req,res){

		var phone = req.body.phone;
		var password = req.body.password;
		// console.log(phone,password);
		mTool.find(schemas.personal,{"phone": phone},function(err,data){
			var data = data[0];
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
		mTool.update(schemas.personal,{"_id": id},{$set: obj},function(err,data){
			console.log('updata '+JSON.stringify(data));
			res.send(data);
		})
	})

}
