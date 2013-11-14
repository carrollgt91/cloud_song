<?php

require 'vendor/autoload.php';
require 'vendor/slim/slim/Slim/LogWriter.php';
require 'NotORM.php';


session_start();

$pdo = new PDO("mysql:dbname=cloudsong", 'root', 'root');
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


$app->get("/songs", function() use ($app, $db) {
  $songs = array();
  foreach ($db->songs() as $song) {
    $songs[] = array(
      "id" => $song["id"],
      "title" => $song["title"],
      "artist_id" => $song["artist_id"],
      "track_url" => $song["track_url"]
    );
  }
  $app->response()->header("Content-Type", "application/json");
  echo json_encode($songs);
});


//signup
$app->post("/artists", function () use($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $body = $app->request()->getBody();
    $converted_artist = json_decode($body, true);
    $encrypted_pw = crypt($converted_artist['password'], "salting it up");
    $artist = array(
      "name" => $converted_artist["name"],
      "tagline" => $converted_artist["tagline"],
      "location" => $converted_artist["location"],
      "contact" => $converted_artist["contact"],
      "encrypted_password" => $encrypted_pw
      );
    $result = $db->artists->insert($artist);
    if($result == false) {
      echo json_encode($artist);
      $app->halt(400);
    } else {
      echo json_encode($artist);
    }
});

$app->get("/logged_in", function() use ($app) { 
   if(!isset($_SESSION["user"])) {
    $app->halt(400);
   } else {
    echo json_encode($_SESSION["user"]);
   }

});

$app->get("/logout", function() use ($app) { 
  $_SESSION["user"] = NULL;
});

//login
$app->post("/login", function() use ($app, $db) { 
  $app->response()->header("Content-Type", "application/json");
  $artist = $db->artists->where("contact = ?", $_POST["contact"]);
  if($data = $artist->fetch()){
    $pw = crypt($_POST['password'], "salting it up");
    if($pw === $data["encrypted_password"]) {
      $artist = array(
        "id" => $data["id"],
        "name" => $data["name"],
        "tagline" => $data["tagline"],
        "location" => $data["location"],
        "contact" => $data["contact"],
        "website_url" => $data["website_url"]
      );
      $_SESSION["user"] = $artist;
      $app->flash('success', 'You are now logged in!');
      echo json_encode($artist);
    } else {
      $app->halt(400);
      echo "Invalid Password $pw vs " . $data["encrypted_password"];
    }
  } else {
    $app->halt(400);
    echo "Invalid Username";
  }
});

$app->run();

?>