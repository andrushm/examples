<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 15:18
 */

namespace common\components\jira\Response;

/**
 * Class Worklog
 * @method getTimeSpentSeconds int
 * @package common\components\jira\Response
 */
class Worklog extends AbstractResponse
{

    public function getObjectMaps()
    {
        // TODO: Implement getObjectMaps() method.
        return array(
            'id' => self::TYPE_STRING,
            'self' => self::TYPE_STRING,
            'author' => self::TYPE_USER,
            'comment' => self::TYPE_STRING,
            'timeSpentSeconds' => 'integer',
            'billedSeconds' => 'integer',
            'dateStarted' => 'datatime',
            'issue' => self::TYPE_ISSUE,
//            'workAttributeValues'
        );
    }

    protected $id;

    protected $self;

    protected $author;

    protected $comment;

    protected $timeSpentSeconds;

    protected $billedSeconds;

    protected $dateStarted;

    protected $issue;

    protected $worklogAttributes;

}