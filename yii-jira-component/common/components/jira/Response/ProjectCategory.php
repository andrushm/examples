<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 30.11.2016
 * Time: 15:14
 */

namespace common\components\jira\Response;


class ProjectCategory extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'id' => self::TYPE_STRING,
            'self' => self::TYPE_STRING,
            'name' => self::TYPE_STRING,
            'description' => self::TYPE_STRING,
        );
    }

    protected $id;

    protected $self;

    protected $name;

    protected $description;

}