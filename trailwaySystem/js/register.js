tool.ready(function(){
	function getForm(){
		var phone = $('#phone').val();
		var pwd = $('#pwd').val();
		
		if(phone&&pwd){}else{mui.toast("请填写完整");return};
		$.ajax({
			url: tool.schema+"/register",
			type: "POST",
			data:{
				"phone": phone,
				"password": pwd
			},
			success: function(data){
				if(data.status==0){
					mui.toast("此账号已被注册，请选择其他账号");return;
				}else{				
					tool.open({"url": "./login.html","data":{"phone": phone}})
					mui.toast("注册成功");
					tool.fire("./pages/login.html","refreshphone",phone);
				}
			},
			error: function(err){
				console.log("err "+err);
			}
		})
		
	}
	$('.button').on('click',function(){
		getForm()
	})
})
