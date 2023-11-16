<?php 
session_start();
unset($_SESSION["user_id"]);
session_destroy();

header("Content-Type: text/html; charset=utf-8");
header("Location: ../index.php");
?>