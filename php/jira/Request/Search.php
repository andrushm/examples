<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 24.11.2016
 * Time: 15:58
 */

namespace common\components\jira\Request;


use common\components\jira\JiraClient;

class Search extends AbstractRequest
{
    public function get($data = array())
    {
        // TODO: Implement get() method.

        $response = $this->httpClient->requestPost(JiraClient::JIRA_ENVIROMENT_PATH.'search', $data);
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

}