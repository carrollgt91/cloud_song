<?php

require 'vendor/autoload.php';
require 'vendor/slim/slim/Slim/LogWriter.php';
require 'NotORM.php';


session_start();

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
  foreach ($db->artist() as $artist) {
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

$app->get("/artists/:id", function($id) use ($app, $db) {
  $dbart = $db->artist[$id];
    $artist = array(
      "id" => $dbart["id"],
      "name" => $dbart["name"],
      "tagline" => $dbart["tagline"],
      "location" => $dbart["location"],
      "contact" => $dbart["contact"],
      "website_url" => $dbart["website_url"]
    );
  $app->response()->header("Content-Type", "application/json");
  echo json_encode($artist);
});

$app->get("/artists/:id/songs", function($id) use ($app, $db) {
  $dbsongs = $db->song()
    ->where("artist_id = ?", $id);

  $songs = array();
  foreach ($dbsongs as $song) {
    $artist = $db->artist[$song["artist_id"]];
    $name = $artist["name"];
    $songs[] = array(
      "id" => $song["id"],
      "title" => $song["title"],
      "artist" => $name,
      "track_url" => $song["track_url"]
    );
  }

  $app->response()->header("Content-Type", "application/json");
  echo json_encode($songs);
});

$app->post("/songs/upload", function() use ($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $body = $app->request()->getBody();
  $converted_song = json_decode($body, true);

  $file = array(
      'tmp_name' => $_FILES["files"]['tmp_name'][0],
      'name' => $_FILES["files"]['name'][0],
      'size' => $_FILES["files"]['size'][0],
      'type' => $_FILES["files"]['type'][0],
      'error' => $_FILES["files"]['error'][0]
  );
  $base_path = "/home/designer/html/cloud_song/";
  $root_path = "assets/sounds/" . $_POST['artist_id'] . "/";
  $file_path = $base_path . $root_path . $file["name"];

  $append_file = is_file($file_path) && $file['size'] > filesize($file_path);

  clearstatcache();

  if ($file['tmp_name'] && is_uploaded_file($file['tmp_name'])) {
    // multipart/formdata uploads (POST method uploads)
    if ($append_file) {
        file_put_contents(
            $file_path,
            fopen($file['tmp_name'], 'r'),
            FILE_APPEND
        );
        $file['method'] = 'append';
    } else {
        move_uploaded_file($file['tmp_name'], $file_path);
        $file['method'] = 'move';
    }
  }

  $song = array(
      "title" => $_POST["title"],
      "track_url" => $root_path . $file["name"],
      "artist_id" => $_POST["artist_id"]
    );

  $result = $db->song->insert($song);

  if($result == false) {
    echo json_encode($song);
    $app->halt(400);
  } else {
    echo json_encode($song);
  }
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
    $result = $db->artist->insert($artist);
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
  $artist = $db->artist->where("contact = ?", $_POST["contact"]);
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