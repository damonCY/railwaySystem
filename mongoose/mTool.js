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
		console.log("tool "+JSON.stringify(schema))
		var o = new obj(schema);
		o.save(function(err,res){
			callback&&callback(err,res);
		})
	},
	find: function(obj,schema,callback){
		var sche = schema || {};
		obj.find(sche,function(err,resdata){

			callback&&callback(err,resdata);
		})
	},
	delet: function(obj,schema,callback){
		var sche = schema || {};
		obj.remove(sche,function(err,resdata){
			callback&&callback(err,resdata);
		})
	},
	update: function(obj,id,new_schema,callback){
		var news = new_schema || {};
		console.log("news "+JSON.stringify(news))
		obj.update({_id: id},news,function(err,resdata){
			callback&&callback(err,resdata);
		})

	}
}

module.exports = mTool;