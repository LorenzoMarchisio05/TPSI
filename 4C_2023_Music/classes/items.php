<?php

class Items 
{
    private $conn;
    private $table_conn = "items";

    public function __construct($db) {
        $this->conn = $db;
    }


    public function Create($data) {
        try
        {
            $table = $this->table_name;
            $query = "INSERT INTO $table SET ID_name=:ID_name, ID_song=:ID_song";

            $stmt = $this->conn->prepare($query);

            $data["ID_name"] = htmlspecialchars(strip_tags($data["ID_name"]));
            $data["ID_song"] = htmlspecialchars(strip_tags($data["ID_song"]));

            $stmt->bindParam(":ID_name", $data["ID_name"], PDO::PARAM_INT);
            $stmt->bindParam(":ID_song", $data["ID_song"], PDO::PARAM_INT);

            if($stmt->execute()) {
                return json_encode(["data" => [
                    "err" => false, 
                    "message" => "Item added"
                ]]);
            }

            return json_encode(["data" => [
                "err" => true, 
                "message" => "Item not created"
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

    public function Create($data) {
        try
        {
            $table = $this->table_name;
            $query = "SELECT ID_compilation, items.ID_song, title, artist, linkImage
                    FROM items LEFT JOIN song on items.ID_song = songs.ID_song
                    WHERE ID_compilation=:ID_compilation";

            $stmt = $this->conn->prepare($query);

            $data["ID_compilation"] = htmlspecialchars(strip_tags($data["ID_compilation"]));

            $stmt->bindParam(":ID_compilation", $data["ID_compilation"], PDO::PARAM_INT);

            $stmt->execute();

            if($stmt->rowCount() <= 0) {
                return json_encode(["data" => ["err" => true, "message" => "nothing else"]]);
            }

            return json_encode(["data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);

            return json_encode(["data" => [
                "err" => true, 
                "message" => "Item not created"
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