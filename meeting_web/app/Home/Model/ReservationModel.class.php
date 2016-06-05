<?php
/**
 * Created by PhpStorm.
 * User: eda
 * Date: 16/5/23
 * Time: 下午11:15
 */

namespace Model;
use Think\Model;

//父类Model: ThinkPHP/Library/Think/Model.class.php
class UsersModel extends Model{

    protected $trueTableName = 'reservation';
    // 是否批处理验证
    // 批量获得全部的错误验证信息
    // 自动验证定义

}
