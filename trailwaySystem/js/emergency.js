tool.ready(function(){
	var user = tool.getItem('user');
	var params = {
		name: user.name,
		userType: user.userType,
		phone: user.phone,
		role: user.role,
		id: user.id
	};//上传参数
	
	//获取一个创建id
	tool.getEtag(function(data){
		console.log("newetag "+data.data.etag);
		params.etag = data.data.etag;
	})
	
	$('.save').on('tap',function(){
		console.log("save")
		uploadNotice(params);
	})
	$('#positions').one('tap',function(){
		positions();
	})
	$('#train').one('tap',function(){
		trainNumber();
	})
	$('#reason').one('tap',function(){
		reason();
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
				console.log("ajax "+JSON.stringify(data))
				if(data.status == 1){
					mui.toast("上报成功");
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
		var bts=[{title:"岗厦上行线1"},{title:"岗厦上行线2"},{title:"岗厦上行线3"},{title:"岗厦上行线4"},{title:"岗厦上行线5"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var cases = "position"+e.index;
				var positions = thisCase(cases);
				console.log("positions "+positions);
				$("#positions").removeAttr('readonly').val(positions);
			}
		)
	}
	
	function trainNumber(){
		var bts=[{title:"车次1"},{title:"车次2"},{title:"车次3"},{title:"车次4"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var cases = "train"+e.index;
				var train = thisCase(cases);
				console.log("train "+train);
				$("#train").removeAttr('readonly').val(train);
			}
		)
	}
	
	function reason(){
		var bts=[{title:"故障原因1"},{title:"故障原因2"},{title:"故障原因3"},{title:"故障原因4"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var cases = "reason"+e.index;
				var reason = thisCase(cases);
				console.log("reason "+reason);
				$("#reason").removeAttr('readonly').val(reason);
			}
		)
	}
	function thisCase(type){
		var value = '';
		switch(type){ 
			case "position1":
			  	value = "岗厦上行线1"
			    break;
			case "position2":
			  	value = "岗厦上行线2"
			    break;
			case "position3":
			  	value = "岗厦上行线3"
			    break;
			case "position4":
			  	value = "岗厦上行线4"
			    break;
			case "train1":
			  	value = "车次号1"
			    break;
			case "train2":
			  	value = "车次号2"
			    break;
			case "train3":
			  	value = "车次号3"
			    break;
			case "train4":
			  	value = "车次号4"
			    break;
			case "reason1":
			  	value = "故障1"
			    break;
			case "reason2":
			  	value = "故障2"
			    break;
			case "reason3":
			  	value = "故障3"
			    break;
			case "reason4":
			  	value = "故障4"
			    break;
			default:
			    value = "";
			    break;
			}
		return value;
	}
})