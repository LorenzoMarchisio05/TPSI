<?php

require_once "../classes/database.php";
require_once "../classes/istat.php";

header("Access-control-Allow-Origin: *");
header("Content-type: Application/json; charset=UTF-8");

$database = new Database();

$connection = $database->createConnection();

$istat = new Istat($connection);

switch($_POST["query"])
{
    case 0: echo $istat->region(); break;

    case 1: echo $istat->province($_POST); break;

    case 2: echo $istat->city($_POST); break;

    default: echo $istat->region(); break;
}
?>