<?php
/**
 * For a running Search Demo see: http://amazonecs.pixel-web.org
 */

if ("cli" !== PHP_SAPI)
{
    echo "<pre>";
}


defined('AWS_API_KEY') or define('AWS_API_KEY', 'AKIAJ3WKL6FNDRODBOOA');
defined('AWS_API_SECRET_KEY') or define('AWS_API_SECRET_KEY', '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');
defined('AWS_ASSOCIATE_TAG') or define('AWS_ASSOCIATE_TAG', 'clemeventu-20');

require 'AmazonECS.class.php';

try
{
    $amazonEcs = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'CA', AWS_ASSOCIATE_TAG);
    $response = $amazonEcs->responseGroup('Small')->lookup('0684815001');
    var_dump($response);
}
catch(Exception $e)
{
  echo $e->getMessage();
}

if ("cli" !== PHP_SAPI)
{
    echo "</pre>";
}
