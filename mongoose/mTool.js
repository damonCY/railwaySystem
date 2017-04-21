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


var mTool = {
	insert:function(obj,schema,callback){
		console.log("tool-----insert ");
		var o = new obj(schema);
		o.save(function(err,res){
			callback&&callback(err,res);
		})
	},
	find: function(obj,schema,callback){
		console.log("tool-----find ");
		var sche = schema || {};
		obj.find(sche,function(err,resdata){
			callback&&callback(err,resdata);
		}).sort({_id: -1});
	},
	delet: function(obj,schema,callback){
		console.log("tool-----delet ");
		var sche = schema || {};
		obj.remove(sche,function(err,resdata){
			callback&&callback(err,resdata);
		})
	},
	update: function(obj,idobj,new_schema,callback){
		console.log("tool-----update ")
		var news = new_schema || {};
		console.log("updataId "+idobj.id);
		// console.log("news "+JSON.stringify(news))
		obj.update({"id": idobj.id},news,function(err,resdata){
			callback&&callback(err,resdata);
		})

	},
	isEmptyObject: function(obj){
		for(key in obj){
			return false;
		}
		return true;
	}
}

module.exports = mTool;