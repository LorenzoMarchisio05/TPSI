<?php
    include "../include/check.php";
    include "../include/database.php";

    try {
        $result = execQuery($pdo, "
            INSERT INTO user_cars (plate, brand, model, capacity, email)
            VALUES (:plate, :brand, :model, :capacity, :email)
        ", [
            "plate" => $_POST["plate"],
            "brand" => $_POST["brand"],
            "model" => $_POST["model"],
            "capacity" => $_POST["capacity"],
            "email" => $_POST["email"],
        ]);

        $_SESSION["message"] = "Aggiunto con successo.";

        execQuery($pdo, "DELETE FROM cars WHERE plate = :plate",  [ "plate" => $_POST["plate"] ]);

        $_SESSION["message"] = "Eliminato con successo";
    } catch (Exception $ex) {
        $_SESSION["message"] = "Eccezione SQL: " . $ex->getMessage();
    }
?>