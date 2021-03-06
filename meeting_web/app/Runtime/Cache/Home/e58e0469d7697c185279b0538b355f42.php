<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <title>Meeting Room Booking System</title>

    <link rel="stylesheet" type="text/css" href="/public/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/jquery.timepicker.css">

    <link rel="stylesheet" type="text/css" href="/public/assets/css/jquery.cxcalendar.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/sweet-alert.css">




</head>
<body>
<div class="main-box" style="top: 0px; margin-top: 20px;">
    <div class="main-logo"></div><div class="logo-c"></div>
    <div style="clear:both"></div>
    <div class="main-inner">
        <div class="left-navi">
            <div class="avatar"></div>
            <div class="avatar-name"><?php echo ($username); ?></div>
            <ul class="nav-list">
                <li><a href="/Home/Index/index">Timesheet</a></li>
                <li class="nav-selected">Records</li>
                <li onclick="modifyPwd()">Change Password</li>
            </ul>
            <div class="logout-btn" onclick="logout()">Logout</div>
        </div>
        <div class="right-box">
            <div class="line-bar">
                <div class="search-box"><ul class="search-room"></ul><input type="text" placeholder="Operator" class="keyword s-keyword"><div class="search-hint"></div><div class="search-btn"></div></div>
                <div class="export-btn"><a class='dl' href='#'>Export</a></div>
            </div>
            <div class="check-box">
                <div class="bt-4">
                    <ul class="l-navi">
                        <li class="l-room-name">Room Name</li>
                        <li class="l-user">Username</li>
                        <li class="l-manager">Operator</li>
                        <li class="l-contact">Contact</li>
                        <li class="l-day">Book Date</li>
                        <li class="l-time">Meeting Date</li>
                        <li class="l-part">Meeting Time</li>
                        <li class="l-status">Theme</li>
                        <li class="l-oper">Operate</li>
                    </ul>
                </div>

            </div>
            <ul class="page-div"><li class="page-sel">1</li><li><a href="">2</a></li><li><a href="">下一页</a></li></ul>
        </div>
    </div>
    <div class="copyright">Meeting Room Booking System</div>
</div>
<input type="hidden" id="current_page" value="main">

<div class="common-book-box" style="display: none;">
    <form id="book_form" method="post">
        <div class="w-2">
        </div>
        <div class="b-title title">

        </div>

        <div class="b-title date">
            2016.04.28
        </div>

        <div class="b-status">
            <div class="b-s b-status-off capacity">
                Capacity:20
            </div>
        </div>
        <div style="clear:both">
        </div>
        <div class="w-1">
        </div>
        <div class="b-input-form">

            <div class="b-input-group">
                            <span>
                              Booking ID:
                            </span>
                <input name="reservation_no" class="timepicker reservation_no" type="text" readonly="readonly" >
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
                            <span>
                              Start Time：
                            </span>
                <input name="start_time" class="timepicker start_time" type="text" readonly="readonly" >
            </div>
            <div class="b-input-group">
                            <span>
                              End Time：
                            </span>
                <input name="end_time" class="timepicker end_time" type="text" readonly="readonly" >
            </div>

            <div class="b-input-group">
                            <span class="has-space">
                              Operator：
                            </span>
                <input name="operator" class="b-manager b-in-w-1 operator" type="text" readonly="readonly" >
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
                            <span>
                              Contact：
                            </span>
                <input name="operator_contact" class="b-contact b-in-w-2 operator_contact" type="text" readonly="readonly" >
            </div>

            <div class="b-input-group">
                            <span>
                              Theme：
                            </span>
                <input name="meeting_theme" class="b-act-usage b-in-w-2 meeting_theme" type="text" readonly="readonly" >
            </div>

            <div class="b-input-group">
                            <span>
                              Dept：
                            </span>
                <input name="meeting_dept" class="b-act-usage b-in-w-2 meeting_dept" type="text" readonly="readonly" >
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
                            <span>
                                Num：
                            </span>
                <input name="meeting_num" class="b-amount b-in-w-1 meeting_num" type="text" readonly="readonly" >
            </div>
            <div class="b-input-group">
                            <span>
                                Username：
                            </span>
                <input name="operator_username" class="b-amount b-in-w-1 operator_username" value="<?php echo ($username); ?>" >
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
                            <span>
                                Multimedia：
                            </span>
                <input type="radio" name="multimedia" value="1" id="b-switch-projector_0" disabled="disabled" >Yes
                <input type="radio" name="multimedia" value="0" id="b-switch-projector_1" disabled="disabled" >No
            </div>


        </div>
        <div class="b-hint">
        </div>
        <div class="b-large-btn">
            <div class="b-btn-submit withdraw">
                WITHDRAW
            </div>
            <div class="b-btn-cancel">
                BACK
            </div>
        </div>
    </form>
</div>


</body>

<script src="/public/assets/js/jquery.min.js" type="text/javascript"></script>
<script src="/public/assets/js/bootstrap.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.timepicker.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.cxcalendar.js" type="text/javascript"></script>
<script src="/public/assets/js/record.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.easing.min.js"></script>
<script src="/public/assets/js/sweet-alert.js"></script>

</html>