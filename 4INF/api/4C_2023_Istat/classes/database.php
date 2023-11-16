<?php
    class Database
    {
        private $host = "localhost";

        private $db_name = "istat";

        private $username = "root";

        private $password = "";

        public $connection;
        
        public function CreateConnection() {
            $this->connection = null;

            $host = $this->host;
            $db_name = $this->db_name;
            $username = $this->username;
            $password = $this->password;

            try
            {
                $this->connection = new PDO(
                    "mysql:host=$host;dbname=$db_name",
                    $username, 
                    $password);
            }
            catch(PDOException $ex)
            {
                $error = $ex->getMessage();
                echo "connection error: $error";
            }

            return $this->connection;
        }
    }
?>