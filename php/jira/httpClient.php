<?php

/**
 * Created by PhpStorm.
 * User: MyhailoAndrushkiv
 * Date: 23.11.2016
 * Time: 10:07
 */
namespace common\components\jira;

//use linslin\yii2\curl;

class httpClient
{
    protected $curl;
    protected $header;
    protected $host;

    protected $errors = array();

    protected $defaultOptions = array(
        CURLOPT_HEADER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 2
    );

    public function __construct()
    {
        $this->curl = curl_init();
    }

    public function setHeader($header)
    {
        $this->header = $header;
    }

    public function setHost($host)
    {
        $this->host = $host;
    }

    public function getHost()
    {
        return $this->host;
    }

    protected function makeRequest()
    {
        $response = curl_exec($this->curl);
        $responseCode = curl_getinfo($this->curl, CURLINFO_HTTP_CODE);
        if ($responseCode != 200)
        {
            $this->errors[] = array($responseCode => $response);
            return false;
        }
        return json_decode($response);
    }

    /**
     * Do GET request.
     * @param $url
     * @param array $params
     * @return mixed
     */
    public function requestGet($url, $params = array())
    {
        $options = array(
            CURLOPT_URL => $this->getHost().$url."?".http_build_query($params),
            CURLOPT_CUSTOMREQUEST => 'GET', // GET POST PUT PATCH DELETE HEAD OPTIONS
            CURLOPT_HTTPHEADER => $this->header,
        );

        curl_setopt_array($this->curl, $this->defaultOptions + $options);

        return $this->makeRequest();
    }

    /**
     * Do POST request.
     * @param $url
     * @param array $params
     * @return mixed
     */
    public function requestPost($url, $params = array())
    {
        $options = array(
            CURLOPT_URL => $this->getHost().$url,
            CURLOPT_CUSTOMREQUEST => 'POST', // GET POST PUT PATCH DELETE HEAD OPTIONS
            CURLOPT_HTTPHEADER => $this->header,
            CURLOPT_POSTFIELDS => json_encode($params),
        );

        curl_setopt_array($this->curl, $this->defaultOptions + $options);

        return $this->makeRequest();
    }

    public function getErrors()
    {
        return $this->errors;
    }
}