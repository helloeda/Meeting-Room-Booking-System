<?php
  date_default_timezone_set("PRC");
  $time = date('Y-m-d H:i:s',time()); 
  $host_name="114.215.88.217";
  $host_user="eda"; 
  $host_pass="eMJ87NuwyHsA656j";
  $id = $_GET["id"];
  $ip=$_SERVER["REMOTE_ADDR"];  
  $status = $_GET["status"];
  $conn=new mysqli($host_name,$host_user,$host_pass,"test"); 
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }	 
  if($id){
      if($id == "001")
      {
          $sql = "UPDATE test SET id = '001', time = '$time', ip = '$ip', status = '$status' WHERE id = '001'";
          $result = $conn->query($sql);
      }
      else if($id == "002"){
          $sql = "UPDATE test SET id = '002', time = '$time', ip = '$ip', status = '$status' WHERE id ='002'";
          $result = $conn->query($sql);
      }

  }
  $result = $conn->query("select * from test");
  $res = array();
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $oneRoom = array('roomNo:' => $row['id'], 
                         'status' => $row['status'],
                         'time' => $row['time'],
                         'ip' =>$row['ip']);
        array_push($res, $oneRoom);
      }
  }
  print_r(json_encode($res));



