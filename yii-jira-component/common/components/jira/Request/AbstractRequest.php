<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 9:47
 */

namespace common\components\jira\Request;

use common\components\jira\httpClient;
use common\components\jira\Request\IRequest;
use common\components\jira\Request\Query;

abstract class AbstractRequest implements IRequest
{
    /**
     * @var httpClient
     */
    protected $httpClient;

    protected $apiUrl;

    protected $query;

    public function __construct($httpClient)
    {
        $this->httpClient = $httpClient;
        $this->query = new Query($this);
    }

    public function getQuery()
    {
        return $this->query;
    }


}