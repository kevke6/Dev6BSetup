<?php
define("__HOST__", "sql11.freemysqlhosting.net");
define("__USER__", "sql11158737");
define("__PASS__", "ZMe77QvDZj");
define("__BASE__", "sql11158737");

class DB {
    private $con = false;
    private $data = array();

    public function __construct() {
        $this->con = new mysqli(__HOST__, __USER__, __PASS__, __BASE__);
        if(mysqli_connect_errno()) {
            die("DB connection failed:" . mysqli_connect_error());
        }
    }

    public function qryGet($sql){
        $qry = $this->con->query($sql);
        if($qry->num_rows > 0) {
            while($row = $qry->fetch_object()) {
                $this->data[] = $row;
            }
        } else {
            $this->data[] = null;
        }
        $this->con->close();
        return $this->data;
    }

    public function qryUpdate($sql){
        $this->con->query($sql);
        $this->con->close();
    }

    public function qryPop() {
        $sql = "SELECT * FROM `Character`";
        $qry = $this->con->query($sql);
        if($qry->num_rows > 0) {
            while($row = $qry->fetch_object()) {
                $this->data[] = $row;
            }
        } else {
            $this->data[] = null;
        }
        $this->con->close();
    }

    public function qryFire($sql=null, $usr) {
        if($sql == null) {
            $this->qryPop();
        } else {
            $this->con->query($sql);
            $this->qryPop();
        }
        $this->con->close();
        return $this->data;
    }
}
?>
