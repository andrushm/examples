<?php
/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 30.11.2016
 * Time: 14:35
 */

namespace common\components\jira\Request;


use common\components\jira\JiraClient;

class User extends AbstractRequest
{
    /**
     * @param array $data
     * @return array
     */
    public function get($data = array())
    {
        if (empty($this->apiUrl))
        {
            $this->apiUrl = JiraClient::JIRA_ENVIROMENT_PATH.'user/search';
        }
        $response = $this->httpClient->requestGet($this->apiUrl, $data);
//        $response = $this->httpClient->requestGet(JiraClient::JIRA_ENVIROMENT_PATH.'user/search', $data);
        $result = array();
        if (is_array($response))
        {
            foreach ($response as $item)
            {
                $result[] = new \common\components\jira\Response\User($item);
            }
        }
        return $result;
    }

    /**
     * @param $projectKey
     * @return $this
     */
    public function getAssignableUserByProjectKey($projectKey)
    {
        $this->apiUrl = JiraClient::JIRA_ENVIROMENT_PATH.'user/assignable/search';

        return $this->getQuery()->setCustomParam('project', $projectKey);
    }
}