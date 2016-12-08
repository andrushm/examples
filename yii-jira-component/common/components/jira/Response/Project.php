<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 30.11.2016
 * Time: 15:14
 */

namespace common\components\jira\Response;


class Project extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'id' => self::TYPE_STRING,
            'self' => self::TYPE_STRING,
            'name' => self::TYPE_STRING,
            'key' => self::TYPE_STRING,
            'projectCategory' => self::TYPE_PROJECT_CATEGORY,
            'avatarUrls' => self::TYPE_ARRAY,
            'lead' => self::TYPE_USER,
        );
    }

    protected $id;

    protected $self;

    protected $name;

    protected $key;

    protected $projectCategory;

    protected $avatarUrls;

}