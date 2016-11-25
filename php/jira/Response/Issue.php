<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 9:17
 */

namespace common\components\jira\Response;

/**
 * Issue response model
 * @package jira\Response
 */
class Issue extends AbstractResponse
{
    public function getObjectMaps()
    {
        return array(
            'self' => self::TYPE_STRING,
            'id' => self::TYPE_STRING,
            'projectId' => self::TYPE_NUMBER,
            'key' => self::TYPE_STRING,
            'remainingEstimateSeconds' => self::TYPE_INTEGER,
            'issueType' => self::TYPE_ISSUE_TYPE,
            'summary' => self::TYPE_STRING,
        );
    }

    protected $self;
    protected $id;
    protected $projectId;
    protected $key;
    protected $remainingEstimateSeconds;
    protected $issueType;
    protected $summary;
}