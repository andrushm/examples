<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 9:51
 */

namespace common\components\jira\Request;


use common\components\jira\Request\AbstractRequest;
use common\components\jira\JiraClient;

class Worklog extends AbstractRequest
{
    /**
     * @param $name - UserName.
     * @param array $data -
     * array(
     *  "dateFrom" => "yyyy-MM-dd",
     *  "dateTo" => "yyyy-MM-dd",
     *
     * @return string JSON
     */
    public function get($data = array())
    {
        if (isset($data['dateFrom']) && !isset($data['dataTo']))
        {
            $data['dateTo'] = date('Y-m-d');
        }

        $response = $this->httpClient->requestGet(JiraClient::TEMPO_ENVIROMENT_PATH.'worklogs/', $data);
        $result = array();
        if (is_array($response))
        {
            foreach ($response as $item)
            {
                $result[] = new \common\components\jira\Response\Worklog($item);
            }
        }
        return $result;
    }

    /**
     * Calculate total time which user spent.
     *
     * @param $worklogs
     * @return int Time in seconds.
     */
    public function calcTotalTime($worklogs)
    {
        $total = 0;
        if (is_array($worklogs))
        {
            foreach ($worklogs as $worklog)
            {
                /** @var \common\components\jira\Response\Worklog $total */
                $total = $total + $worklog->getTimeSpentSeconds();
            }
        }
        return $total;
    }

    /**
     * @param $username
     * @param string $dateFrom Date YYY-MM-dd
     * @param string $dateTo
     * @return jira\Response\Worklog
     */
//    public function getByUserName($username, $dateFrom, $dateTo = '')
//    {
//        if (empty($dateTo))
//        {
//            $dateTo = date('Y-m-d');
//        }
//        return $this->get($username, array('dateFrom' => $dateFrom, 'dateTo' => $dateTo));
//    }

    
}