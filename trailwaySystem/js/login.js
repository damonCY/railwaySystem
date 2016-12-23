$(function(){
	
	function getForm(){
		var name = $('#name').val();
		var pwd = $('#pwd').val();
		if(name&&pwd){}else{mui.toast("请填写完整");return};
		var schema = "http://127.0.0.1:3000"
		$.ajax({
			url: schema+"/login",
			type: "POST",
			data:{
				"name": name,
				"password": pwd
			},
			success: function(data){
				if(data.status==0){
					mui.toast(data.data);
					return;
				}else{
					tool.setItem("app",data.data);
					mui.toast("sucess");
					tool.open({"url":'pages/main.html'});
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