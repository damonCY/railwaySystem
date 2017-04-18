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
//					alert(params.userType)
					if(params.userType=="主线司机台行调"){
						tool.open({url: "./solving.html",extras:{"etag": etag,"positions":params.positions,"trainNumber": params.trainNumber,"reason":params.reason}})	
					}else if(params.userType=="主线车站台行调"){
						tool.open({url: "./solvingStation.html",extras:{"etag": etag,"positions":params.positions,"trainNumber": params.trainNumber,"reason":params.reason}})	
						
					}else if(params.userType=="辅线"){
						tool.open({url: "./solvingauxiliary.html",extras:{"etag": etag,"positions":params.positions,"trainNumber": params.trainNumber,"reason":params.reason}})	
						
					}

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

	
	function reason(){
		var bts=[{title:"列车失电"},{title:"列车轮对固死"},{title:"车辆屏无故障显示"},{title:"发出报警声"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var index = e.index -1;
				$("#reason").removeAttr('readonly').val(bts[index]['title']);
			}
		)
	}
	
	var pages = plus.webview.all();
	for (var i = 0, len = pages.length; i < len; i++) {
		if(pages[i]["id"].indexOf("five")>0){
			pages[i].close(); //关闭缓存数据
		}
	}
	
})