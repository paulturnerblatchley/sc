<?php
$app->get('/session', function() use ($app) {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["phone"] = $session['phone'];
    $response["name"] = $session['name'];
    $response["user_role"] = $session['user_role'];
    if ($response["user_role"]) {
        $table = "user_settings";
        $settings = $db->getSettings($table, $session['uid']);
        $response["settings"] = $settings;
    }
    echoResponse(200, $response);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->user);
    $response = array();
    $db = new DbHandler();
    $password = $r->user->password;
    $email = $r->user->email;
    $user = $db->getOneRecord("select uid,name,password,email,phone,user_role,entity,contractor_type,created from users where email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['phone'] = $user['phone'];
        $response['user_role'] = $user['user_role'];
        $response['entity'] = $user['entity'];
        $response['contractor_type'] = $user['contractor_type'];
        if ($response["user_role"]) {
            $table = "user_settings";
            $settings = $db->getSettings($table, $response['uid']);
            $response["settings"] = $settings;
        }
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['phone'] = $user['phone'];
        $_SESSION['user_role'] = $user['user_role'];
        $_SESSION['entity'] = $user['entity'];
        $_SESSION['contractor_type'] = $user['contractor_type'];

        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});

$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $phone = $r->customer->phone;
    $name = $r->customer->name;
    $email = $r->customer->email;
    $password = $r->customer->password;
    $user_role = $r->customer->user_role;
    $entity = $r->customer->entity;
    $contractor_type = $r->customer->contractor_type;
    $isUserExists = $db->getOneRecord("select 1 from users where phone='$phone' or email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "users";
        $column_names = array('phone', 'name', 'email', 'password', 'user_role', 'entity', 'contractor_type');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        $db->initUserSettings($result);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});

$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/properties', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $status = $r->property->status;
    $phase = $r->property->phase;
    $property_type = $r->property->property_type;
    $address = $r->property->address;
    $city = $r->property->city;
    $zip = $r->property->zip;
    $latlng = $r->property->latlng;
    $county = $r->property->county;
    $year_built = $r->property->year_built;
    $sqft = $r->property->sqft;
    $lotsize = $r->property->lotsize;
    $beds = $r->property->beds;
    $baths = $r->property->baths;
    $listdesc = $r->property->listdesc;
    $pool_spa = $r->property->pool_spa;
    $occupancy = $r->property->occupancy;
    $lockbox_combo = $r->property->lockbox_combo;
    $alarm_code = $r->property->alarm_code;
    $asset_manager = $r->property->asset_manager;
    $purchase_close_date = $r->property->purchase_close_date;
    $purchase_cost = $r->property->purchase_cost;
    $entity_vesting = $r->property->entity_vesting;
    $lender = $r->property->lender;
    $rehab_estimate = $r->property->rehab_estimate;
    $arv = $r->property->arv;
    $is_listed = $r->property->is_listed;
    $listing_date = $r->property->listing_date;
    $list_price = $r->property->list_price;
    $escrow_price = $r->property->escrow_price;
    $sale_close_date = $r->property->sale_close_date;
    $images = $r->property->images;
    $isPropertyExists = $db->getOneRecord("select 1 from properties where address='$address'");
    if(!$isPropertyExists){
        $tabble_name = "properties";
        $column_names = array('status', 'phase', 'property_type', 'address', 'city', 'zip', 'latlng', 'county', 'year_built', 'sqft', 'lotsize', 'beds', 'baths', 'listdesc', 'pool_spa', 'occupancy', 'lockbox_combo', 'alarm_code', 'asset_manager', 'purchase_close_date', 'purchase_cost', 'entity_vesting', 'lender', 'rehab_estimate', 'arv', 'is_listed', 'listing_date', 'list_price', 'escrow_price', 'sale_close_date');
        $result = $db->insertIntoTable($r->property, $column_names, $tabble_name);
        $db->initRehabTable($result);
        if (count($images)) {
             $db->insertPropertyImages($images, $result);
        }
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "New Property created successfully";
            $response["pid"] = $result;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create property. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "A property with that address already exists!";
        echoResponse(201, $response);
    }
});

$app->post('/changeSettings', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $table = "user_settings";
    $uid = $r->change->uid;
    $where = 'uid';
    $column = $r->change->field;
    $visible = $r->change->visible;
    $result = $db->changeSettings($uid,$where, $column, $visible, $table);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Setting changed.";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Couldn't change setting. Please refresh and try again.";
        echoResponse(201, $response);
    }
});

$app->get('/properties', function() use ($app) {
  $db = new DbHandler();
  $table = "properties";
  $properties = $db->getTable($table);
  echoResponse(200, $properties);
});

$app->get('/propertyImages', function() use ($app) {
  $db = new DbHandler();
  $images = $db->getPropertyImages();
  echoResponse(200, $images);
});

$app->post('/uploader', function() use ($app) {

    $imageinfo = getimagesize($_FILES['img']['tmp_name']);
    if($imageinfo['mime'] != 'image/gif' && $imageinfo['mime'] != 'image/jpeg' && $imageinfo['mime'] != 'image/png') {
        $imgMsg = "Sorry, we only accept JPEG, PNG, or GIF images";
        echoResponse(201, $imgMsg);
        exit;
    }
    $uploaddir = 'uploads/';
    $uploadfile = $uploaddir . basename($_FILES['img']['name']);
    if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile)) {
        echo "File is valid, and was successfully uploaded";
    } else {
        echo "File uploading failed";
    }
});

$app->post('/editProperty', function() use ($app) {
  $db = new DbHandler();
  $r = json_decode($app->request->getBody());
  $pid = $r->property->pid;
  if ($r->property->images) {
    $images = $r->property->images;
    $db->insertPropertyImages($images, $pid);
  }
  $tabble_name = "properties";
  $column_names = array(
    'status' => $r->property->status,
    'phase' => $r->property->phase,
    'property_type' => $r->property->property_type,
    'address' => $r->property->address,
    'city' => $r->property->city,
    'zip' => $r->property->zip,
    'latlng' => $r->property->latlng,
    'county' => $r->property->county,
    'year_built' => $r->property->year_built,
    'sqft' => $r->property->sqft,
    'lotsize' => $r->property->lotsize,
    'beds' => $r->property->beds,
    'baths' => $r->property->baths,
    'listdesc' => $r->property->listdesc,
    'pool_spa' => $r->property->pool_spa,
    'occupancy' => $r->property->occupancy,
    'lockbox_combo' => $r->property->lockbox_combo,
    'alarm_code' => $r->property->alarm_code,
    'asset_manager' => $r->property->asset_manager,
    'purchase_close_date' => $r->property->purchase_close_date,
    'purchase_cost' => $r->property->purchase_cost,
    'entity_vesting' => $r->property->entity_vesting,
    'lender' => $r->property->lender,
    'rehab_estimate' => $r->property->rehab_estimate,
    'arv' => $r->property->arv,
    'is_listed' => $r->property->is_listed,
    'listing_date' => $r->property->listing_date,
    'list_price' => $r->property->list_price,
    'escrow_price' => $r->property->escrow_price,
    'sale_close_date' => $r->property->sale_close_date
  );
  foreach ($column_names as $key => $value) {
    $result = $db->updateRow($tabble_name, $key, $value, 'pid', $pid);
  }
  if ($result != NULL) {
      $response["status"] = "success";
      $response["message"] = "Property was updated";
      echoResponse(200, $response);
  } else {
      $response["status"] = "error";
      $response["message"] = "Failed to update property";
      echoResponse(201, $response);
  }
});

$app->post('/deleteImage', function() use ($app) {
  $db = new DbHandler();
  $img = json_decode($app->request->getBody());
  $db->removeImage($img->img);
  $file_to_delete = "uploads/".$img->img;
  $result = unlink($file_to_delete);
  if ($result != NULL) {
    $response["status"] = "success";
    $response["message"] = "Image Deleted";
    echoResponse(200, $response);
  } else {
    $response["status"] = "error";
    $response["message"] = "Image failed to delete. Please try again";
    echoResponse(201, $response);
  }

});

$app->post('/deleteProperty', function() use ($app){
  $db = new DbHandler();
  $r = json_decode($app->request->getBody());
  $pid = $r->property->pid;
  $images = $r->property->images;
  for ($i = 0; $i < count($images); $i++) {
    $db->removeImage($images[$i]);
  }
  $result = $db->removeRow($pid);
  if ($result != NULL) {
    $response["status"] = "success";
    $response["message"] = "Property has been removed from the database";
    echoResponse(200, $response);
  } else {
    $response["status"] = "error";
    $response["message"] = "Property failed to delete. Please try again.";
    echoResponse(201, $response);
  }
});

// REHABS
$app->get('/rehab', function() use ($app) {
  $db = new DbHandler();
  $rehabs = $db->getJoinedRehabTable();
  echoResponse(200, $rehabs);
});


$app->post('/updateRehab', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $table = $r->change->table;
    $rehab_id = $r->change->rehab_id;
    $where = "rehab_id";
    $column = $r->change->column;
    $value = $r->change->value;
    $result = $db->changeSettings($rehab_id, $where, $column, $value, $table);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Rehab updated.";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Couldn't update rehab. Please refresh and try again.";
        echoResponse(201, $response);
    }
});


// property inquiry form post
$app->post('/formSend', function() use ($app) {
    $to = "paulturnerblatchley@gmail.com";
    $r = json_decode($app->request->getBody());
    $fromName  = $r->formData->name;
    $fromEmail = $r->formData->email;
    $subject   = "CHL Inquiry about:" . $r->formData->property;
    $message   = $r->formData->message;
    $headers = 'From: '. $fromName . '<'. $fromEmail . '>' . "\r\n";
    $headers .= 'Reply-To: '. $fromName . '<'. $fromEmail . '>' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $result = mail($to, $subject, $message, $headers);
    if ($result) {
        $response["status"] = "success";
        $response["message"] = "Message Sent";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Message failed to send. Please try again.";
        $response["to"] = $to;
        $response["fromName"] = $fromName;
        $response["fromEmail"] = $fromEmail;
        $response["subject"] = $subject;
        $response["test"] = $message;
        $response["headers"] = $headers;
        $response["result"] = $result;
        echoResponse(201, $response);
    }
});

$app->post('/comments', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $comment = $r->comment->comment;
    $property_pid = $r->comment->property_id;
    $user_id = $r->comment->user_id;
    $tabble_name = "comments";
    $column_names = array('comment', 'properties_pid', 'users_uid');
    $result = $db->insertComment($r->comment, $column_names, $tabble_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Your comment has been added";
        $response["pid"] = $result;
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to post comment. Please try again";
        echoResponse(201, $response);
    }
});

$app->get('/comments', function() use ($app) {
  $db = new DbHandler();
  $table = "comments";
  $comments = $db->getTable($table);
  echoResponse(200, $comments);
});

$app->get('/users', function() use ($app) {
  $db = new DbHandler();
  $table = "users";
  $users = $db->getTable($table);
  echoResponse(200, $users);
});

/*
 * Bids
 *******/
$app->get('/categories', function() use ($app) {
  $db = new DbHandler();
  $table = "categories";
  $categories = $db->getTable($table);
  echoResponse(200, $categories);
});

$app->post('/addCategory', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $cat = $r->cat;
    $table_name = "categories";
    $column_name = "cat_name";
    $result = $db->insertString($cat, $column_name, $table_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Your category has been added";
        $response["cat_id"] = $result;
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to create category. Please try again";
        echoResponse(201, $response);
    }
});

$app->get('/tasks', function() use ($app) {
  $db = new DbHandler();
  $table = "tasks";
  $tasks = $db->getTable($table);
  echoResponse(200, $tasks);
});

$app->post('/addTask', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $task_name = $r->task->task_name;
    $units = $r->task->units;
    $table_name = "tasks";
    $column_names = array('task_name', 'task_units');
    $result = $db->insertComment($r->task, $column_names, $table_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "Your task has been added";
        $response["task_id"] = $result;
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to create task. Please try again";
        echoResponse(201, $response);
    }
});

$app->get('/openBids', function() use ($app) {
  $db = new DbHandler();
  $bids = $db->getOpenBids();
  echoResponse(200, $bids);
});

$app->post('/bids', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $bid_pid = $r->bid->pid;
    $bid_cat_id = $r->bid->category->cat_id;
    if (!$bid_cat_id) {
        $response["status"] = "error";
        $response["message"] = "Please Select A Category";
        echoResponse(201, $response);
    }
    $tasks = $r->bid->tasks;
    $table_name = "open_bids";
    $column_names = array('bid_pid', 'bid_cat_id');
    $column_values = array($bid_pid, $bid_cat_id);
    $bid_result = $db->insertValues($column_values, $column_names, $table_name);
    if ($bid_result != NULL) {
        $table_name = "bid_tasks";
        $total_tasks = count((array)$tasks);
        for ($i = 0; $i < $total_tasks; $i++) {
            $column_names = array('bid_id', 'task_id', 'description', 'qty');
            $column_values = array($bid_result, $tasks[$i]->task_id, $tasks[$i]->desc, $tasks[$i]->qty);
            $task_result = $db->insertValues($column_values, $column_names, $table_name);
        }
        if ($task_result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Your Bid has been created";
            $response["bid_id"] = $bid_result;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create bid. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to create bid. Please try again";
        echoResponse(201, $response);
    }
});

$app->post('/escrow', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();
    $pid = $r->escrow->pid;
    $day = $r->escrow->day;
    $task_name = $r->escrow->task_name;
    $table_name = "escrow";
    $column_name = "pid";
    $day_table = "escrow_" . $day;
    $isRowExists = $db->getOneRecord("select escrow_id from " . $table_name . " where pid='" . $pid . "'");
    if (!$isRowExists) {
        $escrow_id = $db->insertString($pid, $column_name, $table_name);
        $db->initEscrowTableRow($escrow_id,"escrow_day01");
        $db->initEscrowTableRow($escrow_id,"escrow_day03");
        $db->initEscrowTableRow($escrow_id,"escrow_day07");
        $db->initEscrowTableRow($escrow_id,"escrow_day12");
        $db->initEscrowTableRow($escrow_id,"escrow_day15");
        $db->initEscrowTableRow($escrow_id,"escrow_day21");
        $db->initEscrowTableRow($escrow_id,"escrow_day23");
    } else {
        $escrow_id = $isRowExists['escrow_id'];
    }
    if ($escrow_id != NULL) {
        $response["status"] = "success";
        $response["message"] = "Pid Inserted";
        $response["escrow_id"] = $escrow_id;
        echoResponse(200, $response);

        $isRowExists = $db->getOneRecord("select 1 from " . $table_name . " where escrow_id='" . $escrow_id . "'");
        $where = "escrow_id";
        if (!$isRowExists) {
            // Do Nothing
        } else {
            if (property_exists($r->escrow, "date")) {
                $date = $r->escrow->date;
                $task_name_date = $task_name . "_date";
                $result = $db->changeSettings($escrow_id,$where, $task_name_date, $date, $day_table);  
            } else if (property_exists($r->escrow, "inspection")) {
                $inspection = $r->escrow->inspection;
                $home_inspect = "home_inspect";
                $result = $db->changeSettings($escrow_id,$where, $home_inspect, $inspection, $day_table);
            } else if (property_exists($r->escrow, "status")) {
                $status = $r->escrow->status;
                $result = $db->changeSettings($escrow_id,$where, $task_name, $status, $day_table);
            }            
        }
        
        if ($result != NULL) {
            $response["status"] = "success";
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "It didn't work...";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "Pid could not be inserted";
        echoResponse(201, $response);
    }
});

$app->get('/escrowProgress', function() use ($app) {
  $db = new DbHandler();
  $progress = $db->getEscrowProgress();
  echoResponse(200, $progress);
});

$app->post('/enroll', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('first_name', 'last_name', 'email', 'phone', 'bre'),$r->agent);
    $db = new DbHandler();
    $first_name = $r->agent->first_name;
    $last_name = $r->agent->last_name;
    $email = $r->agent->email;
    $phone = $r->agent->phone;
    $bre = $r->agent->bre;
    $mls_id = $r->agent->mls_id;
    $early_showing = $r->agent->early_showing;
    $open_house = $r->agent->open_house;
    $sb = $r->agent->sb;
    $riv = $r->agent->riv;
    $la = $r->agent->la;
    $sd = $r->agent->sd;
    $isAgentExists = $db->getOneRecord("select 1 from agents where phone='$phone' or email='$email'");
    if(!$isAgentExists){
        $tabble_name = "agents";
        $column_names = array('first_name', 'last_name', 'email', 'phone', 'bre', 'mls_id', 'early_showing', 'open_house', 'sb', 'riv','la','sd');
        $result = $db->insertIntoTable($r->agent, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Enrollment Success";
            $response["uid"] = $result;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Enrollment Failed. Please try again later";
            echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "An agent with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});

$app->get('/agents', function() use ($app) {
  $db = new DbHandler();
  $table = "agents";
  $agents = $db->getTable($table);
  echoResponse(200, $agents);
});

$app->post('/sendEmail', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $db = new DbHandler();

    // Email Headers
    $headers = "From: Codrin Mihai <codrin@structuredcapital.net> \r\n";
    $headers .= "Reply-To: codrin@structuredcapital.net \r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Email Subject & Content
    $subject = $r->email->subject;
    $content = $r->email->content;

    // Property Info
    $address = $r->email->property->address;
    $city = $r->email->property->city;
    $zip = $r->email->property->zip;
    $price = $r->email->property->list_price;
    $commission = $r->email->commission;
    $listdesc = $r->email->property->listdesc;
    $beds = $r->email->property->beds;
    $baths = $r->email->property->baths;
    $parking_spaces = $r->email->property->parking_spaces;
    $county = $r->email->property->county;
    $sqft = $r->email->property->sqft;
    $agent_name = $r->email->property->agent_name;
    $year_built = $r->email->property->year_built;
    $lotsize = $r->email->property->lotsize;
    $school_district = $r->email->property->school_district;
    $broker = $r->email->property->broker;
    $appliances = $r->email->property->appliances;
    $interior = $r->email->property->interior;
    $exterior = $r->email->property->exterior;
    $images = $r->email->property->images;

    // Contact Info
    $contact_name = $r->email->contact_name;
    $contact_number = $r->email->contact_number;
    $contact_email = $r->email->contact_email;

    $recipients = $r->email->to;
    for ($i=0; $i < count($recipients); $i++) {
        $to = $recipients[$i]->email;
        // Message
        $message = '<html><body>';
        $message .= '<div style="font-family:Helvetica,Arial,sans-serif;max-width:550px;margin: 0 auto;">';
        $message .= '<p>Hi ' . $recipients[$i]->first_name . ',</p>';
        $message .= '<p  style="padding: 20px 0 0; white-space: pre-wrap;">' . $content . '</p>';
        $message .= '<div style="width: 100%;height:auto;max-height:350px;overflow:hidden; margin-top: 20px;">';
        $message .= '<img style="width: 100%; height: auto;margin-top:-80px;" src="http://structuredcapital.net/server/v1/uploads/exterior.png">';
        $message .= '</div>';
        $message .= '<div style="padding: 20px 0">';
        $message .= '<h1 style="font-weight:300;">PRE-MLS Listing!</h1>';
        $message .= '<h2 style="padding:10px 0">' . $address . '<br>' . $city . ', CA ' . $zip . '</h2>';
        $message .= '<h4 style="padding:10px 0">Listing Price: ' . $price . '</h4>';
         $message .= '<h5 style="padding:10px 0">Licensed Agent Commission: ' . $commission . '</h5>';
        $message .= '<p style="max-width:550px">'.$listdesc.'</p>';
        $message .= '</div>';
        $message .= '<hr>';
        $message .= '<div style="padding: 12px 0">';
        $message .= '<h1>Features</h1>';
        $message .= '<p style="max-width:550px">';
        $message .= '<ul style="line-height: 1.5">';
        $message .= '<li><b style="font-weight:bold">Beds:</b> ' . $beds . '</li>';
        $message .= '<li><b style="font-weight:bold">Parking Spaces:</b> ' . $parking_spaces . '</li>';
        $message .= '<li><b style="font-weight:bold">Subdivision:</b> ' . $county . '</li>';
        $message .= '<li><b style="font-weight:bold">Square Footage:</b> ' . $sqft . '</li>';
        $message .= '<li><b style="font-weight:bold">Agent Name: </b> ' . $agent_name . '</li>';
        $message .= '<li><b style="font-weight:bold">Baths:</b> ' . $baths . '</li>';
        $message .= '<li><b style="font-weight:bold">Year Built:</b> ' . $year_built . '</li>';
        $message .= '<li><b style="font-weight:bold">Lot Size: </b>' . $lotsize . '</li>';
        $message .= '<li><b style="font-weight:bold">School District:</b> ' . $school_district . '</li>';  
        $message .= '<li><b style="font-weight:bold">Broker:</b> ' . $broker . '</li>';
        $message .= '</ul>';
        $message .= '</p>';
        $message .= '</div>';
        $message .= '<hr>';
        $message .= '<div style="padding: 12px 0">';
        $message .= '<h1>Attributes</h1>';
        $message .= '<h4>Appliances</h4>';
        $message .= '<ul>';
        foreach ($appliances as $val) {
            $message .= '<li>' . $val . '</li>';
        }
        $message .= '</ul>';
        $message .= '<h4>Interior Amenities</h4>';
        $message .= '<ul>';
        foreach ($interior as $val) {
            $message .= '<li>' . $val . '</li>';
        }
        $message .= '</ul>';
        $message .= '<h4>Exterior Amenities</h4>';
        $message .= '<ul>';
        foreach ($exterior as $val) {
            $message .= '<li>' . $val . '</li>';
        }
        $message .= '</ul>';
        $message .= '</div>';
        $message .= '<hr>';
        $message .= '<div style="padding: 12px 0">';
        $message .= '<h1>Contact Information</h1>';
        $message .= '<p style="padding: 5px 0;">' . $contact_name . '</p>';
        $message .= '<p style="padding: 5px 0;">' . $contact_number . '</p>';
        $message .= '<p style="padding: 5px 0;">' . $contact_email . '</p>';
        $message .= '</div>';
        $message .= '<hr>';
        $message .= '<div style="padding: 12px 0">';
        $message .= '<h1>Photos</h1>';
        $message .= '<div class="display: flex">';
        foreach ($images as $val) {
            $message .= '<img style="width: 33%;height:auto;" src="http://structuredcapital.net/server/v1/uploads/' . $val . '">';
        }
        $message .= '</div>';
        $message .= '</div>';
        $message .= '</div>';
        $message .= '</body></html>';
        $sent = mail($to, $subject, $message, $headers);
        if ($sent) {
            $success = true;
        } else {
            $success = false;
        }
           
    }
    if ($success) {
        $response["status"] = "success";
        $response["message"] = "All Emails Sent Successfully";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "One or More Emails Failed to Send";
        echoResponse(201, $response);
    }
});

?>