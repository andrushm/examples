<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 9:40
 */
namespace common\components\jira;

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