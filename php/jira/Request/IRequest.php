<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 9:47
 */
namespace common\components\jira\Request;

interface IRequest
{
    public function get($data = array());

}