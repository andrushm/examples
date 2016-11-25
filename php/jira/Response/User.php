<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 16:02
 */

namespace common\components\jira\Response;


class User extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'self' => self::TYPE_STRING,
            'name' => self::TYPE_STRING,
            'displayName' => self::TYPE_STRING,
            'avatar' => self::TYPE_STRING,
        );
        // TODO: Implement getObjectMaps() method.
    }

    protected $self;
    protected $name;
    protected $displayName;
    protected $avatar;
}