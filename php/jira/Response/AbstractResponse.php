<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 15:05
 */
namespace common\components\jira\Response;

abstract class AbstractResponse
{
    const TYPE_STRING = 'string';
    const TYPE_INTEGER = 'integer';
    const TYPE_NUMBER = 'number';
    const TYPE_BOOLEAN = 'boolean';
    const TYPE_DATE = 'date';
    const TYPE_DATETIME = 'datetime';
    const TYPE_USER = 'user';
    const TYPE_LIST = 'list';
    const TYPE_ISSUE = 'issue';
    const TYPE_ISSUE_TYPE = 'issueType';
    const TYPE_WORK_ATTR_VALUE = 'workAttributeValue';
    const TYPE_WORK_ATTR = 'workAttribute';
    const TYPE_WORK_ATTR_TYPE = 'workAttributeType';
//    const TYPE_ = '';

    public function __construct($data = null)
    {
        if (empty($data))
        {
            return false;
        }
        return $this->mapObject($data);
    }

    /**
     * Map Object.
     * @param $data array
     * @return $this|bool
     */
    public function mapObject($data)
    {
        $maps = $this->getObjectMaps();

        if (!is_array($maps))
            return false;

        foreach ($maps as $key => $value)
        {
//            var_dump($key, $value);
            if (!isset($data->{$key}))
            {
                $data->{$key} = null;
            }
            $type = $value;
            $propertyName = $key;
            if (is_array($value) && isset($value['type']))
            {
                $type = $value['type'];
                $propertyName = $key;
                if (isset($value['property']))
                {
                   $propertyName = $value['property'];
                }
            }

            if ($type == self::TYPE_LIST)
            {
                // @TODO needed to complete list mapping!
                $this->{$propertyName} = $this->mapList($data->{$key});
            } else {
                $this->{$propertyName} = $this->mapValue($type, $data->{$key});
            }

        }
        
        return $this;
    }

    /**
     * Map each value.
     * @param $type
     * @param $data
     * @return bool|\DateTime|Issue|IssueType|User
     */
    protected function mapValue($type, $data)
    {
        if ($type == self::TYPE_INTEGER
            || $type == self::TYPE_STRING
            || $type == self::TYPE_NUMBER)
        {
            return $data;
        }

        if ($type == self::TYPE_BOOLEAN)
        {
            return (bool) $data;
        }

        if ($type == self::TYPE_DATE || $type == self::TYPE_DATETIME)
        {
            return new \DateTime($data);
        }
        
        if ($type == self::TYPE_USER)
        {
            return new User($data);
        }

        if ($type == self::TYPE_ISSUE)
        {
            return new Issue($data);
        }

        if ($type == self::TYPE_ISSUE_TYPE)
        {
            return new IssueType($data);
        }
        if ($type == self::TYPE_WORK_ATTR_VALUE)
        {
            return new WorkAttributeValue($data);
        }

        if ($type == self::TYPE_WORK_ATTR)
        {
            return new WorkAttribute($data);
        }

        if ($type == self::TYPE_WORK_ATTR_TYPE)
        {
            return new WorkAttributeType($data);
        }

    }

    /**
     * Map Array
     */
    protected function mapArray()
    {

    }

    /**
     * Map list
     */
    protected function mapList($data)
    {
        if (!is_array($data))
            return;
        $list = array();
        foreach ($data as $item) {
            $list[] = $this->mapObject($item);
        }

        return $list;
    }

    public function __get($name)
    {
        if (property_exists(static::class, $name))
        {
            return $this->{$name};
        };

        throw new \Exception('Property not exist!');
    }

    public function __call($name, $arguments)
    {
        $propertyName = lcfirst(str_replace('get', '', $name));
        if (method_exists($this, $name))
        {
            return $this->{$name}($arguments);
        } elseif (property_exists(static::class, $propertyName))
        {
            return $this->{$propertyName};
        }
    }

    /**
     * Describe mapping.
     * @return array
     */
    abstract public function getObjectMaps();

}