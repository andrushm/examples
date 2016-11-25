<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 9:24
 */

namespace common\components\jira\Response;


class WorkAttributeType extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'name' => self::TYPE_STRING,
            'value' => self::TYPE_STRING,
            'systemType' => self::TYPE_BOOLEAN,
        );
    }

    protected $name;
    protected $iconUrl;
}