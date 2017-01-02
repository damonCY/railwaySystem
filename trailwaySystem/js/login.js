tool.ready(function(){

	var phone = tool.getItem("user","phone");
	console.log("this "+phone);
	if(Number(phone)){
		$('#phone').val(phone);
	}else{
		tool.removeItem("user");
	}
	
	function getForm(){
		var phone = $('#phone').val();
		var pwd = $('#pwd').val();
		console.log(name,pwd)
		if(phone&&pwd){}else{mui.toast("请填写完整");return};
		$.ajax({
			url: tool.schema+"/login",
			type: "POST",
			data:{
				"phone": phone,
				"password": pwd
			},
			success: function(data){
				mui.toast(data);
				var item = tool.getItem("user");
				console.log('BACK '+JSON.stringify(item));
				if(data.status==0){
					mui.toast(data.data);
					return;
				}else{
					tool.setItem("user",data.data);
					console.log("login "+JSON.stringify(data.data))
					mui.toast("sucess");
					tool.open({"url":'pages/main.html'});
				}
			},
			error: function(err){
				console.log("err "+err);
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
})