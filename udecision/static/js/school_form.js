function checkform(obj){
	var flag = 1;
	// alert(obj.xingming.value);
	var xingming = $.trim($('#xingming').val());
	// alert(xingming);exit;
	if(xingming ==  null || xingming == '' || xingming == '孩子姓名'){
		obj.xingming.className = 'inputTxt Validform_error';
		flag = 0;
	}
	var tel = $.trim($('#tel').val());
	var tel_reg = /^\d+$/g;
	if(tel ==  null || tel == '' || tel == '联系电话' || !tel.match(tel_reg)){
		obj.tel.className = 'inputTxt Validform_error';
		flag = 0;
	}
	if(obj.age.value ==  null || obj.age.value == ''){
		document.getElementById('age_t').className = 'selectinput selectinput_error';
		flag = 0;
	}
	if(obj.cityname.value ==  null || obj.cityname.value == ''){
		document.getElementById('province').className = 'selectinput selectinput_error';
		flag = 0;
	}
	if(obj.checked_school.value ==  null || obj.checked_school.value == ''){
		document.getElementById('schools').className = 'selectinput selectinput_error';
		flag = 0;
	}
	// 不能包含>和<
	if(obj.xingming.value.indexOf('>')!=-1 || obj.xingming.value.indexOf('<')!=-1){
		obj.xingming.className = 'inputTxt Validform_error';
		flag = 0;
	}
	if(obj.tel.value.indexOf('>')!=-1 || obj.tel.value.indexOf('<')!=-1){
		obj.tel.className = 'inputTxt Validform_error';
		flag = 0;
	}
	if(obj.cityname.value.indexOf('>')!=-1 || obj.cityname.value.indexOf('<')!=-1){
		document.getElementById('province').className = 'selectinput selectinput_error';
		flag = 0;
	}
	if(obj.checked_school.value.indexOf('>')!=-1 || obj.checked_school.value.indexOf('<')!=-1){
		document.getElementById('schools').className = 'selectinput selectinput_error';
		flag = 0;
	}

	if(flag == 0){
		return false;
	}else{
		//防止重复提交
		obj.subflag.value +=1;
		if(obj.subflag.value > 1){
			return false;
		}else{
			return true;
		}
	}
}

$(function(){

  if( !('placeholder' in document.createElement('input')) ){   

    $('input[placeholder],textarea[placeholder]').each(function(){    
      var that = $(this),    
      text= that.attr('placeholder');    
      if(that.val()===""){    
        that.val(text).addClass('placeholder');    
      }    
      that.focus(function(){    
        if(that.val()===text){    
          that.val("").removeClass('placeholder');    
        }    
      })    
      .blur(function(){    
        if(that.val()===""){    
          that.val(text).addClass('placeholder');    
        }    
      })    
      .closest('form').submit(function(){    
        if(that.val() === text){    
          that.val('');
        }
      });    
    });
  }

	
	$("#xingming").bind("focusout",function(){
		if($(this).val() != ''){
			$(this).removeClass('Validform_error');
		}
	});
	$("#tel").bind("focusout",function(){
		if($(this).val() != ''){
			$(this).removeClass('Validform_error');
		}
	});
	
	$("#age_t").css("cursor","pointer")
		.click(function (event) {
			$(this).removeClass('selectinput_error').toggleClass("selected")
			.siblings("#age_box").toggle();
			$(document).one("click", function () {
				$("#age_t").toggleClass("selected");
				$("#age_box").toggle();
			});
			event.stopPropagation();
	});
	
	$("#age_box a").bind("click",function(event){
		$(this).parent().parent().parent().hide();
		$("#age_t").toggleClass("selected").html($(this).html());
		//传值
		$("#age").val($(this).html());
		
		$(document).one("click", function () {
			$("#age_t").toggleClass("selected");
			$("#age_box").toggle();
		});
		event.stopPropagation();
		
	});


	$("#area_tabs .row a:gt(0)").bind("click",function(){
		$("#area_tabs .row a").each(function(){
			$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		
		rowcon = "#"+$(this).attr("rel");
		$(".rowcon").each(function(){
			$(this).hide();
		});
		$(rowcon + "c").show();
	});
	
	$(".citylist2 a").bind("click",function(){
		var province = $("#province").html();
		$("#area_tabs .rowcon a").each(function(){
			$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		$(".select-school .hidebox2").hide();
		
		// $("#province").html($(this).html()).toggleClass("selected").siblings(".select-area").toggle();
		$("#province").html($(this).html());
		//$("#schools").html($(this).html());
		//传值
		$("#cityname").val($(this).html());

		if(province != $(this).html()){
			$('#schools').html('选择校区');
			$('#checked_school').val('');
		}
	});


	
	$("#province").css("cursor","pointer")
		.click(function (event) {
			$(this).removeClass('selectinput_error').toggleClass("selected")
			.siblings(".select-area").toggle();
			if($(".select-school .hidebox2").is(":visible")){
				$(".select-school .hidebox2").hide();
				$("#schools").toggleClass("selected");
			}

			$(document).one("click", function () {
				// $("#province").toggleClass("selected");
				// $(".select-area").toggle();
				$("#province").removeClass("selected");
				$(".select-area").css('display','none');
			});
			event.stopPropagation();
	});
	$("#schools").css("cursor","pointer")
		.click(function (event) {
			if($("#cityname").val()==""){alert('请先选择省市，再选校区。');return false;}
			$(this).removeClass('selectinput_error').toggleClass("selected");
			var showschool;
			$(".citylist2 a").each(function(index, element) {
                if($(this).hasClass("selected")){
					showschool = "#"+$(".citylist2 a.selected").attr("rel");
					$(showschool).toggle();
					return false;
				}
            });

            $(document).one("click", function () {
            	$("#schools").toggleClass("selected");
				var showschool;
				$(".citylist2 a").each(function(index, element) {
	                if($(this).hasClass("selected")){
						showschool = "#"+$(".citylist2 a.selected").attr("rel");
						$(showschool).toggle();
						return false;
					}
	            });
			});
			event.stopPropagation();
	});
	$(".select-school .hidebox2 a").bind("click",function(event){
		// $(this).parent().parent().parent().hide();
		// $("#schools").toggleClass("selected").html($(this).attr("title"));
		$("#schools").html($(this).attr("title"));
		//传值
		$("#checked_school").val($(this).attr("title"));
		$('#main_scl')[0].contentWindow.pantolocate($(this).attr("right_school_id"),$(this).attr("lat"),$(this).attr("lng"));
		
	});
	$("#formtitle").val($(document).attr("title"));


})

