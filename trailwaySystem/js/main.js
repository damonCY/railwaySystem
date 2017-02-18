tool.ready(function(){
	mui.init({
	    pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      height:50,//可选,默认50.触发下拉刷新拖动距离,
	      auto: false,//可选,默认false.自动下拉刷新一次
	      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      callback : function(){
	      	console.log("pushing");
	      	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
	      }
	    }
	  }
	});
	var user = tool.getItem("user")
	mui('.mui-scroll-wrapper').scroll({
	    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
		renderMain();
		$('.item-two').on('touchstart','li',function(){
			$(this).addClass('active')
		})
		
		var clear = "";
		//刷新
		$("#update").on('tap',function(){
//			$("#refresh").addClass('.fa-spin');
			clearTimeout(clear);
			clear = setTimeout(function(){
				console.log("refresh")
				renderMain();
			},300)
		})
		$('.item-one').on('touchend','li',function(){
			$(this).removeClass('active')
		});
		
		$('.tip-content').on('tap',function(){
			tool.open({url: "../pages/personal.html"});
		});
		
		$('.photo').attr('src',user.photo);
		
		$('.emergency').on('tap',function(){
			tool.open({url: "../pages/emergency.html"});
		})
//		$('body').on('swipedown',function(){
//			console.log("你正在向下滑动")
//		})
	function renderMain(){
		$.ajax({
			type:"get",
			url: tool.schema+"/noticeList",
			data:{},
			success: function(data){
//				console.log("/noticeListdata "+ JSON.stringify(data))
				var html = template('templateModel', {"data": data});
//				$("#refresh").removeClass('.fa-spin');
				document.getElementById('template').innerHTML = html;
				mui.toast("刷新成功！")
			},
			error:function(data){
				console.log("mainpage error "+data);
			}
		})
		
	}
	
	
	
	
	
	
})