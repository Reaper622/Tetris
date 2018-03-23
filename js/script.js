document.onreadystatechange=function(){
	if (document.readyState == "complete") {
		$('.loading').fadeOut();
	}
}
var local = new Local();
local.start();