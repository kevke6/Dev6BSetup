<?php
$statement = $_GET["statement"];
    include('config.php');
    $db = new DB();
if($statement === null || $statement === ''){
    $data = $db->qryFire();
}else{
    $data = $db->qryGet($statement);
}
echo json_encode($data);