tool.plusReady(function(){

	var phone = tool.getItem("user","phone");
		$('#phone').val(phone);
	window.addEventListener("refreshphone",function(e){
		var phoneNumber = e.detail.data;
		$('#phone').val(phone);
	})
//	tool.removeItem("user");//删除本地数据，重新更新
	function getForm(){
		console.log("login")
		var phone = $('#phone').val();
		var pwd = $('#pwd').val();
		if(phone&&pwd){}else{mui.toast("请填写完整");return};
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
					var index =  plus.webview.getLaunchWebview();
					index.reload();
					mui.back();
				}
			},
			error: function(err){
				console.log("err "+JSON.stringify(err));
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