var tool = {
	ready: function(callback){
		if(window.plusready){
			mui.plusReady(function(){
				callback&&callback();
			})
		}else{
			mui.ready(function(){
				callback&&callback()
			})
		}
	},
	setItem: function(name,obj){
		var local = localStorage.getItem(name);
		var localObj = {};
		if(local){
			localObj = JSON.parse(local);
		}
		mui.extend(localObj,obj);
		var newObj = JSON.stringify(localObj);
		localStorage.setItem(name,newObj);
	},
	getItem: function(name,key){
		var local = localStorage.getItem(name)||"";
		var value = {};
		if(!local){
			return {};
		}
		var obj = JSON.parse(local);
		var target,value = '';
		if(key){
			value = obj[key]; 
		}else{
			value = obj;
		}
		return value;	
	},
	removeItem: function(key){
		localStorage.removeItem(key);
	},
	clear: function(){
		return localStorage.clear();
	},
	open: function(params){
		return mui.openWindow({"url": params.url,"id":params.url,"extras": {"data":params.data},
			show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
		      duration:250//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
			waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		   },
//		    styles: {
//              popGesture: 'close' // 'hide', 'close','none'
//          }
		});
	},
	schema: "http://sun4343lee.imwork.net",
	reload: function(id){
		if(id){
			var parent = plus.webview.getWebviewById(id);
			parent.reload(true);
		}else{
			console.log("opner")
			var parent = plus.webview.currentWebview().opener();
			parent.reload(true);
		}
		
	},
	plusReady: function(callback){
		document.addEventListener('plusready',function(){
			callback&&callback();
		})
	},
	getTime: function(){
		var time = new Date();
		var YY = time.getFullYear();
		var MM = time.getMonth()+1;
		var dd = time.getDate();
		var HH = time.getHours();
		var mm = time.getMinutes();
		
		return YY+"-"+MM+"-"+dd+" "+HH+":"+mm;
	},
	getEtag: function(callback){
			$.ajax({
			url: tool.schema + "/getEtag",
			type:"GET",
			data:{},
			success: function(data){
				if(data.status ==1){
					callback&&callback(data);
				}
			},
			error: function(data){
				mui.toast("创建失败");
			}
		})
	}
}
