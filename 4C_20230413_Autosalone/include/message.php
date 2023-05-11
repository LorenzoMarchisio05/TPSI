<?php
    if(isset($_SESSION["message"])) {
        $msg = $_SESSION["message"];
        echo "<div class='alert alert-warning m-2' role='alert'>$msg</div>";

        $_SESSION["message"] = null;
    }
?>