<?php
session_start();
header("Content-Type: application/json");

$data = [ "user_id" => $_SESSION["id"] ?? -1];

echo json_encode($data);
?>