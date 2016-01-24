$(document).ready(function(){
	var $btnCode = $("#fixed tr:eq(1)");
	var	$codeDiv = $("#code");
	$btnCode.hover(function(){
		$codeDiv.css('display',"block");
		console.log("over");
	},
	function(){
		$codeDiv.css("display","none");
		console.log("out");
	});
	console.log( $codeDiv);
});
