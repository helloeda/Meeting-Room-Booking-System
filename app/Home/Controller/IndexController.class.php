<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index()
    {

        $data=session('username');
        if($data){
            $this -> assign("username",ucfirst($data));
            $this -> display();  //①视图模板名称 与 当前操作方法名称一致
        }
        
        else
        {
            header("Location: /Home/User/login");

            exit;
        }

    }

    public function record()
    {

        $data=session('username');
        if($data){
            $this -> assign("username",ucfirst($data));
            $this -> display();  //①视图模板名称 与 当前操作方法名称一致
        }

        else
        {
            header("Location: /Home/User/login");

            exit;
        }

    }



    public function submit()
    {
        $reservation = D('Reservation');
        $data = $reservation-> create();
        $data['reservation_time'] = date('Y-m-d H:i:s', time());
       // print_r($data);

        $z = $reservation -> add($data);
        echo $z;

    }

    public function showRoom()
    {
        //showRoom
        $location = $_GET['location'];
        $condition = array(
            'room_location' => $location
        );
        $room = M('Room')->where($condition)->select();
        echo json_encode($room);
    }


    public function showReservation()
    {

        if($_GET['date'])
        {
            $date = $_GET['date'];
            $condition = array(
                'meeting_date' => $date
            );
        }
        elseif ($_GET['id'])
        {
            $id = $_GET['id'];
            $condition = array(
                'reservation_no' => $id
            );
        }
        elseif ($_GET['user'])
        {
            $user = $_GET['user'];

            if(strcasecmp(session('user_type'),"admin"))
            {
                $condition = array(
                    'operator_username' => $user
                );
            }


        }


        $reservation=M('Reservation')->join('room ON room.room_no = reservation.room_no' )->order('meeting_date desc')->where($condition)->select();
        echo json_encode($reservation);
    }

    public function withdrawReservation()
    {
        $id = $_GET['id'];
        $reservation = D('Reservation');
        $condition = array(
            'reservation_no' => $id
        );
        $z = $reservation -> where($condition) -> delete();
        echo $z;
    }
    

}