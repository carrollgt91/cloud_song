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
  $artist = $db->artist[$id];

  $songs = array();
  foreach ($dbsongs as $song) {
    
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

$app->get("/artists/:id/lists", function($id) use ($app, $db) {
  $lists = $db->list()
    ->where("artist_id = ?", $id);

  $artist = $db->artist[$id];

  $lists = array();
  foreach ($dblists as $list) {
    
    $name = $artist["name"];
    $lists[] = array(
      "id" => $list["id"],
      "title" => $list["title"],
      "artist" => $name
    );
  }

  $app->response()->header("Content-Type", "application/json");
  echo json_encode($lists);
});

$app->post("/songs/upload", function() use ($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $body = $app->request()->getBody();
  $converted_song = json_decode($body, true);
  print_r($_FILES);
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

$app->get("/lists/:id", function($id) use ($app, $db, $pdo) {
  $dbl = $db->list[$id];
  $list = array(
    "id" => $dbl["id"],
    "title" => $dbl["title"],
    "artist_id" => $dbl["artist_id"]
  );

  $songs = array();
  //Used to efficiently query the song table
  $song_ids = ""; 
  //Loop over each row in the relationship table where the list_song.list_id = current_list.id
  foreach ($dbl->list_song() as $list_song) { 
    //constructs the string for the query to get songs
    $song_ids = $song_ids . "'" . $list_song["song_id"] . "',";
  }
  $song_ids = chop($song_ids, ","); //Remove last comma
  //get the songs from the database
  $query = "SELECT * FROM song WHERE id IN (" . $song_ids . ");";
  $dbsongs = $pdo->query($query);

  //Used to efficiently get the artists for the songs of the list
  $artist_ids = ""; 
  //For each song, serialize it and construct the string for the artist query
  foreach ($dbsongs as $song) {
    $artist_ids = $artist_ids . "'" . $song["artist_id"] . "',";
    $songs[] = array(
      "id" => $song["id"],
      "title" => $song["title"],
      "artist_id" => $song["artist_id"],
      "track_url" => $song["track_url"]
    );
  }

  $artist_ids = chop($artist_ids, ",");

  //this query grabs the name and id for each artist in the list
  $query = "SELECT id,name FROM artist WHERE id IN (" . $artist_ids . ");";
  $dbartists = $pdo->query($query);

  //an array where the keys are the ids and the values are php arrays with valid artist records
  $artist_map = array(); 

  //creates a map so we can easily handle the relationship
  foreach ($dbartists as $artist) {
    $art = array(
      "id" => $artist["id"],
      "name" => $artist["name"]
    );
    $artist_map[$artist["id"]] = $art;
  }
  //adds the artist name to the songs so we can correctly display it on the front end
  foreach ($songs as &$song) {
    $song["artist"] = $artist_map[$song["artist_id"]]["name"];
  }

  $app->response()->header("Content-Type", "application/json");
  echo json_encode($songs);
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