tool.ready(function(){
	mui.init({
		swipeBack:true //启用右滑关闭功能, 
	});
	
	init(); //初始化显示
	tool.plusReady(function(){
		var pages = plus.webview.all();
		pages.forEach(function(value,index){
			console.log(JSON.stringify(value))
		})
	})
	$('.submit').on('tap',function(){
//		mui.prompt('你确定退出登录吗？',['true','false'],null,'div');
		mui.confirm("",'你确定退出登录吗?',['确定','再看看'],function(data){
			var index = data.index;
			if(index === 0){
				var pages = plus.webview.all();
				for (var i = 0, len = pages.length; i < len; i++) {
					plus.webview.close(pages[i]);
				}
				tool.open({"url":"../index.html"})
			}
		},'div');
	})
	$('.gender').on('tap',function(){
		showActionSheet();
	})
	$('.birthday').on('tap',function(){
		pickDate();
	})
	$('.name').on('tap',function(){
		var value = $(this).find("#name").text()|| "";
		var data = {
			"title": '修改呢称',
			"inputValue": value ,
			"type": "name"
		}
		tool.setItem("extras",data);
		tool.open({"url":"../pages/personedit.html","data":data});
	})
	$('.userType').on('tap',function(){
		userType();
	})
	//save
	$('.save').on('tap',function(){
		save();
	})
	$('.my-photo').on('tap',function(){
		gallery();
	})
function init(){
	var user = tool.getItem('user');
	console.log("this  "+JSON.stringify(user));
	$('#name').text(user["name"]);
	$("#gender").text(user["gender"]);
	$("#birthday").text(user["birthday"]);
	$("#userType").text(user["userType"]);
	$("#phone").text(user["phone"]);
	console.log(user["photo"]);
	if(user["photo"]){
		$('#photo').attr('src',user['photo']);
	}else{
		$('#photo').attr('src',"../img/logo.png");
	}
	
	
}
function showActionSheet(){

	var bts=[{title:"男"},{title:"女"}];
	plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
		function(e){
			var gender = e.index == 1? "男":"女";
			
			console.log("thisgender11 "+gender);
			$("#gender").text(gender);
			tool.setItem('user',{"gender": gender});
		}
	)
}
function save(){
	var obj = tool.getItem('user');
	console.log("total "+JSON.stringify(obj));
	$.ajax({
		url: tool.schema + "/personal/save",
		type: "POST",
		data: obj,
		success: function(data){
			if(data.ok == 1){
				mui.toast('save success');
			}
		},
		error: function(err){
			console.log("error "+err);
		}
	})
}
function userType(){
	var bts=[{title:"站台服务人员1"},{title:"站台服务人员2"},{title:"站台服务人员3"},{title:"站台服务人员4"}];
	var type = 1;
	plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
		function(e){
			type = e.index;
			console.log('type '+ type)
			if(type === 1){
				type = "站台服务人员1";
			}else if(type === 2){
				type = "站台服务人员2";
			}else if(type === 3){
				type = "站台服务人员3";
			}else{
				type = "站台服务人员4";
			}
			console.log("thisgender11 "+gender);
			$("#userType").text(type);
			tool.setItem('user',{"userType": type});
		}
	)
}
//生日
function pickDate() {
	var dDate=new Date();
	plus.nativeUI.pickDate( function(e) {
		var d=e.date;
		var birthday = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		$("#birthday").text(birthday);
		tool.setItem("user",{"birthday": birthday});
	},function(e){
		console.log( "未选择日期："+e.message );
	});
}

function gallery(){
	plus.gallery.pick( function(path){
	    	console.log("22"+path);
	    	tool.setItem('user',{"photo": path});
	    	$('.my-photo img').attr('src',path);
	    	tool.reload();
	    }, function ( e ) {
	    	console.log( "取消选择图片" );
	    }, {filter:"image"} );
	}
})
