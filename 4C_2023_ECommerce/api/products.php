<?php
require_once "connect.php";
header("Content-Type: application/json");
try
{
    $connection = OpenConnection();

    $query = "SELECT * FROM products";

    $statement = $connection->query($query);

    $results = $statement->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($results);
}
catch(PDOException $ex)
{
    echo $ex->getMessage();
}
?>
