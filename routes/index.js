var User = require('../mongoose/login.js');
var mTool = require('../mongoose/mTool.js');

module.exports = function(app){
	//login
	app.get('/',function(req,res){
		
		mTool.find(User,{},function(err,data){
			res.send(data);
		})
	})

}
