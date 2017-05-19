<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();
    }
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {

        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values.'"'.$$desired_key.'",';
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
     * Insert String
     */
    public function insertString($str, $column_name, $table_name) {        
        $query = "INSERT INTO ".$table_name." (".$column_name.") VALUES('".$str."')";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
     * Initialize Escrows
     ****/
    public function initEscrowTableRow($id,$table) {
        $query = "INSERT INTO ". $table . " (escrow_id)
                      VALUES(" . $id . ");";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
     * Initialize User Settings
     ****/
    public function initTableRow($table,$column,$value) {
        $query = "INSERT INTO " . $table . " (".$column.") VALUES(".$value.")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

     /**
     * Initialize Proforma Table Row with Default Values
     ****/
    public function initProformaTableRow($value) {
        $query = "INSERT INTO `proforma` (`pid`,`commission_percent`, `tca`, `selling_costs_percent`, `buyer_percent`, `apr`, `months`, `fees`, `opening_points`, `tetakawi_share_percent`,`other_costs`,`jeremy_pocket`,`codrin_pocket`) VALUES (" . $value . ", 3, 750, 1, 1, 9, 6, 990, 2, 27.5,0,0,0)";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
     * Initialize Rehab Tables
     ****/
    public function initRehabTable($pid) {
        $query = "INSERT INTO rehabs (pid) VALUES(" . $pid . ")";;
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    public function changeSettings($uid,$where,$column,$visible,$table) {
        $query = "UPDATE " . $table . " SET `" . $column . "`='" . $visible . "' WHERE ". $where . " = " . $uid;
        return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }

    public function changeProforma($column,$value,$table) {
        $query = "UPDATE " . $table . " SET `" . $column . "`='" . $value . "' WHERE 1";
        return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }


     /**
     * Creating new record
     */
    public function insertComment($obj, $column_names, $table_name) {
        $c = (array) $obj;
        $values = "'" . implode ( "', '", $c ) . "'";
        $columns = implode ( ", ", $column_names );
        $query = "INSERT INTO ".$table_name."(".$columns.") VALUES(".$values.")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
     * Creating new record
     */
    public function insertValues($column_values, $column_names, $table_name) {
        $values = "'" . implode ( "', '", $column_values ) . "'";
        $columns = implode ( ", ", $column_names );
        $query = "INSERT INTO ".$table_name."(".$columns.") VALUES(".$values.")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }

    /**
    *   Add Images to Image Table
    **/

    public function insertPropertyImages($images, $pid) {
        if (gettype($images) == 'array') {
            // Do Nothing
        } else {
            $c = explode(",", $images);
            $table_name = 'images';
            for ($i=0; $i < count($c); $i++) { 
                $query = "select 1 from images where image_name='".$c[$i]."'";
                $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
                $isImageExists = $r->fetch_assoc();
                if(!$isImageExists) {
                    $query = "INSERT INTO " . $table_name . "(image_name,pid) VALUES ('". $c[$i] ."',".$pid.")" ;
                    $this->conn->query($query);
                }
            }
        }
    }

    public function getSession(){
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if(isset($_SESSION['uid']))
        {
            $uid = $_SESSION['uid'];
            $sess["uid"] = $_SESSION['uid'];
            $sess["name"] = $_SESSION['name'];
            $sess["email"] = $_SESSION['email'];
            $sess["phone"] = $_SESSION['phone'];
            $sess["user_role"] = $_SESSION['user_role'];
        }
        else
        {
            $sess["uid"] = '';
            $sess["name"] = 'Guest';
            $sess["email"] = '';
            $sess["phone"] = '';
            $sess["user_role"] = NULL;
        }
        return $sess;
    }

    public function getPropertyImages() {
        $r = $this->conn->query("SELECT images.pid, images.image_name FROM images");
        $images = array();
        while($row = $r->fetch_assoc()) {
            array_push($images, $row);
        }
        return $images;
    }

    public function getTable($table) {
        $r = $this->conn->query("SELECT * FROM `".$table."`");
        $results = array();
        while ($row = $r->fetch_assoc()) {
          array_push($results, $row);
        }
        return $results;
    }

    public function getOpenBids() {
        $r = $this->conn->query("SELECT * FROM open_bids 
            JOIN categories ON categories.cat_id = open_bids.bid_cat_id 
            JOIN bid_tasks ON bid_tasks.bid_id = open_bids.bid_id
            JOIN tasks ON tasks.task_id = bid_tasks.task_id");
        $results = array();
        while ($row = $r->fetch_assoc()) {
          array_push($results, $row);
        }
        return $results;
    }

    public function getEscrowProgress() {
        $r = $this->conn->query("SELECT * FROM escrow 
            JOIN escrow_day01 ON escrow_day01.escrow_id = escrow.escrow_id 
            JOIN escrow_day03 ON escrow_day03.escrow_id = escrow.escrow_id 
            JOIN escrow_day07 ON escrow_day07.escrow_id = escrow.escrow_id 
            JOIN escrow_day12 ON escrow_day12.escrow_id = escrow.escrow_id 
            JOIN escrow_day15 ON escrow_day15.escrow_id = escrow.escrow_id 
            JOIN escrow_day21 ON escrow_day21.escrow_id = escrow.escrow_id 
            JOIN escrow_day23 ON escrow_day23.escrow_id = escrow.escrow_id");
        $results = array();
        while ($row = $r->fetch_assoc()) {
          array_push($results, $row);
        }
        return $results;
    }

    public function getJoinedRehabTable() {
        $r = $this->conn->query("SELECT * FROM rehabs 
            JOIN bath ON bath.rehab_id = rehabs.rehab_id 
            JOIN demo ON demo.rehab_id = rehabs.rehab_id 
            JOIN drywall ON drywall.rehab_id = rehabs.rehab_id 
            JOIN electrical ON electrical.rehab_id = rehabs.rehab_id 
            JOIN ext_paint ON ext_paint.rehab_id = rehabs.rehab_id 
            JOIN fixtures ON fixtures.rehab_id = rehabs.rehab_id 
            JOIN flooring ON flooring.rehab_id = rehabs.rehab_id
            JOIN framing ON framing.rehab_id = rehabs.rehab_id 
            JOIN garage_door ON garage_door.rehab_id = rehabs.rehab_id 
            JOIN hardscape ON hardscape.rehab_id = rehabs.rehab_id 
            JOIN hvac ON hvac.rehab_id = rehabs.rehab_id 
            JOIN int_paint ON int_paint.rehab_id = rehabs.rehab_id 
            JOIN kitchen ON kitchen.rehab_id = rehabs.rehab_id 
            JOIN landscaping ON landscaping.rehab_id = rehabs.rehab_id 
            JOIN plumbing ON plumbing.rehab_id = rehabs.rehab_id 
            JOIN pool_spa ON pool_spa.rehab_id = rehabs.rehab_id 
            JOIN roof ON roof.rehab_id = rehabs.rehab_id 
            JOIN sales_clean ON sales_clean.rehab_id = rehabs.rehab_id 
            JOIN stucco ON stucco.rehab_id = rehabs.rehab_id 
            JOIN windows ON windows.rehab_id = rehabs.rehab_id");
        $results = array();
        while ($row = $r->fetch_assoc()) {
          array_push($results, $row);
        }
        return $results;
    }

    public function getSettings($table, $uid) {
        $r = $this->conn->query("SELECT * FROM `". $table . "` WHERE uid = " . $uid);
        $results = array();
        while ($row = $r->fetch_assoc()) {
          array_push($results, $row);
        }
        return $results;
    }

    public function updateRow($table_name,$column_name,$column_value,$id,$id_value) {
        $query = "UPDATE " . $table_name . " SET " . $column_name . "='" . $column_value . "' WHERE " . $id . "=" . $id_value;
        return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }

    public function addToRow($table_name,$column_name,$column_value,$id,$id_value) {
        $query = "UPDATE " . $table_name . " SET " . $column_name . "= CONCAT_WS(','," . $column_name . ",'" . $column_value . "') WHERE " . $id . "=" . $id_value;
        return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }

    public function removeImage($img) {
      $query = "DELETE FROM images WHERE image_name = '". $img ."' LIMIT 1";
      return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }

    public function removeRow($pid) {
      $query = "DELETE FROM properties WHERE pid = ".$pid." LIMIT 1";
      return $this->conn->query($query) or die($this->conn->error.__LINE__);
    }

    public function destroySession(){
        if (!isset($_SESSION)) {
        session_start();
        }
        if(isSet($_SESSION['uid']))
        {
            unset($_SESSION['uid']);
            unset($_SESSION['name']);
            unset($_SESSION['email']);
            unset($_SESSION['phone']);
            unset($_SESSION['user_role']);
            $info='info';
            if(isSet($_COOKIE[$info]))
            {
                setcookie ($info, '', time() - $cookie_time);
            }
            $msg="Logged Out Successfully...";
        }
        else
        {
            $msg = "Not logged in...";
        }
        return $msg;
    }

}

?>
