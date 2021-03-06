<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <title>Meeting Room Booking System</title>


    <link rel="stylesheet" type="text/css" href="/public/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/jquery.timepicker.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/jquery.cxcalendar.css">
    <link rel="stylesheet" type="text/css" href="/public/assets/css/sweet-alert.css">




</head>
<body>
<div class="main-box" style="top: 0px; margin-top: 20px;">
    <div class="main-logo"></div>
    <div class="logo-c"></div>
    <div style="clear:both"></div>
    <div class="main-inner">
        <div class="left-navi">
            <div class="avatar"></div>
            <div class="avatar-name"><?php echo ($username); ?></div>
            <ul class="nav-list">
                <li class="nav-selected">Timesheet</li>
                <li><a href="/Home/Index/record">Records</a></li>
                <li onclick="modifyPwd()">Change Password</li>
            </ul>
            <div class="logout-btn" onclick="logout()">Logout</div>
        </div>
        <div class="right-box">
            <div class="line-bar">
                <div class="line-li">
                    Detail
                </div>
                <div style="line-height: 3.2em;overflow: hidden;float: right;">
                    <input id="date_a" name="mydate" type="text" readonly
                           style="background-color:rgba(0,0,0,0); border-color:rgba(0,0,0,0);text-align: right; color: #428bca">
                </div>
            </div>
            <div class="book-box">
                <div class="bt-title" style="width: 100%;">

                    <div class="bt-2">
                        <li style="width:6.88%"></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">8:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">9:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">10:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">11:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">12:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">13:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">14:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">15:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">16:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">17:00</span></li>
                        <li style="width:8.46%;"><span style="margin-left:5px">18:00</span></li>
                    </div>
                    <div class="bt-3">

                    </div>
                </div>
            </div>
            <ul class="page-div"><li class="page-sel">1</li><li><a href="">2</a></li><li><a href="">下一页</a></li></ul>

        </div>
    </div>
    <div class="copyright">Meeting Room Booking System</div>
</div>


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
          Start Time：
        </span>
                <input name="start_time" class="timepicker" type="text">
            </div>
            <div class="b-input-group">
        <span>
          End Time：
        </span>
                <input name="end_time" class="timepicker" type="text">
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
        <span class="has-space">
          Operator：
        </span>
                <input name="operator" class="b-manager b-in-w-1" type="text">
            </div>
            <div class="b-input-group">
        <span>
          Contact：
        </span>
                <input name="operator_contact" class="b-contact b-in-w-2" type="text">
            </div>

            <div class="b-input-group">
        <span>
          Theme：
        </span>
                <input name="meeting_theme" class="b-act-usage b-in-w-2" type="text">
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
        <span>
          Dept：
        </span>
                <input name="meeting_dept" class="b-act-usage b-in-w-2" type="text">
            </div>
            <div class="b-div">
            </div>
            <div class="b-input-group">
        <span>
          Num：
        </span>
                <input name="meeting_num" class="b-amount b-in-w-1" type="text">
            </div>

            <div class="b-input-group b-switch b-in-w-3">
        <span>
          Multimedia：
        </span>
                <input type="radio" name="multimedia" value="1" id="b-switch-projector_0">Yes
                <input type="radio" name="multimedia" value="0" id="b-switch-projector_1" checked="">No

                <input name="operator_username" type="hidden" value="<?php echo ($username); ?>">
                <input name="meeting_date" type="hidden" value="2016-05-09">
                <input name="room_no" type="hidden" value="1">
            </div>
            <div class="b-div">
            </div>
        </div>
        <div class="b-hint">

        </div>
        <div class="b-large-btn">
            <div class="b-btn-submit">
                SUBMIT
            </div>
            <div class="b-btn-cancel">
                CANCEL
            </div>
        </div>
    </form>
</div>

<div class="common-box w-red" style="margin-top: -180.5px; display: none;">
    <div class="w-1">
    </div>
    <div class="w-title">
        Room001 - RESERVED
    </div>
    <div class="w-content">
        <div class="w-word">
            Date and Time: 2016-05-06 08:00-22:00
            <br>
            Capacity: 30
            <br>
            <span id = "people_num" style="color: red;">Current Num: 0</span>
            <br>
            Dept: Web Team
            <br>
            Theme: Weekly Meeting
            <br>
            Operator: Eric
            <br>
            Contact: 8008208820
        </div>
    </div>
    <div class="w-btn">
        CONFIRM
    </div>
</div>

</body>


<script src="/public/assets/js/jquery.min.js" type="text/javascript"></script>
<script src="/public/assets/js/bootstrap.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.timepicker.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.cxcalendar.js" type="text/javascript"></script>
<script src="/public/assets/js/index.js" type="text/javascript"></script>
<script src="/public/assets/js/jquery.easing.min.js"></script>
<script src="/public/assets/js/sweet-alert.js"></script>














</html>