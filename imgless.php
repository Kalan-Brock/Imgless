<?php

$json = json_decode(file_get_contents('images.json'), true);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//Save new image if not there yet.
if(isset($request->path) && isset($request->uri)){

  $json[$request->path] = $request->uri;
  file_put_contents('images.json', json_encode($json));

  //delete the file, we no longer need it.
  //unlink($request->path);
}

//Get Data URI for saved image.
if(isset($request->existingpath)){
    echo (isset($json[$request->existingpath])) ? json_encode(['response' => json_encode(['uri' => $json[$request->existingpath]])]) : json_encode(['response' => json_encode(['uri' => 'false'])]);
}
