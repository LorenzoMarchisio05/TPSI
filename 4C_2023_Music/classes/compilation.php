<?php

class Compilation {
    private $conn;
    private $table_name = "compilation";
    
    public function __construct($db) {
        $this->conn = $db;
    }

    public function Create($data) {
        try
        {
            $table = $this->table_name;
            $query = "INSERT INTO $table SET 
                    name=:name, 
                    description=:description, 
                    mail=:mail";

            $stmt = $this->conn->prepare($query);

            $data["name"] = htmlspecialchars(strip_tags($data["name"]));
            $data["description"] = htmlspecialchars(strip_tags($data["description"]));
            $data["mail"] = htmlspecialchars(strip_tags($data["mail"]));

            $stmt->bindParam(":name", $data["name"], PDO::PARAM_STR);
            $stmt->bindParam(":description", $data["description"], PDO::PARAM_STR);
            $stmt->bindParam(":mail", $data["mail"], PDO::PARAM_STR);

            if($stmt->execute()) {
                return json_encode(["data" => [
                    "err" => false,
                    "message" => "item added"
                ]]);
            }

            return json_encode(["data" => [
                "err" => true, 
                "message" => "Item not added"
            ]]);
        }
        catch(PDOException $ex)
        {
            return json_encode(["data" => [
                "err" => true, 
                "message" => "Execution error: " .  $ex->getMessage()
            ]]);
        }
    }

    public function Read($data) {
        try
        {
            $table = $this->table_name;
            $query = "SELECT ID_compilation, name, description 
                    FROM $table 
                    where mail = :mail";

            $stmt = $this->conn->prepare($query);

            $data["mail"] = htmlspecialchars(strip_tags($data["mail"]));
            $stmt->bindParam(":mail", $data["mail"], PDO::PARAM_STR);

            $stmt->execute();

            if($stmt->rowCount() <= 0) {
                return json_encode(["data" => [
                    "err" => true,
                    "message" => "Nothing else"
                ]]);
            }

            return json_encode(["data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);

        }
        catch(PDOException $ex)
        {
            return json_encode(["data" => [
                "err" => true, 
                "message" => "Execution error: " . $ex->getMessage()
            ]]);
        }
    }

    function Update($data) {
        try
        {
            $table = $this->table_name;
            $query = "UPDATE $table SET name=:name, description=:description WHERE ID_compilation=:ID_compilation";

            $stmt = $this->conn->prepare($query);

            $data["name"] = htmlspecialchars(strip_tags($data["name"]));
            $data["description"] = htmlspecialchars(strip_tags($data["description"]));
            $data["ID_compilation"] = htmlspecialchars(strip_tags($data["ID_compilation"]));

            $stmt->bindParam(":name", $data["name"], PDO::PARAM_STR);
            $stmt->bindParam(":description", $data["description"], PDO::PARAM_STR);
            $stmt->bindParam(":ID_compilation", $data["ID_compilation"], PDO::PARAM_STR);

            if($stmt->execute()) {
                return json_encode(["data" => [
                    "err" => false,
                    "message" => "item updated"
                ]]);
            }

            return json_encode(["data" => [
                "err" => true, 
                "message" => "Item not updated"
            ]]);
        }
        catch(PDOException $ex)
        {
            return json_encode(["data" => [
                "err" => true, 
                "message" => "Execution error: " . $ex->getMessage()
            ]]);
        }
    }

    function Delete($data) {
        try
        {
            $table = $this->table_name;
            $query = "DELETE FROM $table WHERE ID_compilation=:ID_compilation";

            $stmt = $this->conn->prepare($query);

            $data["ID_compilation"] = htmlspecialchars(strip_tags($data["ID_compilation"]));

            $stmt->bindParam(":ID_compilation", $data["ID_compilation"], PDO::PARAM_STR);

            if($stmt->execute()) {
                return json_encode(["data" => [
                    "err" => false,
                    "message" => "item deleted"
                ]]);
            }

            return json_encode(["data" => [
                "err" => true, 
                "message" => "Item not deleted"
            ]]);
        }
        catch(PDOException $ex)
        {
            return json_encode(["data" => [
                "err" => true, 
                "message" => "Execution error: " . $ex->getMessage()
            ]]);
        }
    }

}

?>