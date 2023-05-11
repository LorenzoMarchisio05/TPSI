<?php
    include "include/database.php";

    // Avvio della sessione
    session_start();
    // PHP gestisce le sessioni in maniera autonoma, fornendoci l'array associativo $_SESSION che contiene le variabili di sessione
    // Per identificarmi, viene creato il cookie phpsessid in maniera trasparente.

    try {

        if(isset($_POST["send"]))
        {

            $page = "./";

            $result = execQuery($pdo, "SELECT PASSWORD, LEVEL FROM USER WHERE EMAIL = :email", [
                "email" => $_POST["user"]
            ]);

            if(count($result) == 1) {
                // L'utente esiste
                // Controllo la password

                if($result[0]["password"] == $_POST["password"]) {

                    // Password OK

                    $page = "page.php";

                    $_SESSION["authorized"] = 1;
                    $_SESSION["user"] = $_POST["user"];
                    $_SESSION["level"] = $result[0]["level"];

                } else {
                    
                    // Password SBAGLIATA

                    $_SESSION["message"] = "Password non corretta.";

                }

            } else {
                // L'utente NON esiste

                $_SESSION["message"] = "Utente non esistente.";
            }

            header("Location: $page");
        } else {
            include "login.php";
        } 
    } catch(Exception $e) {
        $_SESSION["message"] = "Errore PHP: " . $e->getMessage();
    }
?>