//首页海报显示
$(document).ready(function(){

	$("#poster").fadeIn();			//海报显示
	$("#mask").fadeIn();			//遮罩层显示
	$("body").css("overflow-y","hidden");	//禁止页面滚动

	//点击事件隐藏海报
	$(document).click(function(){
		$("#poster").fadeOut();			//海报隐藏
		$("#mask").fadeOut();			//遮罩层隐藏
		$("body").css("overflow-y","scroll");	//恢复页面滚动
	});
});
