<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 9:24
 */

namespace common\components\jira\Response;


class IssueType extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'name' => self::TYPE_STRING,
            'iconUrl' => self::TYPE_STRING,
        );
    }

    protected $name;
    protected $iconUrl;
}