tool.ready(function(){
	var user = tool.getItem("user")
	
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
	
	function renderMain(){
		$.ajax({
			type:"get",
			url: tool.schema+"/noticeList",
			data:{},
			success: function(data){
				console.log("/noticeListdata "+ JSON.stringify(data))
				var html = template('templateModel', {"data": data});
//				$("#refresh").removeClass('.fa-spin');
				document.getElementById('template').innerHTML = html;
			},
			error:function(data){
				console.log("mainpage error "+data);
			}
		})
		
	}
	
	
	
	
	
	
})