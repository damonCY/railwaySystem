$(function(){
	tool.removeItem('user');
	function getForm(){
		var phone = $('#phone').val();
		var userType = $('#usertype').val();
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
				mui.toast(data)
				if(data.status==0){
					mui.toast("此账号已被注册，请选择其他账号");return;
				}else{
					mui.toast("注册成功");
					tool.setItem("user",{"phone":phone,id:data._id});
					tool.open({"url":"./index.html","data":phone});

				}
			},
			error: function(err){
				console.log("err "+err);
			}
		})
		
	}
	var cleantime;
	$('.button').on('click',function(){
		clearTimeout(cleantime);
		var cleantime = setTimeout(function(){
			getForm();
		},500)
		
	})
})
