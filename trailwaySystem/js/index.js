	tool.plusReady(function(){
//		user = {
//		    "_id": "5878b27aebd3ce74c4f58077",
//		    "phone": 123,
//		    "password": "11",
//		    "id": "1484305018808",
//		    "__v": 0,
//		    "name": "damon12311",
//		    "gender": "女",
//		    "birthday": "2017-2-18",
//		    "userType": "站台服务人员2",
//		    "photo": "file:///storage/emulated/0/tencent/MicroMsg/WeiXin/wx_camera_1487182195698.jpg"
//		}
		var user = tool.getItem("user");
			if(!user.password){
				tool.open({url:"./pages/login.html"});
				return;
			}
		init(user);
		function init(user){
			$('#userName').text(user.name);
			$('#userType').text(user.userType);
			$('#photo').attr('src',user.photo);
		}
		window.addEventListener("refreshPhoto",function(e){
			var path = e.detail.data;
			$('#photo').attr('src',path);
		});
		window.addEventListener('refreshName',function(e){
			var data = JSON.parse(e.detail.data);
			$('#userName').text(data.name);
			$('#userType').text(data.userType);
		})
		$('.list_title').on('click',function(){
			var this_ = $(this);
			var type = this_.attr("data-type") ||"";
			var user = tool.getItem("user");
			if(user.userType==="管理层"&& type==="emergency"){ //权限设置
				mui.toast("管理层没有“应急处置”权限");
				return
			}
			if(this_.hasClass('active_txt')){
				this_.removeClass('active_txt')
			}else{
				this_.addClass('active_txt')
			}
			$(this).next('.item_content').toggle();
		})
		$('.list_content').on('click','.item',function(){
			var url = $(this).attr('data-url');
			tool.open({url: url});
		})
		$('.personal').on('click',function(){
			var urls = $(this).attr('data-url');
			if(urls==="./pages/emergency.html"){
				var pages = plus.webview.all();
				for (var i = 0, len = pages.length; i < len; i++) {
					if((pages[i]["id"].indexOf("solving")>0)|| pages[i]["id"].indexOf('emergency.html')>0){
						pages[i].close(); //关闭缓存数据
					}
				}
			}
			tool.open({url: urls});
		})
	})