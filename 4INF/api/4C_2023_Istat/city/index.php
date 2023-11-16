<?php

require_once "../classes/database.php";
require_once "../classes/istat.php";

header("Access-control-Allow-Origin: *");
header("Content-type: Application/json; charset=UTF-8");

$database = new Database();

$connection = $database->createConnection();

$istat = new Istat($connection);

echo $istat->city($_POST);

?>