<?php
session_start();

if(!isset($_SESSION['auth']))
{
    $err = json_decode(["data" => [
            "err" => true,
            "message" => "Session not set"
        ]]);
    die($err);
}

if(!$_SESSION["auth"])
{
    $err = json_decode(["data" => [
        "err" => true,
        "message" => "Unauthorized user"
    ]]);
die($err);
}

$classes_basepath = "../../classes";
require_once "$classes_basepath/database.php";
require_once "$classes_basepath/compilation.php";

$database = new Database();
$conn = $database->CreateConnection();
$compilation = new Compilation($conn);

switch($_POST["query"])
{
    case 1:
        echo $compilation->Create($_POST);
        break;

    case 2:
        echo $compilation->Read($_POST);
        break;

    case 3:
        echo $compilation->Update($_POST);
        break;
        
    case 4:
        echo $compilation->Delete($_POST);
        break;
}


?>