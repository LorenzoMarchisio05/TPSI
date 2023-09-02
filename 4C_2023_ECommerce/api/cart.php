<?php
require_once "connect.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Content-Type: application/json");
    try
    {
        $connection = OpenConnection();

        if(isset($_GET["user_id"]))
        {
            $query = "SELECT * FROM shoppingCart WHERE user_id = :id";
            $statement = $connection->prepare($query);
            $statement->bindParam("id", $_GET["user_id"], PDO::PARAM_INT);
        }
        else
        {
            $query = "SELECT * FROM shoppingCart";
            $statement = $connection->prepare($query);
        }
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_OBJ);

        echo json_encode($results);
    }
    catch(PDOException $ex)
    {
        http_response_code(400);
        echo $ex->getMessage();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(empty($_POST)){
        $_POST = json_decode(file_get_contents('php://input'), true);
    }

    if(!isset($_POST["product_id"]))
    {
        http_response_code(400);
        echo "no product id";
        die();
    }

    if(!isset($_POST["quantity"]))
    {
        http_response_code(400);
        echo "no quantity";
        die();
    }

    if(!isset($_POST["user_id"]))
    {
        http_response_code(400);
        echo "no user id";
        die();
    }
    try
    {
        $connection = OpenConnection();

        $product_id = $_POST["product_id"];
        $quantity = $_POST["quantity"];
        $user_id = $_POST["user_id"];

        $query = "SELECT count(*) FROM shoppingCart WHERE product_id = :id";
        $statement = $connection->prepare($query);
        $statement->bindParam("id", $product_id, PDO::PARAM_INT);
        $statement->execute();

        $results = $statement->fetch();

        if($results[0] != 0) {
            $query = "UPDATE `shoppingCart` SET quantity = quantity + :qty WHERE product_id = :product_id";
            $statement = $connection->prepare($query);
            $statement->bindParam('qty', $quantity, PDO::PARAM_INT);
            $statement->bindParam('product_id', $product_id, PDO::PARAM_INT);
        }
        else {
            $query = "INSERT INTO `shoppingCart` (`product_id`, `quantity`, `user_id`) VALUES (:product_id, :quantity, :user_id)";
            $statement = $connection->prepare($query);
            $statement->bindParam('product_id', $product_id, PDO::PARAM_INT);
            $statement->bindParam('quantity', $quantity, PDO::PARAM_INT);
            $statement->bindParam('user_id', $user_id, PDO::PARAM_INT);
        }
        $statement->execute();

        echo $results[0] == 0 ? "inserted" : "updated";
    }
    catch(PDOException $ex)
    {
        http_response_code(400);
        echo $ex->getMessage();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try
    {
        $connection = OpenConnection();
        if(isset($_GET["id"])) {
            $id = $_GET["id"];

            $query = "SELECT count(*) from shoppingCart WHERE id = :id";
            $statement = $connection->prepare($query);
            $statement->bindParam('id', $id, PDO::PARAM_INT);
            $statement->execute();
            $results = $statement->fetch();

            if($results[0] != 1) {
                http_response_code(400);
                echo "no match with id";
                die();
            }

            $query = "DELETE FROM shoppingCart WHERE id = :id";
            $statement = $connection->prepare($query);
            $statement->bindParam('id', $id, PDO::PARAM_INT);
            
        } else {
            $query = "DELETE FROM shoppingCart";
            $statement = $connection->prepare($query);
        }
        $statement->execute();
        echo "deleted";
    }
    catch(PDOException $ex)
    {
        http_response_code(400);
        echo $ex->getMessage();
    }
}
?>