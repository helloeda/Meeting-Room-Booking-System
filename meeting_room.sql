-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-05-15 11:06:10
-- 服务器版本： 5.6.22
-- PHP Version: 5.5.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `meeting_room`
--

-- --------------------------------------------------------

--
-- 表的结构 `reservation`
--

CREATE TABLE IF NOT EXISTS `reservation` (
  `reservation_no` int(11) NOT NULL COMMENT '预定编号（自增）',
  `reservation_time` datetime NOT NULL COMMENT '预定时间',
  `meeting_date` date NOT NULL,
  `start_time` char(20) NOT NULL COMMENT '会议开始时间',
  `end_time` char(20) NOT NULL COMMENT '会议结束时间',
  `operator` char(20) NOT NULL COMMENT '预定经办人',
  `operator_contact` char(20) NOT NULL COMMENT '经办人联系方式',
  `meeting_theme` char(20) NOT NULL COMMENT '会议主题',
  `meeting_dept` char(20) NOT NULL COMMENT '开会部门',
  `meeting_num` int(11) NOT NULL COMMENT '会议人数',
  `multimedia` tinyint(1) NOT NULL COMMENT '是否使用多媒体',
  `operator_username` char(20) NOT NULL COMMENT '预定账号用户名',
  `room_no` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `reservation`
--

INSERT INTO `reservation` (`reservation_no`, `reservation_time`, `meeting_date`, `start_time`, `end_time`, `operator`, `operator_contact`, `meeting_theme`, `meeting_dept`, `meeting_num`, `multimedia`, `operator_username`, `room_no`) VALUES
(1, '2016-05-03 23:36:26', '0000-00-00', '12:00', '15:00', 'eric', '8008208820', 'morning meeting', 'web', 16, 0, 'eric', 1),
(2, '2016-05-09 22:42:29', '2016-05-09', '12:20', '14:20', 'eda', '12345', 'week', 'web', 16, 0, 'eda', 2),
(3, '2016-05-09 23:20:06', '2016-05-09', '12:20', '14:20', 'eda', '12345', 'week', 'web', 16, 0, 'eda', 1),
(4, '2016-05-09 23:31:32', '2016-05-09', '08:30', '09:00', 's', 's', 's', 's', 12, 1, 'eda', 2),
(5, '2016-05-10 10:20:57', '1993-04-21', '12:00', '14:00', 'eda', 'we', 'ew', 'web', 12, 0, 'w', 1),
(6, '2016-05-10 10:21:23', '1993-04-21', '12:00', '14:00', 'eda', 'we', 'ew', 'web', 12, 0, 'w', 1),
(7, '2016-05-10 10:21:37', '1993-04-21', '12:00', '14:00', 'eda', 'we', 'ew', 'web', 12, 0, 'w', 1),
(8, '2016-05-10 10:26:38', '2016-05-09', '08:30', '12:00', 'eda', 'e', 'ew', 'e', 12, 0, 'eda', 1),
(9, '2016-05-10 10:27:49', '2016-05-09', '08:30', '12:00', 'eda', 'e', 'ew', 'e', 12, 0, 'eda', 1),
(10, '2016-05-10 10:29:06', '2016-05-09', '09:30', '14:00', 'eda', '12', '2e', 'e', 12, 1, 'eda', 1),
(11, '2016-05-10 10:30:08', '2016-05-09', '09:15', '13:00', 'eda', 'sd', 'd', 'e', 21, 1, 'eda', 1),
(12, '2016-05-10 10:30:58', '2016-05-09', '08:45', '09:45', 'eda', '12', '2e', 'e', 12, 1, 'eda', 1),
(13, '2016-05-10 14:12:15', '2016-05-09', '08:45', '16:00', 'eda', '8008208820', 'week meeting', 'web', 12, 0, 'eda', 1);

-- --------------------------------------------------------

--
-- 表的结构 `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `room_no` int(11) NOT NULL COMMENT '会议室编号',
  `room_name` char(20) NOT NULL COMMENT '会议室名称',
  `room_location` char(20) NOT NULL COMMENT '会议室地址',
  `room_capacity` int(11) NOT NULL COMMENT '会议室容量'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `sensor`
--

CREATE TABLE IF NOT EXISTS `sensor` (
  `sensor_id` char(20) NOT NULL COMMENT '传感器编号',
  `sensor_ip` char(20) NOT NULL COMMENT '传感器IP地址',
  `room_no` char(20) NOT NULL COMMENT '传感器所在房间地址',
  `sensor_status` char(20) NOT NULL COMMENT '传感器状态',
  `update_time` datetime NOT NULL COMMENT '状态更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` char(20) NOT NULL COMMENT '用户名',
  `password` char(20) NOT NULL COMMENT '密码',
  `user_type` char(20) NOT NULL COMMENT '账号类型'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`username`, `password`, `user_type`) VALUES
('eric', '123456', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_no`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_no`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`sensor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '预定编号（自增）',AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
