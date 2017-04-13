tool.plusReady(function(){

	var user = tool.getItem("user");
	if(user.phone){
		$('#phone').val(user.phone);
	}
	window.addEventListener("refreshphone",function(e){
		console.log("fire")
		var phoneNumber = e.detail.data;
		console.log("this---"+phoneNumber)
		$('#phone').val(phoneNumber);
	})
//	tool.removeItem("user");//删除本地数据，重新更新
	function getForm(){
		console.log('123')
		var phone = $('#phone').val();
		var pwd = $('#pwd').val();
		if(phone&&pwd){}else{mui.toast("请填写完整");return};
		console.log("login")
		$.ajax({
			url: tool.schema+"/login",
			type: "POST",
			data:{
				"phone": phone,
				"password": pwd
			},
			success: function(data){
				if(data.status==0){
					mui.toast(data.data);
					return;
				}else{
					mui.toast("sucess");
					tool.setItem("user",data.data);
//					console.log("login "+JSON.stringify(data.data))
					var index = plus.runtime.appid;
					var index =  plus.webview.getLaunchWebview();
					index.reload();
					mui.back();
				}
			},
			error: function(err){
				console.log(33)
				mui.toast("err "+JSON.stringify(err));
			}
		})
		
	}
	var cleartime;
	$('.button').on('click',function(){
		clearTimeout(cleartime);
		var cleartime = setTimeout(function(){
			getForm();
		},500)
	})
	$('#register').on('click',function(){
		tool.open({url: "./register.html"});
	})
})