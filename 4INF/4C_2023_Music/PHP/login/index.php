<?php
session_start();
$classes_basepath = "../../classes";
require_once "$classes_basepath/database.php";
require_once "$classes_basepath/users.php";

$database = new Database();
$conn = $database->CreateConnection();
$users = new Users($conn);

echo $users->Read($_POST);
?>