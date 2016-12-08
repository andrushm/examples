<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 9:40
 *
 * Component for works with Jira (Tempo too)
 *
 * Config in main.php
 *
 * 'components' => [
 *        ...
 *      'jira' => [
 *          'class' => 'common\components\jira\JiraClient',
 *          'host' => 'jira host',
 *          'login' => 'jira username',
 *          'pass' => 'jira password',
 *      ],
 *  ],
 *
 *
 * How to use:
 *  $jiraClient = Yii::$app->jira;
 *
 *  Getting Users that assigned to project
 *  $result = $jiraClient->user()->getAssignableUserByProjectKey('<PROJECT_KEY>')->getResult();
 *
 *  Get project list. setExpand - get additional fields
 *  $result = $jiraClient->project()->getQuery()->setExpand('lead')->getResult();
 *
 *  Get Users list.
 *  $result = $jiraClient->user()->getQuery()->setUserName()->getResult();
 *
 *  Get total time by username and project key.
 *  $result = $jiraClient->worklog()->getQuery()->setUserName('<USERNAME>')->setProjectKey('<PROJECT_KEY>')->setDateFrom('2016-11-01')->getTotalTime();
 *
 *  Get Worklog by username and/or projectkey
 *  $result = $jiraClient->worklog()->getQuery()->setUserName('<USERNAME>')->setDateFrom('2016-11-01')->getResult();
 *
 * 
 */
namespace common\components\jira;

use common\components\jira\Request\Project;
use common\components\jira\Request\User;
use yii\base\Component;

class JiraClient extends Component
{
    const JIRA_ENVIROMENT_PATH = '/rest/api/2/';
    const TEMPO_ENVIROMENT_PATH = '/rest/tempo-timesheets/3/';

    /**
     * Jira host
     * @var string
     */
    public $host;

    /**
     * @var string
     */
    public $login;
    /**
     * @var string
     */
    public $pass;

    /**
     * @var Project
     */
    protected $project;

    /**
     * @var User
     */
    protected $user;
    /**
     * @var \jira\Request\Issue
     */
    protected $issue;

//    protected $tempo;
    /**
     * @var \jira\Request\Worklog
     */
    protected $worklog;

    /**
     * Base64(login:pass)
     * @var string
     */
    protected $loginHash;

    /**
     * @var httpClient
     */
    protected $httpClient;

    
    public function init()
    {
        // @TODO needed to use Yii2-Curl.
        
        $this->httpClient = new httpClient();
        $header = array(
            'Content-Type: application/json',
            'Authorization: Basic '.$this->login($this->login, $this->pass),
        );

        $this->httpClient->setHeader($header);
        $this->httpClient->setHost($this->host);
        
    }

    /**
     * Generate Base64 from login and pass.
     * @param $login
     * @param $pass
     * @return string
     */
    protected function login($login, $pass)
    {
        $this->loginHash = base64_encode($login.':'.$pass);
        return $this->loginHash;
    }

    /**
     * @return Project
     */
    public function project()
    {
        if (empty($this->project))
        {
            $this->project = new Project($this->httpClient);
        }
        return $this->project;
    }

    /**
     * @return Project
     */
    public function user()
    {
        if (empty($this->user))
        {
            $this->user = new User($this->httpClient);
        }
        return $this->user;
    }

    /**
     * Work with Jira Issue API.
     * @return Request\Issue
     */
    public function issue()
    {
        if (empty($this->issue))
        {
            $this->issue = new Request\Issue($this->httpClient);
        }
        return $this->issue;
    }

    /**
     * Work with Jira Tempo Worklog Api.
     * @return Request\Worklog
     */
    public function worklog()
    {
        if (empty($this->worklog))
        {
            $this->worklog = new Request\Worklog($this->httpClient);
        }
        return $this->worklog;
    }

    /**
     * Get Errors.
     * @return array
     */
    public function getErrors()
    {
        return $this->httpClient->getErrors();
    }

}