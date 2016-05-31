<?php
/**
 * Created by PhpStorm.
 * User: eda
 * Date: 16/5/22
 * Time: 下午10:39
 */
namespace Home\Controller;
use Think\Controller;

//父类Controller: ThinkPHP/Library/Think/Controller.class.php
class UserController extends Controller{
    //登录系统
    public function login(){
        //调用视图模板

        //display(),其是父类Controller的方法
        $this -> display();  //①视图模板名称与当前操作方法名称一致
        //$this -> display('register');//②调用当前User视图模板下的其他的模板文件
        //$this -> display('Goods/showlist');//③ 访问其他控制器下的模板文件

    }

    public function login_check(){

        if(empty($_POST)){
            die('Error:Page not exist!');

        }
        $username=I('post.username');
        $password=I('post.password');

        $condition = array(
            'username' => $username,
            'password'=> $password
        );
        $user=M('Users')->where($condition)->find();

        session('username',$username);
        session('password',$password);
        session('user_type',$user["user_type"]);


        if($user){
            $loginStatus = 0;
        }
        else{
            $loginStatus = 1;
        }

        // 将查询结果绑定到数据字典
        $response = array(
            'loginStatus' => $loginStatus
        );
        // 将数据字典使用JSON编码
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }


    public function logout_check(){
        session("username",null);
        session("password",null);
    }






}
