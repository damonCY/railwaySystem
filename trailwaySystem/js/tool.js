var tool = {
	ready: function(callback){
		return mui.plusReady(function(){
		    callback&&callback();
		});
	},
	setItem: function(key,value){
		return localStorage.setItem(key,value);
	},
	getItem: function(key){
		return localStorage.getItem(key);
	},
	removeItem: function(){
		return localStorage.getItem(key);
	},
	clear: function(){
		return localStorage.clear();
	},
	open: function(params){
		return mui.openWindow({url: params.url,extras:{"data": params.data||""},
//			show:{
//		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
//		      aniShow:animationType,//页面显示动画，默认为”slide-in-right“；
//		      duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
//		    },
		});
	}
}
