var theWindow = $(window);
var $bg = $("body .main-bg-image");
var aspectRatio = $bg.width() / $bg.height();
var notifyTimer;

$(document).ready(function () {

	$().UItoTop({
		easingType: 'easeOutQuart'
	});

<<<<<<< .mine

	setupBGImage();

	notifyTimer = setInterval("addNotification()", 200)

});

$(window).resize(function(){
	setupBGImage();
});

function setupBGImage(){

	var newCenter = (theWindow.width() / 2) - ($bg.width() / 2);
	if (newCenter > 0){
		newCenter = 0;
	}
	console.log("New Center is: "+newCenter);
	if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		$bg.removeClass('bgwidth').addClass('bgheight');
		$bg.css('left', newCenter);
		console.log("New BG Left: "+$bg.offset().left);

	} else {
		$bg.removeClass('bgheight').addClass('bgwidth');
		$bg.css('left', newCenter);
		console.log("New BG Left: "+$bg.offset().left);
	}
}

function addNotification(){
	var notifyValue = Number($(".notify-circle").text());
	var newNotifyValue = notifyValue + 1;
	if (newNotifyValue >= 100){
		newNotifyValue = 1;
		clearInterval(notifyTimer);
	}
	$(".notify-circle").text(newNotifyValue);
}=======

	setupBGImage();

	//notifyTimer = setInterval("addNotification()", 200)

	setTimeout("fadeIn()", 500);

});

$(window).resize(function(){
	setupBGImage();
});

function fadeIn(){
	$(".fade").each(function(){
		$(this).addClass("in");
	});
}

function setupBGImage(){

	var newCenter = (theWindow.width() / 2) - ($bg.width() / 2);
	if (newCenter > 0){
		newCenter = 0;
	}
	//console.log("New Center is: "+newCenter);
	if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		$bg.removeClass('bgwidth').addClass('bgheight');
		$bg.css('left', newCenter);
		//console.log("New BG Left: "+$bg.offset().left);

	} else {
		$bg.removeClass('bgheight').addClass('bgwidth');
		$bg.css('left', newCenter);
		//console.log("New BG Left: "+$bg.offset().left);
	}
}

function addNotification(){
	var notifyValue = Number($(".notify-circle").text());
	var newNotifyValue = notifyValue + 1;
	if (newNotifyValue >= 100){
		newNotifyValue = 1;
		clearInterval(notifyTimer);
	}
	$(".notify-circle").text(newNotifyValue);
}>>>>>>> .r22
