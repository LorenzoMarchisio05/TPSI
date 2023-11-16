<?php
    session_start();

    if(!isset($_SESSION["authorized"])) {
        echo "<h3>Area Riservata</h3><br><a href='./'>Torna indietro</a>";
        die();
    }
?>