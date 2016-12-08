<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 9:35
 */

namespace common\components\jira\Response;


class WorkAttributeValue extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'value' => self::TYPE_STRING,
            'id' => self::TYPE_NUMBER,
            'workAttribute' => self::TYPE_LIST,
            'worklogId' => self::TYPE_NUMBER,
        );
        // TODO: Implement getObjectMaps() method.
    }

    protected $value;
    protected $id;
    protected $workAttribute;
    protected $worklogId;
}