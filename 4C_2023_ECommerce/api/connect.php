<?php 
define("CONNECTION_STRING", "mysql:host=localhost;dbname=ECommerce");
define("USER", "root");

/*
 * openConnection initializes a new DB connection
 * @throws on any DB error
 */
function OpenConnection() {
    $connection = new PDO(CONNECTION_STRING, USER, "", array(
        PDO::ATTR_PERSISTENT => true
    ));
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $connection;
}

?>
