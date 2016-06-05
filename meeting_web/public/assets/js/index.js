var isOperating = 0;
/**
 * 时间轴上显示会议室预定情况
 * @param roomid 会议室ID
 * @param startTime 会议开始时间
 * @param endTime 会议结束时间
 * @param reservationNo 会议室预定ID
 */
function toMin(originTime) {
    var hour = parseInt(originTime.substring(0, 2));
    var min = parseInt(originTime.substring(3));
    return hour * 60 + min;
}


function addReserve(roomid, startTime, endTime, reservationNo) {


    //开会时间距离8点的分钟数转为时间轴的百分比
    var startTimePercent = ((toMin(startTime) - 480) / 660 * 100).toString() + "%";
    //会议持续分钟数转为时间轴的百分比
    var durationTimePercent = ((toMin(endTime) - toMin(startTime)) / 660 * 100).toString() + "%";

    var $reserved = "<div reservation_no='" + reservationNo + "' onclick='showReserved($(this))' " +
        "class='progress-bar progress-bar-warning reserved' " +
        "style='left: " + startTimePercent + "; width: " + durationTimePercent + ";line-height: 20px; position:absolute;'></div>";
    $("#" + roomid).find(".progress").append($reserved);

}


$(".b-btn-submit").click(function () {

    if(!$("input[name='start_time']").val()||!$("input[name='end_time']").val()||!$("input[name='operator']").val()||
        !$("input[name='operator_contact']").val()||!$("input[name='meeting_theme']").val()||!$("input[name='meeting_dept']").val()
    ||!$("input[name='meeting_num']").val())
    {

        $(".check").text("Warning: The information below must be completed in FULL!");
    }
    else if(toMin($("input[name='start_time']").val())>=toMin($("input[name='end_time']").val()))
    {
        $(".check").text("Warning: End Time must later than start time!");
    }
    else
    {
        $_this = $(this);

        $.ajax({
            cache: true,
            type: "POST",
            url: "/Home/Index/submit",
            data: $('#book_form').serialize(),// 你的formid
            async: false,
            error: function (request) {
                swal("Error!", "Connection error!", "error");
            },
            success: function (data) {
                if (data) {
                    addReserve($_this.attr("id"), $('input[name="start_time"]').val(), $('input[name="end_time"]').val(), data);
                    $(".common-book-box").css("display", "none");
                    swal("Success!", "You have booked the meeting room!", "success");
                }
                else swal("Error!", "Failed to book the meeting room!", "error");
            }
        });
    }



});

$(".b-btn-cancel").click(function () {
    $(".common-book-box").css("display", "none");
});

function showUnreserved($_this) {
    
    $(".common-book-box").find(".title").text($_this.parent().attr("name") + "|" + $_this.parent().attr("location"));
    $(".common-book-box").find(".date").text($("#date_a").val());

    $(".common-book-box").find(".capacity").text("Capacity:" + $_this.parent().attr("capacity"));
    $(".common-book-box").find("input[name='meeting_date']").val($("#date_a").val());
    $(".common-book-box").find("input[name='room_no']").val($_this.parent().attr("id"));


    $(".common-book-box").css("display", "block");


    $(".b-btn-submit").attr("id", $_this.parent().attr("id"));
}

function showReserved($_this) {

    var id = $_this.attr("reservation_no");
    $.ajax({
        cache: false,
        type: "GET",
        dataType: "JSON",
        async: false,
        url: "/Home/Index/showReservation?id=" + id,
        error: function (request) {
        },
        success: function (reservationList) {

            for (var i = 0, l = reservationList.length; i < l; i++) {
                $(".common-box").find(".w-title").text($_this.parent().prev().text() + " - RESERVED");

                var content = "Meeing Time: " + reservationList[i]['meeting_date'] +
                    " " + reservationList[i]['start_time'] + "-" + reservationList[i]['end_time'] +
                    "</br>Planned Num: " + reservationList[i]['meeting_num'] + " </br>  " +
                    " <span id = 'people_num' style='color: red;'>Current Num: 0</span><br>Dept: " +
                    reservationList[i]['meeting_dept'] + "<br>Theme: " + reservationList[i]['meeting_theme'] +
                    " <br>Operator: " +  reservationList[i]['operator_username'] + "<br>Contact: " + reservationList[i]['operator_contact'];

                $(".common-box").find(".w-content").html(content);

                $(".common-box").css("display", "block");
            }
        }
    });


    var url = "/my.php";
    $.getJSON(url, function (data) {

        var PeopleNum = 0;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var timestamp = Date.parse(new Date());
                var recordTime = new Date(Date.parse(data[i]["time"].replace(/-/g, "/"))).getTime();
                ;
                var passedTime = timestamp - recordTime;
                if (data[i]["status"] == "111" && passedTime <= 25000) {
                    PeopleNum++;
                }
            }
        }

        $("#people_num").text("Current Num: " + PeopleNum.toString())
    });
    window.event.cancelBubble = true;//停止冒泡
    window.event.returnValue = false;//阻止事件的默认行为

    window.event.preventDefault();// 取消事件的默认行为
    window.event.stopPropagation(); // 阻止事件的传播
}


$(".w-btn").click(function () {
    $(".common-box").css("display", "none");
});

//更改密码
//  function alert_input(obj)
//  {obj.css('border-bottom','1px solid #E74C3C');obj.css('color','#E74C3C');obj.addClass('invalid-item')}
//  function rec_input(obj)
//  {obj.css('border-bottom','1px solid #999999');obj.css('color','#666666');obj.removeClass('invalid-item')}
//  function modifyPwd()
//  {
//      if (isOperating==0)
//      {
//          var m = "<div class='common-mask-p'></div><div class='common-box-p'><div class='w-1'></div><div class='w-title'>Change Password</div><div class='w-content' style='margin-bottom:50px'><div class='w-word' style='text-align:center'><form id='pwdbox' method='post'><input name='oldpwd' type='password' class='pwd-line'><input name='newpwd' type='password' class='pwd-line'><input name='reppwd' type='password' class='pwd-line'></form><div class='pwd-hint'>* Original Password</div><div class='pwd-hint'>* New Password</div><div class='pwd-hint'>* New Password</div></div></div><div class='w-btn-1'>CONFIRM</div><div class='w-btn-2'>CANCEL</div></div>";
//          $('body').append(m);
//
//          //调整
//          var box_height = - parseInt($('.common-box-p').css('height')) / 2 - 40;
//          $('.common-box-p').css('margin-top',box_height+"px");
//          $('.common-box-p').addClass('w-normal');
//
//          $('.pwd-hint').eq(1).css('top','114px');
//          $('.pwd-hint').eq(2).css('top','147px');
//
//          $('.pwd-line').eq(0).focus(function(){$('.pwd-hint').eq(0).fadeOut(200);});$('.pwd-line').eq(1).focus(function(){$('.pwd-hint').eq(1).fadeOut(200);});$('.pwd-line').eq(2).focus(function(){$('.pwd-hint').eq(2).fadeOut(200);});
//          $('.pwd-line').eq(0).blur(function(){if ($(this).val()=="")$('.pwd-hint').eq(0).fadeIn(200);});$('.pwd-line').eq(1).blur(function(){if ($(this).val()=="")$('.pwd-hint').eq(1).fadeIn(200);});$('.pwd-line').eq(2).blur(function(){if ($(this).val()=="")$('.pwd-hint').eq(2).fadeIn(200);});
//
//          //validate
//          isPwd=0;
//
//          $('.pwd-line').focus(function(){
//              isPwd=0;rec_input($(this));$(this).val("");
//          });
//
//          $('.pwd-line').blur(function(){
//              if ($(this).val()=="")
//              {alert_input($(this));isPwd=2;}
//          });
//
//          $('.pwd-line').eq(2).blur(function(){
//              if ($(this).val()!=$('.pwd-line').eq(1).val())
//              {alert_input($(this));isPwd=1}
//              else {rec_input($(this));if (isPwd!=2) isPwd=0}
//          });
//
//          $('.w-btn-1').click(function(){
//
//              $('.pwd-line').each(function(){
//              if ($(this).val()=="")
//              {alert_input($(this));isPwd=2;}
//              });
//
//              if (isPwd==2)
//              {
//                  $('.common-box-p').append("<div class='b-large-red-btn' style='bottom:-10px;height:38px;line-height:38px'>有字段为空，请检查<div>");$('.b-large-red-btn').fadeIn(200,function(){
//                  setTimeout($('.b-large-red-btn').fadeOut(1000),2500);
//                  });
//              }
//
//              else if (isPwd==1)
//              {
//                  $('.common-box-p').append("<div class='b-large-red-btn' style='bottom:-10px;height:38px;line-height:38px'>新密码不一致，请重新输入<div>");$('.b-large-red-btn').fadeIn(200,function(){
//                  setTimeout($('.b-large-red-btn').fadeOut(1000),2500);
//                  });
//              }
//
//              else {
//
//                  //鉴权判断
//                  $.ajax({
//                  cache: false,
//                  type: "POST",
//                  url:window.site_url+"/index/changePwd",
//                  data:$('#pwdbox').serialize(),// 你的formid
//                  async: false,
//                  error: function(XMLHttpRequest, textStatus, errorThrown) {
//                          /*alert(XMLHttpRequest.status);
//                          alert(XMLHttpRequest.readyState);
//                          alert(textStatus);*/
//                  },
//                  success: function(data) {
//                      data=JSON.parse(data);
//                      if(data.status=="SUCCESS")
//                      {
//                          rec_input($('.pwd-line').eq(2));
//                          $('.common-box-p').append("<div class='b-large-green-btn' style='bottom:-10px;height:38px;line-height:38px'>Success<div>");$('.b-large-green-btn').fadeIn(200,function(){
//                          $('.common-box-p').fadeOut(200,function(){$('.common-box-p').remove()});
//                          $('.common-mask-p').fadeOut(200,function(){$('.common-mask-p').remove()});
//                          $('.common-mask').fadeOut(200,function(){$('.common-mask').remove()});
//                          $('.common-book-box').fadeOut(200,function(){$('.common-book-box').remove()});
//                          });
//                          isOperating=0;
//                      }
//                      else
//                      {
//                          $('.common-box-p').append("<div class='b-large-red-btn' style='bottom:-10px;height:38px;line-height:38px'>Failed<div>");$('.b-large-red-btn').fadeIn(200,function(){
//                          setTimeout($('.b-large-red-btn').fadeOut(1000),2500);
//                          });
//                      }
//                  }
//                  });
//
//
//              }
//
//
//          });
//
//          $('.w-btn-2').click(function(){
//              $('.common-box-p').fadeOut(200,function(){$('.common-box-p').remove()});
//              $('.common-mask-p').fadeOut(200,function(){$('.common-mask-p').remove()});
//              isOperating=0;
//          });
//
//
//          $('.common-mask-p').fadeIn(200,function(){$('.common-box-p').fadeIn(200);});
//          isOperating=1;
//      }
//  }


function showRoom() {

    $.ajax({
        cache: false,
        type: "GET",
        dataType: "JSON",
        async: false,
        url: "/Home/Index/showRoom?location=Nokia%20No.3%203F",
        error: function (request) {
        },
        success: function (roomList) {
            for (var i = 0, l = roomList.length; i < l; i++) {

                var $roomSheet = "<div class='bt-row' capacity = '" + roomList[i]['room_capacity'] +
                    "' id='" + roomList[i]['room_no'] + "' name='" + roomList[i]['room_name'] + "' location='" +
                    roomList[i]['room_location'] + "'> " +
                    "<div style='width: 61px;height: 30px;line-height: 20px; font-size: 10px;position: absolute'>" +
                    roomList[i]['room_name'] + "</div> <div class='progress unreserved' onclick='showUnreserved($(this))'" +
                    " style='position:relative; margin-left: 61px'> </div> </div>";

                $(".bt-3").append($roomSheet);
            }
        }
    });


}

function showReservation(date) {

    if (!date) {
        date = new Date().format("yyyy-MM-dd")
    }

    $.ajax({
        cache: false,
        type: "GET",
        dataType: "JSON",
        async: false,
        url: "/Home/Index/showReservation?date=" + date,
        error: function (request) {
        },
        success: function (reservationList) {

            for (var i = 0, l = reservationList.length; i < l; i++) {
                addReserve(reservationList[i]['room_no'], reservationList[i]['start_time'], reservationList[i]['end_time'], reservationList[i]['reservation_no']);
            }
        }
    });

}


var chooseDate = function () {
    $("div").remove(".reserved");
    showReservation($("#date_a").val());
}

$(document).ready(function () {
    showRoom();
    showReservation();
});

function logout() {
    $.ajax({
        cache: false,
        type: "POST",
        url: "/Home/User/logout_check",
        async: false,
        error: function (request) {
        },
        success: function () {
            window.location.href = "/Home/User/login";
        }
    });
}


$('.timepicker').timepicker({
    timeFormat: 'HH:mm',
    minTime: '08:00:00',
    maxHour: 18,
    maxMinutes: 00,
    startTime: new Date(0, 0, 0, 08, 0, 0),
    interval: 15
});
$(".timepicker").timepicker({timeFormat: 'h:mm'});


Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$('#date_a').cxCalendar();
$('#date_a').val(new Date().format("yyyy-MM-dd"));