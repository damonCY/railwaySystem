tool.ready(function(){
	mui.init({
		swipeBack:true //启用右滑关闭功能, 
	});
	var params = {};
	init(); //初始化显示
	tool.plusReady(function(){
		var pages = plus.webview.all();
		pages.forEach(function(value,index){
			console.log(JSON.stringify(value))
		})
	})
	$('.submit').on('tap',function(){
//		mui.prompt('你确定退出登录吗？',['true','false'],null,'div');
		mui.confirm("",'你确定退出应用吗?',['确定','再看看'],function(data){
			var index = data.index;
			if(index === 0){
				tool.clear();
				var pages = plus.webview.all();
				for (var i = 0, len = pages.length; i < len; i++) {
					plus.webview.close(pages[i]);
				}
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
	window.addEventListener('refreshName',function(e){
		var newName = e.detail.data;
		$('#name').text(newName);
		tool.setItem('user',{"name": newName});
//		params["name"] = newName;
	})
function init(){
	var user = tool.getItem('user');
	console.log("this  "+JSON.stringify(user));
	$('#name').text(user["name"]);
	$("#gender").text(user["gender"]);
	$("#birthday").text(user["birthday"]);
	$("#userType").text(user["userType"]);
	$("#phone").text(user["phone"]);
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
//			params["gender"] = gender;
		}
	)
}
function save(){
	var obj = tool.getItem('user');
	$.ajax({
		url: tool.schema + "/personal/save",
		type: "POST",
		data: obj,
		success: function(data){
			if(data.ok == 1){
				var index =  plus.runtime.appid;
				var send_data = {
					name: $('#name').text() || "sun4343lee",
					userType: $('#userType').text()|| "profession"
				}
				tool.fire(index,"refreshName",JSON.stringify(send_data));
				mui.toast('save success');
			}
		},
		error: function(err){
			console.log("error "+err);
			mui.toast('保存失败');
		}
	})
}
function userType(){
	var bts=[{title:"主线司机台行调"},{title:"主线车站台行调"},{title:"辅线"},{title:"管理层"}];
	var type = 0;
	plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
		function(e){
			type = e.index-1;
			console.log("type---"+type)
			$("#userType").text(bts[type]["title"]);
			tool.setItem('user',{"userType": bts[type]['title']});
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
//		params["birthday"] = birthday;
	},function(e){
		console.log( "未选择日期："+e.message );
	});
}

function gallery(){
	plus.gallery.pick( function(path){
	    	tool.setItem('user',{"photo": path});
//	    	tool.open({"url":"../pages/photo.html","data":path});
	    	$('.my-photo img').attr('src',path);
	    	var index = plus.runtime.appid;
			tool.fire(index,"refreshPhoto",path);
	    }, function ( e ) {
	    	console.log( "取消选择图片" );
	    }, {filter:"image"} );
	}
})
