$(function(){
	function getForm(){
		var name = $('#name').val();
		var userType = $('#usertype').val();
		var pwd = $('#pwd').val();
		if(name&&userType&&pwd){}else{mui.toast("请填写完整");return};
		var schema = "http://127.0.0.1:3000"
		$.ajax({
			url: schema+"/register",
			type: "POST",
			data:{
				"name": name,
				"password": pwd,
				"userType": userType
			},
			success: function(data){
				if(data.status==0){
					mui.toast("此账号已被注册，请选择其他账号");return;
				}else{
					mui.toast("注册成功");
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
