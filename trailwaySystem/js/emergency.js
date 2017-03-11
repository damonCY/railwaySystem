tool.ready(function(){
	var user = tool.getItem('user');
	var params = {
		name: user.name,
		userType: user.userType,
		phone: user.phone,
		role: user.role,
		id: user.id,
		etag: "123"
	};//上传参数
	
	//获取一个创建id
	tool.getEtag(function(data){
//		console.log("newetag "+data.data.etag);
		params.etag = data.data.etag;
	})
	
	$('#form').on('tap',function(){
		uploadNotice(params);
	})
	$('#positions').one('tap',function(){
		positions();
	})
//	$('#train').one('tap',function(){
//		trainNumber();
//	})
	$('#reason').one('tap',function(){
		reason();
	})
	$('#cancel').on('tap',function(){
		var currentPage = plus.webview.currentWebview();
		currentPage.reload();
		mui.toast("已重置")
		
	})
	function uploadNotice(params){
		params.positions = $("#positions").val().trim();
		params.trainNumber = $("#train").val().trim();
		params.reason = $("#reason").val().trim();
		if(params.positions&&params.trainNumber&&params.reason){}else{
			mui.toast("请填写完整再上传");return;
		}
		params.time = tool.getTime();
		console.log("send  "+JSON.stringify(params));
		$.ajax({
			url: tool.schema + "/notice/upload",
			type:"POST",
			data: params,
			success: function(data){
//				console.log("ajax "+JSON.stringify(data))
				if(data.status == 1){
					mui.toast("上报成功");
					var etag = params.etag;
					tool.open({url: "./solving.html",extras:{"etag": etag,"positions":params.positions,"trainNumber": params.trainNumber,"reason":params.reason}})
				}else{
					mui.toast("上报失败，请重新上报");
				}
			},
			error: function(data){
				console.log("this error "+ JSON.stringify(data));
			}
		});
	}
	
	function positions(){
		var bts=[{title:"岗厦下行线"},{title:"竹子林下行线"},{title:"前海湾下行线"},{title:"会展中心上行线"},{title:"岗厦上行线"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var index = e.index -1;
				$("#positions").removeAttr('readonly').val(bts[index]['title']);
			}
		)
	}
	
//	function trainNumber(){
//		var bts=[{title:"车次1"},{title:"车次2"},{title:"车次3"},{title:"车次4"}];
//		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
//			function(e){
//				var index = e.index -1;
//				$("#train").removeAttr('readonly').val(bts[index]['title']);
//			}
//		)
//	}
	
	function reason(){
		var bts=[{title:"列车失电"},{title:"列车轮对固死"},{title:"车辆屏无故障显示"},{title:"发出报警声"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var index = e.index -1;
				$("#reason").removeAttr('readonly').val(bts[index]['title']);
			}
		)
	}
	
})