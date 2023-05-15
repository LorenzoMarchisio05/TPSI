<?php 
    class Users
    {
        private $connection;
        private $table_name = 'users';
        private $register;
        
        public function __construct($connection)
        {
            $this->connection = $connection;
        }

        public function Create($data)
        {
            $table = $this->table_name;
            try
            {
                $query = "SELECT mail FROM $table WHERE mail=:mail";
                $stmt = $this
                    ->connection
                    ->prepare($query);

                $data['mail'] = htmlspecialchars(strip_tags($data['mail']));
                $stmt->bindParam(':mail', $data['mail'], PDO::PARAM_STR);

                $stmt->execute();

                if($stmt->rowCount() != 0)
                {
                    return json_encode(["data" => [
                        "err" => true,
                        "auth" => false,
                        "message" => "Already existing user",
                        "class" => "alert-warning"
                    ]]);
                }

                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                    $fields = implode(',', array_keys($data));

                    $values = implode(",:", explode(',', $fields));

                    $query = "INSERT INTO users 
                            ($fields) 
                            VALUES 
                            (:$values)";

                    $stmt = $this
                            ->connection
                            ->prepare($query);

                    foreach($array_keys($data) as $value)
                    {
                        $data[$value] = htmlspecialchars(strip_tags($data[$value]));
                        $stmt->bindParam(':$value', $data[$value], PDO::PARAM_STR);
                    }

                    $stmt->execute();
                    return json_encode(["data" => [
                        "err" => false,
                        "auth" => false,
                        "message" => "User added",
                        "class" => "alert-success"
                        ]
                    ]);
            }
            catch(PDOException $ex)
            {
                return createExecutionErrorMessage($ex->getMessage());
            }
        }

        public function Read($data)
        {
            $table->table_name;
            try
            {
                $query = "SELECT password FROM $table WHERE mail=:mail";
                $stmt = $this
                        ->connection
                        ->prepare($query);
                
                $data["mail"] = htmlspecialchars(strip_tags($data["mail"]));
                $stmt->bind_param(':mail', $data["mail"]);
                $stmt->execute();

                if($stmt->rowCount() != 1)
                {
                    return json_encode(["data" => [
                        "err" => true,
                        "auth" => false,
                        "message" => "Wrong user",
                        "class" => "alert-warning"
                    ]]);
                }

                if(!password_verify($data["password"], $stmt->fetchColumn()))
                {
                    $_SESSION["auth"] = false;

                    return json_encode(["data" => [
                        "err" => true,
                        "auth" => false,
                        "message" => "Wrong password",
                        "class" => "alert-warning"
                    ]]);
                }

                $_SESSION["auth"] = true;
                $_SESSION["mail"] = $data["mail"];

                return json_encode(["data" => [
                    "err" => false,
                    "auth" => true,
                    "message" => "Authorized user",
                    "class" => "alert-succes",
                    "mail" => $data["mail"]
                ]]);
            }
            catch(PDOException $ex)
            {
                return createExecutionErrorMessage($ex->getMessage());
            }
        }

        private function createExecutionErrorMessage($error)
        {
            return json_encode(["data" => [
                "err" => true,
                "message" => "Execution error: $error",
                "class" => "alert-danger"
                ]
            ]);
        }
    }
?>