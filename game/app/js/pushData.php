<?php
$statement = $_GET["statement"];
include('config.php');

$db = new DB();
$data = $db->qryUpdate($statement);
