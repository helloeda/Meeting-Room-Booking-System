// JavaScript Document
$(function(){
	$(".login-box").fadeIn(1000,"easeInOutCubic");
	$('.has-hint').on('focus',function(){$(this).parent().find('.hint-user').css('display','none'); $(this).parent().find('.hint-user').css('color','#999999'); $(this).parent().css('border-bottom','1px solid #999999'); $(this).css('color','#666666');});
	$('.has-hint').on('blur',function(){if ($(this).val()=="") $(this).parent().find('.hint-user').css('display','block');});
	$('body').keydown(function(e){
		if (e.keyCode==13)   //回车键的键值为13
			$('.login-btn').click();
	});
	$('.login-btn').click(function(){
		var check_login = 0;
		//check_usr
		if ($('.user-input').val()=="") {
			check_login = 1;
			$('.user-input').css('color','#E74C3C');
			$('.hint-user').eq(0).css('color','#E74C3C');
			$('.user-input').parent().css('border-bottom','1px solid #E74C3C'); }
		
		//check_pwd	
		if ($('.pwd-input').val()=="") {
			check_login = 1;
			$('.pwd-input').css('color','#E74C3C');
			$('.hint-user').eq(1).css('color','#E74C3C');
			$('.pwd-input').parent().css('border-bottom','1px solid #E74C3C'); }
			
			if(check_login!=1)
			{
				check_login=checkLogin();
			}
		
		if (check_login == 1||check_login == 2)
		{
			$('.user-input').css('color','#E74C3C');
			$('.hint-user').eq(0).css('color','#E74C3C');
			$('.user-input').parent().css('border-bottom','1px solid #E74C3C');
			$('.pwd-input').css('color','#E74C3C');
			$('.hint-user').eq(1).css('color','#E74C3C');
			$('.pwd-input').parent().css('border-bottom','1px solid #E74C3C');
			alert("Password or username error!");
			shake_box($(this).parent());
		}
		else if (check_login == 0)
		{
			$(".login-box").fadeOut(1000,"easeInOutCubic",function(){window.location.href="/";});
		}
	});
	
	$('.upbox').click(function(){
		$(this).find('.hint-user').css('display','none');
		$(this).find('.hint-user').css('color','#999999');
		$(this).css('border-bottom','1px solid #999999');
		$(this).find('input').css('color','#666666');
		$(this).find('input').focus();
	});
});

function shake_box(box){
	var left_value = parseInt($(box).css("margin-left"));
	$(box).animate({marginLeft:left_value-30+"px"},80).animate({marginLeft:left_value+30+"px"},80).animate({marginLeft:left_value-30+"px"},80).animate({marginLeft:left_value+30+"px"},80).animate({marginLeft:left_value-30+"px"},80).animate({marginLeft:left_value+30+"px"},80).animate({marginLeft:left_value+"px"},80);
}
/*
*登陆Ajax
*pwd 密码
*user用户名
**/
function checkLogin()
{
	/*var xmlhttp;
	var form = new FormData();
	if(window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.open('POST',window.site_url+"/index/checkLogin",false);
	form.append('pwd',pwd);
	form.append('user',user);
	xmlhttp.send(form);
	return xmlhttp.responseText;*/
	var parameter = 1;
	$.ajax({
                cache: false,
                type: "POST",
                url:"/Home/User/login_check",
                data:$('#login_form').serialize(),// 你的formid
                async: false,
				dataType: "JSON",
		error: function(request) {
                },
                success: function(data) {
					parameter = data['loginStatus'];
                }
    });

	return parameter;
}