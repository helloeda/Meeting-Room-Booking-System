function showRecord() {
    var username = $(".avatar-name").text();

    $.ajax({
        cache: false,
        type: "GET",
        dataType: "JSON",
        async: false,
        url: "/Home/Index/showReservation?user=" + username,
        error: function (request) {
        },
        success: function (reservationList) {
            for (var i = 0, l = reservationList.length; i < l; i++) {
                var detail = "";
                for(var key in reservationList[i]){
                    var temp = key + "='" + reservationList[i][key] + "' ";
                    detail += temp;
                }

                var $record = "<ul class='l-content'" + detail + "> <li class='l-room-name'>" + reservationList[i]['room_name'] +
                    "</li> <li class='l-user'>" + reservationList[i]['operator_username']   + "</li> <li class='l-manager'>" + reservationList[i]['operator'] +
                    "</li> <li class='l-contact'>" + reservationList[i]['operator_contact'] + "</li> <li class='l-day'>" +
                    reservationList[i]['reservation_time'] + "</li> <li class='l-time'>" + reservationList[i]['meeting_date'] +
                    "</li> <li class='l-part'>" + reservationList[i]['start_time'] + "-" + reservationList[i]['end_time'] +
                    "</li> <li class='l-status' >" + reservationList[i]['meeting_theme'] + "</li> <li class='l-oper'> " +
                    "<span class='to-check' onclick='showDetail($(this))'>Detail</span></li> </ul>";
                $(".check-box").append($record);
            }
        }
    });

}

$(".b-btn-cancel").click(function () {
    $(".common-book-box").css("display", "none");
});

function showDetail($_this) {
    var $detail = $($_this).parents(".l-content");

    $(".common-book-box").find(".reservation_no").val($detail.attr("reservation_no"));
    $(".common-book-box").find(".start_time").val($detail.attr("start_time"));
    $(".common-book-box").find(".end_time").val($detail.attr("end_time"));
    $(".common-book-box").find(".operator").val($detail.attr("operator"));
    $(".common-book-box").find(".operator_contact").val($detail.attr("operator_contact"));
    $(".common-book-box").find(".meeting_theme").val($detail.attr("meeting_theme"));
    $(".common-book-box").find(".meeting_dept").val($detail.attr("meeting_dept"));
    $(".common-book-box").find(".meeting_num").val($detail.attr("meeting_num"));
    $(".common-book-box").find(".capacity").text("Capacity: " + $detail.attr("room_capacity"));
    $(".common-book-box").find(".date").text($detail.attr("meeting_date"));
    $(".common-book-box").find(".operator_username").val($detail.attr("operator_username"));
    $(".common-book-box").find(".title").text($detail.attr("room_name") + "|" + $detail.attr("room_location"));
    $(".common-book-box").css("display", "block");
    if ($detail.attr("multimedia") == 0)
        $(".common-book-box").find("#b-switch-projector_0").attr("checked","checked");
    else if ($detail.attr("multimedia") == 1)
        $(".common-book-box").find("#b-switch-projector_1").attr("checked","checked");
}


$(".withdraw").click(function () {

    var id = $(this).parents(".common-book-box").find(".reservation_no").val();

    $.ajax({
        cache: false,
        type: "GET",
        dataType: "JSON",
        async: false,
        url: "/Home/Index/withdrawReservation?id=" + id,
        error: function (request) {
        },
        success: function (data) {
            if(data == 1)
            {
                swal("Success!", "You have withdrawn the booking!", "success");
                $("ul[reservation_no='" + id + "']").remove()
            }

            else
                swal("Error!", "Failed to withdraw!", "error");
        }
    });

    $(".common-book-box").css("display", "none");

});


$(document).ready(function () {
    showRecord()
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