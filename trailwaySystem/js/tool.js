var tool = {
	ready: function(callback){
		if(window.plus){
			mui.plusReady(function(){
				callback&&callback();
			})
		}else{
			(function($,document){
				callback&&callback($,document);
			})(mui,document)
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
		return mui.openWindow({"url": params.url,"id":params.url,"extras": params.data,
//			show:{
//		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
//		      aniShow:animationType,//页面显示动画，默认为”slide-in-right“；
//		      duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
//		    },
		});
	},
	schema: "http://sun4343lee.imwork.net",
}
