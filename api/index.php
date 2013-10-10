<?php

require 'vendor/autoload.php';
require 'vendor/slim/slim/Slim/LogWriter.php';
require 'NotORM.php';

$pdo = new PDO("mysql:dbname=cloudsong", 'root', 'rootPassword');
$db = new NotORM($pdo);

$app = new \Slim\Slim(array (
  'debug' => true,
  'log.enable' => true, 'log.level' => \Slim\Log::DEBUG
  ));

$app->get("/", function () {
  echo "<h1> Hello World <h1>";
});

$app->get("/artists", function() use ($app, $db) {
  $artists = array();
  foreach ($db->artists() as $artist) {
    $artists[] = array(
      "id" => $artist["id"],
      "name" => $artist["name"],
      "tagline" => $artist["tagline"],
      "location" => $artist["location"],
      "contact" => $artist["contact"],
      "website_url" => $artist["website_url"]
    );
  }
  $app->response()->header("Content-Type", "application/json");
  echo json_encode($artists);
});


$app->post("/artists", function () use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $body = $app->request()->getBody();
    $converted_artist = json_decode($body, true);
    $artist = array(
      "name" => $converted_artist["name"],
      "tagline" => $converted_artist["tagline"],
      "location" => $converted_artist["location"],
      "contact" => $converted_artist["contact"],
      );
    $result = $db->artists->insert($artist);
    echo json_encode($artist);
});

$app->run();

?>