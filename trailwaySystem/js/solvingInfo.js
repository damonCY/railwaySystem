mui.plusReady(function(){
		var page  = tool.openInfo();	
		var trainNumber = page.trainNumber;
		
		$('#sendInfo').on('click',function(){ //发送消息
		
		sendInfo();
	})
	showRecords()//初始化显示 即时消息
	solvingList()//初始化显示 操作记录
	function sendInfo(){
		var inputData = $('.input_info').val().trim();
		if(inputData){}else{mui.toast("请输入要发送的消息！");return};
		var sendObj = {
			sendTime: tool.getTime('',"hh:mm:s"),
			userType: page.userType,
			name: page.name,
			info: inputData
		}
		$.ajax({
			url: tool.schema +"/sendInfo",
			type: "POST",
			data: {
				trainNumber: trainNumber,
				sendInfo: JSON.stringify(sendObj)
			},
			success: function(data){
				$('.input_info').val("");
				showRecords()//更新即时消息
			},
			error: function(err){
				console.log("sendMessage err"+JSON.stringify(err));
			}
		})
		
	}
	
	function showRecords(){
		$.ajax({
			url: tool.schema + "/showRecords",
			type: "POST",
			data: {
				trainNumber: trainNumber
			},
			success: function(data){
				
				var list = data.list[0];
				var listObj = {
					recordsList:[]
				}
				if(list.recordsList.length>0){
					list.recordsList.forEach(function(value,index){
						listObj.recordsList.push(JSON.parse(value));
					})
				}else{
					return;
				}
				listObj.recordsList.reverse();
				var one = template('records',listObj);
				document.getElementById('recordsTemplate').innerHTML = (one);

			},
			error: function(){}
		})
	}
	
	function solvingList(){
		
		var obj = {
			solvingList:[]
		}
		$.ajax({
			url: tool.schema +"/historyList",
			type: "POST",
			data:{},
			success: function(data){
				console.log("solvingList---"+JSON.stringify(data));
				
				var solvingList = data.list[0].solvingList;
				if(solvingList.length>0){}else{return};
				solvingList.forEach(function(value,index){
					var item = JSON.parse(value);
					obj.solvingList.push(item);
				})
				obj.solvingList.reverse();
				var one = template('solvingList',obj);
				document.getElementById('solvingTemplate').innerHTML = (one);
			}
		})
	}
	
})