<?php
$config = [
    'db_engine' => 'mysql',
    'db_host' => '127.0.0.1',
    'db_name' => '4c_inf_autosalone',
    'db_user' => 'root',
    'db_password' => 'zaaml46mewcdk74',
];

$db_config = $config['db_engine'] . ":host=".$config['db_host'] . ";dbname=" . $config['db_name'];

try {
    $pdo = new PDO($db_config, $config['db_user'], $config['db_password'], [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
    ]);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
}
catch (PDOException $e) {
    exit("Impossibile connettersi al database: " . $e->getMessage());
}

function execQuery(PDO $pdoInstance, string $query, array $params = []) {
  $qh = $pdoInstance->prepare($query);

  foreach(array_keys($params) as $key) {
   $qh->bindParam(":$key", $params[$key], PDO::PARAM_STR); 
  }

  $qh->execute();
  
  return $qh->fetchAll(PDO::FETCH_ASSOC);
}
  
?>