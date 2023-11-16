<?php
require_once "../api/connect.php";

session_start();

if(!isset($_POST["email"]))
{
    header("Location: ../loginregister.php?errror=no+email");
    die();
}

if(!isset($_POST["password"]))
{
    header("Location: ../loginregister.php?errror=no+password");
    die();
}

$connection = OpenConnection();

$query = "SELECT id, password FROM users WHERE email = :email";

$statement = $connection->prepare($query);

$statement->bindParam(":email", $_POST["email"], PDO::PARAM_STR);

$statement->execute();

$results = $statement->fetch(PDO::FETCH_OBJ);

if(!password_verify($_POST["password"], $results->password)) {
    header("Location: ../loginregister.php?errror=wrong+password");
    die();
}

$_SESSION["id"] = $results->id;
header("Location: ../index.php");
?>