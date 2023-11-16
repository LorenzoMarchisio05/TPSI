<?php

    include "../include/check.php";
    require "../include/database.php";

    try {

        execQuery($pdo, "
            INSERT INTO cars (plate, brand, model, capacity, email)
            VALUES (:plate, :brand, :model, :capacity, :email)
        ", [
            "plate" => $_POST["plate"],
            "brand" => $_POST["brand"],
            "model" => $_POST["model"],
            "capacity" => $_POST["capacity"],
            "email" => $_POST["email"],
        ]);

    } catch (Exception $ex) {

    }
?>