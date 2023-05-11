<?php
    include "include/database.php";

    try {
        if(isset($_POST["register"])) {
            $result = execQuery($pdo, "SELECT COUNT(*) FROM USERS WHERE EMAIL = :email", [
                "email" => $_POST["user"]
            ]);

            if(count($result) == 0) {
                // Utente non esistente
                // Procedo alla registrazione

                execQuery($pdo, "
                        INSERT INTO USERS (EMAIL, PASSWORD, NAME, SURNAME, DATE, TEXT)
                        VALUES (:email, :password, :name, :surname, :date, :text)
                    ", [
                        "email"     => $_POST["user"],
                        "password"  => $_POST["password"],
                        "name"      => $_POST["name"],
                        "surname"   => $_POST["surname"],
                        "date"      => $_POST["date"],
                        "text"      => $_POST["text"],
                    ]
                );

                $_SESSION["message"] = "Utente aggiunto con successo.";

                header("Location: page.php");
            }
            else {
                // Utente già esistente

                $_SESSION["message"] = "Utente gi&agrave; registrato.";
                header("Location: ./#register");
            }
        } else return header("Location: ./");
    } catch(Exception $ex) {
        $_SESSION["message"] = "Errore PHP: " . $ex->getMessage();

        header("Location: ./");
    }
?>