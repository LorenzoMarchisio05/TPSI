<?php
require_once "connect.php";
header("Content-Type: application/json");
try
{
    $connection = OpenConnection();

    if(isset($_GET["id"])) {
        $id = $_GET["id"];

        $query = "SELECT * FROM products WHERE id = :id";
        $statement = $connection->prepare($query);
        $statement->bindParam("id", $id, PDO::PARAM_INT);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_OBJ);
    
        echo json_encode($results);
    }
    else
    {
        $query = "SELECT * FROM products";
        $statement = $connection->query($query);
        $results = $statement->fetchAll(PDO::FETCH_OBJ);

        echo json_encode($results); 
    }
}
catch(PDOException $ex)
{
    echo $ex->getMessage();
}
?>
