<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 15:56
 */

namespace common\components\jira\Request;


use common\components\jira\JiraClient;

class Project extends AbstractRequest
{
    public function get($data = array())
    {
        if (empty($this->apiUrl))
        {
            $this->apiUrl = JiraClient::JIRA_ENVIROMENT_PATH.'project';
        }
        $response = $this->httpClient->requestGet($this->apiUrl, $data);
        $result = array();
        if (is_array($response))
        {
            foreach ($response as $item)
            {
                $result[] = new \common\components\jira\Response\Project($item);
            }
        }
        return $result;
    }
    
}