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

		var name = req.body.name;
		var userType = req.body.userType;
		var password = req.body.password;
		mTool.find(schemas.user,{"name": name},function(err,data){
			console.log("find "+data)
			if(data.length>0){
				res.send({"status": "0","data": "已经被注册了，请选择其他账号"});
				return ;
			}
			mTool.insert(schemas.user,{
			    "name": name,                 
			    "password": password,
			    "userType": userType
			},function(err,data){
				if(err){
					res.send(err)
				}else{
					res.send({"status": "1","data": data});
				}
			});
		})
	})

	app.post('/login',function(req,res){

		var name = req.body.name;
		var password = req.body.password;
		console.log(name,password);
		mTool.find(schemas.user,{"name": name},function(err,data){
			var data = data[0];
			console.log("112 "+ typeof(data))
			console.log("data122"+data)
			if(data.length==0){
				res.send({"status": "0","data": "账号输入有误"});
				return;
			}else{
				if(data.password!=password){
					res.send({"status": "0","data": "密码输入错误"});
					return;
				}else{
					res.send({"status": "1","data": {"name": data.name,"userType": data.userType,"id": data._id}});
				}
			}
		})

	})

}
