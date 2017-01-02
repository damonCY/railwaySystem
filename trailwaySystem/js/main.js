tool.ready(function(){
	$('.item-two').on('touchstart','li',function(){
		$(this).addClass('active')
	})
	$('.item-one').on('touchend','li',function(){
		$(this).removeClass('active')
	});
	$('.tip-content').on('tap',function(){
		tool.open({url: "../pages/personal.html"});
	})
	
})