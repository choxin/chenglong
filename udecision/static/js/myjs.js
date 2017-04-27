// JavaScript Document
/**
$.extend({ 
includePath: '', 
include: function(file) { 
var files = typeof file == "string" ? [file]:file; 
for (var i = 0; i < files.length; i++) { 
var name = files[i].replace(/^\s|\s$/g, ""); 
var att = name.split('.'); 
var ext = att[att.length - 1].toLowerCase(); 
var isCSS = ext == "css"; 
var tag = isCSS ? "link" : "script"; 
var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' "; 
var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'"; 
if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">"); 
} 
} 
}); 
$.includePath = '/images/reveal/'; 
$.include(['reveal.css', 'jquery.reveal.js']); 

$(function(){
	var my = document.createElement("div");  
document.body.appendChild(my);
my.innerHTML="<div id='myModal' class='reveal-modal'><h1>温馨提示</h1><p>本城市未被授权开设瑞思学科英语学校，请选择其他城市就读。</p><a class='close-reveal-modal'>&#215;</a></div>"; 
	})
	**/
//大事件
$(function(){
	// var flag=true;
		$(".rydt li").bind("click",function(){
			if($(this).hasClass("current")){
				$(this).removeClass("current");
			}else{
				$(".rydt li").removeClass("current");
				$(this).toggleClass("current");
			}
		// if(flag)
		// {
		// 	$(".on").html("收起");
		// 	flag=false;
		// }
		// else
		// {
		// 	$(".on").html("展开");	
		// 	flag=true;
		// }
		});

})

$(function(){
   $.get('/plus/getArea/getInfo.php',{param:'shequhuodong'},function(res){
       $('#shequhuodong').html(res);
   });
})

//头部城市选择
$(function(){
	var $tab_a = $('.cityTitle a');
	$tab_a.hover(function() {
		$(this).addClass('current').siblings().removeClass('current');
		var index = $tab_a.index(this);
		$('.cityItem > ul').eq(index).show().siblings().hide();
	});
	$("#branch").bind("click",function(event){
		$('.cityArea').toggle();
		$(document).one("click", function () {
			$(".cityArea").toggle();
		});
		event.stopPropagation();
	  });
	$('#close').click(function(event){
		$('.cityArea').toggle();
		$(document).one("click", function () {
			$(".cityArea").toggle();
		});
		event.stopPropagation();
	});
})


$(function(){
var navH = $(".navigation").offset().top;
// var s = 80;
// var formH = $("#main_form").offset().top-s;

$(window).scroll(function(){
	var scroH = $(this).scrollTop();
	if(scroH>=navH){
		$(".navigation").css({"position":"fixed","top":0,"left":0,"z-index":999,"width":"100%"});
	}else if(scroH<navH){
		$(".navigation").css({"position":"relative"});
		// $(".navigation").css({});
	}

	// if(scroH>=formH){
	// 	$("#main_form").css({"position":"fixed","top":s,"z-index":999,"width":"100%"});
	// }else if(scroH<formH){
	// 	$("#main_form").removeAttr('style');
	// 	// $(".navigation").css({});
	// }
	//console.log(scroH==navH);
})
})

function switch_city(city_id,url){
	var urlParameter = decodeURI(window.location.search);//中文参数以解码?开头
	var strCooki = $.cookie('Parameter');
		if(!strCooki){
			$.cookie('Parameter',urlParameter);
		}
	strCooki = $.cookie('Parameter');		
	var urlCity = strCooki.replace("?","&");	// &号开头
		
	document.cookie = "risecenter_ts_city_id=0;expires="+(new Date(0)).toGMTString()+';path=/';
	document.cookie = "risecenter_ts_city=0;expires="+(new Date(0)).toGMTString()+';path=/';
	document.cookie = "risecenter_ts_city_phone=0;expires="+(new Date(0)).toGMTString()+';path=/';
	document.cookie = "risecenter_ts_city_pinyin=0;expires="+(new Date(0)).toGMTString()+';path=/';
	$.get('/plus/getArea/getLocations.php',{city_id:city_id},function(res){
		var jsondata = $.parseJSON(res);
		document.cookie = "risecenter_ts_city_id="+jsondata.city_id+';path=/';
		document.cookie = "risecenter_ts_city="+encodeURI(jsondata.city)+';path=/';
		document.cookie = "risecenter_ts_city_phone="+jsondata.school_tel+';path=/';
		document.cookie = "risecenter_ts_city_pinyin="+jsondata.pinyin+';path=/';
		
  		document.cookie = "risecenter_index_reloaded=0;expires="+(new Date(0)).toGMTString()+';path=/';
  		document.cookie = "risecenter_fenxiao_reloaded=0;expires="+(new Date(0)).toGMTString()+';path=/';
  		document.cookie = "risecenter_activity_reloaded=0;expires="+(new Date(0)).toGMTString()+';path=/';
		// if(!useurl){
		// 	location.href = url+'index.html?school_city_id='+city_id;
		// }else{
		//	location.href = url;
		// }
		if(!urlCity){
			location.href = url;
		}else{
			location.href = url+urlCity;
		}
		
	});
}

var param1 = 'school_city_id';
var reg1 = new RegExp("(^|&)" + param1 + "=([^&]*)(&|$)", "i");
var r1 = window.location.search.substr(1).match(reg1);
if(r1 != null){ 
	var risecenter_index_reloaded_reg = new RegExp("(^| )risecenter_index_reloaded=([^;]*)(;|$)"); 
	var risecenter_index_reloaded_arr = document.cookie.match(risecenter_index_reloaded_reg);
	if(risecenter_index_reloaded_arr && risecenter_index_reloaded_arr[2]==1){
		// alert(risecenter_index_reloaded_arr[2]);
	}else{
		document.cookie = "risecenter_index_reloaded=1;path=/";
		location.reload();
	}
}

var param2 = 'a';
var reg2 = new RegExp("(^|&)" + param2 + "=([^&]*)(&|$)", "i");
var r2 = window.location.search.substr(1).match(reg2);
if(r2 != null){ 
	var risecenter_fenxiao_reloaded_reg = new RegExp("(^| )risecenter_fenxiao_reloaded=([^;]*)(;|$)"); 
	var risecenter_fenxiao_reloaded_arr = document.cookie.match(risecenter_fenxiao_reloaded_reg);
	if(risecenter_fenxiao_reloaded_arr && risecenter_fenxiao_reloaded_arr[2]==1){
		// alert(risecenter_fenxiao_reloaded_arr[2]);
	}else{
		document.cookie = "risecenter_fenxiao_reloaded=1;path=/";
		location.reload();
	}
}

//判断活动页面是否需要刷新
if(window.location.href.indexOf('/activity/')>0){
	var risecenter_activity_reloaded_reg = new RegExp("(^| )risecenter_activity_reloaded=([^;]*)(;|$)"); 
	var risecenter_activity_reloaded_arr = document.cookie.match(risecenter_activity_reloaded_reg);
	if(risecenter_activity_reloaded_arr && risecenter_activity_reloaded_arr[2]==1){
		// alert(risecenter_activity_reloaded_arr[2]);
	}else{
		document.cookie = "risecenter_activity_reloaded=1;path=/";
		location.reload();
	}
}




