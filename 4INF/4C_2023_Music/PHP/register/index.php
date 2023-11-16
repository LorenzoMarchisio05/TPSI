<?php
$classes_basepath = "../../classes";
require_once "$classes_basepath/database.php";
require_once "$classes_basepath/users.php";

$database = new Database();
$conn = $database->CreateConnection();
$users = new Users($conn);

$_SESSION["register"] = $users->Create($_POST);
echo $_SESSION["register"];
?>