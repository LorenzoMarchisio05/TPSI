<?php
class Istat 
{
    private $connection;

    private $table_name = "data";

    public function __construct($dbconn)
    {
        $this->connection = $dbconn;
    }

    public function region()
    {
        try
        {
            $table = $this->table_name;

            $query = "SELECT DISTINCT region 
                        FROM $table 
                        ORDER BY region";
            
            $stmt = $this
                ->connection
                ->prepare($query);
            
            $stmt->execute();

            return json_encode($stmt->fetchAll(PDO::FETCH_COLUMN, 0));
        }
        catch(PDOException $ex)
        {
            $error = $ex->getMessage();
            
            return createErrorMessageJson($error);
        }
    }

    public function province($data)
    {
        try
        {
            $table = $this->table_name;

            $query = "SELECT DISTINCT province
                    FROM $table
                    WHERE region=:region
                    ORDER BY province";

            $stmt = $this
                ->connection
                ->prepare($query);
            
            $data['region'] = htmlspecialchars(strip_tags($data['region']));

            $stmt->bindParam(':region', $data['region'], PDO::PARAM_STR);
            
            $stmt->execute();

            return json_encode($stmt->fetchAll(PDO::FETCH_COLUMN, 0));
        }
        catch(PDOException $ex)
        {
            $error = $ex->getMessage();
            
            return createErrorMessageJson($error);
        }
    }


    public function city($data)
    {
        try
        {
            $table = $this->table_name;

            $query = "SELECT DISTINCT city
                    FROM $table
                    WHERE province=:province
                    ORDER BY city";

            $stmt = $this
                ->connection
                ->prepare($query);
            
            $data['province'] = htmlspecialchars(strip_tags($data['province']));

            $stmt->bindParam(':province', $data['province'], PDO::PARAM_STR);
            
            $stmt->execute();

            return json_encode($stmt->fetchAll(PDO::FETCH_COLUMN, 0));
        }
        catch(PDOException $ex)
        {
            $error = $ex->getMessage();
            
            return createErrorMessageJson($error);
        }
    }

    private function createErrorMessageJson($error)
    {
        return json_encode([
            'data' => [
                'err' =>  true,
                'message' => "Execution error: $error"
            ]
        ]);
    }
}
?>