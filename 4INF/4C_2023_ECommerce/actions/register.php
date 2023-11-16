<?php
require_once "../api/connect.php";

session_start();
header("Content-Type: text/html; charset=utf-8");

var_dump("entra");

if(!isset($_POST["name"])) 
{
    header("Location: ../loginregister.php?errror=no+name");
    die();
}

if(!isset($_POST["surname"])) 
{
    header("Location: ../loginregister.php?errror=no+surname");
    die();
}

if(!isset($_POST["birthdate"]))
{
    header("Location: ../loginregister.php?errror=no+birth+date");
    die();
}

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

var_dump("entra");

$connection = OpenConnection();

var_dump("entra");

$query = "SELECT count(*) FROM users
        WHERE email = :email;";
$statement = $connection->prepare($query);

$statement->bindParam(":email", $_POST["email"], PDO::PARAM_STR);

$statement->execute();

var_dump("entra");

$results = $statement->fetch();

if($results[0] != 0) {
    header("Location: ../loginregister.php?errror=email+already+registered");
    die();
} 

var_dump("entra");

$query = "INSERT INTO users 
        (name, surname, birthDate, email, password)
        VALUES
        (:name, :surname, :birthDate, :email, :password);";

$statement = $connection->prepare($query);

$hash = password_hash($_POST["password"],  PASSWORD_DEFAULT);

$statement->bindParam(":name", $_POST["name"], PDO::PARAM_STR);
$statement->bindParam(":surname", $_POST["surname"], PDO::PARAM_STR);
$statement->bindParam(":birthDate", $_POST["birthdate"], PDO::PARAM_STR);
$statement->bindParam(":email", $_POST["email"], PDO::PARAM_STR);
$statement->bindParam(":password", $hash, PDO::PARAM_STR);

$statement->execute();

$query = "SELECT LAST_INSERT_ID();";
$statement = $connection->query($query);
$user_id = $statement->fetch();

var_dump($user_id);
header("Location: ../loginregister.php?message=user+registered");
?>