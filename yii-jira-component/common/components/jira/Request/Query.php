<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 13:43
 */

namespace common\components\jira\Request;

/**
 * Class for build request to jira.
 * @package common\components\jira\Request
 */
class Query
{
    protected $request;

    protected $requestParam;

    public function __construct(IRequest $request)
    {
        $this->request = $request;
    }

    public function setCustomParam($key, $value)
    {
        $this->requestParam[$key] = $value;
        return $this;
    }

    public function setUserName($username = '%')
    {
        $this->requestParam['username'] = $username;
        return $this;
    }

    public function setExpand($expand)
    {
        $this->requestParam['expand'] = $expand;
        return $this;
    }

    public function setDateFrom($dateFrom)
    {
        $this->requestParam['dateFrom'] = $dateFrom;
        return $this;
    }

    public function setDateTo($dateTo)
    {
        $this->requestParam['dateTo'] = $dateTo;
        return $this;
    }

    public function setProjectKey($projectKey)
    {
        $this->requestParam['projectKey'] = $projectKey;
        return $this;
    }

    public function setStartAt($startAt = 0)
    {
        $this->requestParam['startAt'] = $startAt;
        return $this;
    }

    public function setMaxResults($maxResults = 0)
    {
        $this->requestParam['maxResults'] = $maxResults;
        return $this;
    }

    public function getResult()
    {
        return $this->request->get($this->requestParam);
    }

    public function getTotalTime()
    {
        $result = $this->getResult();

        if ($result)
        {
            return $this->request->calcTotalTime($result);
        }

        return 0;
    }
}