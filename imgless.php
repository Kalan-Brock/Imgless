<?php

$json = json_decode(file_get_contents('images.json'), true);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//Save new image if not there yet.
if(isset($request->path)){

    $imageData = base64_encode(file_get_contents($request->path));
    $uri = 'data: '.(function_exists('mime_content_type') ? mime_content_type($request->path) : $mime).';base64,'.base64_encode(file_get_contents($request->path));

    $json[$request->path] = $uri;
    file_put_contents('images.json', json_encode($json));

    //delete the file, we no longer need it.
    //unlink($request->path);
}
