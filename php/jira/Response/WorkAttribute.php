<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 9:35
 */

namespace common\components\jira\Response;


class WorkAttribute extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'name' => self::TYPE_STRING,
            'key' => self::TYPE_STRING,
            'id' => self::TYPE_NUMBER,
            'type' => self::TYPE_WORK_ATTR_TYPE,
            'required' => self::TYPE_BOOLEAN,
            'sequence' => self::TYPE_NUMBER,
            'externalUrl' => self::TYPE_STRING,
        );
        // TODO: Implement getObjectMaps() method.
    }

    protected $value;
    protected $id;
    protected $workAttribute;
    protected $worklogId;
}