<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// ini_set('display_errors', 'On');

require 'database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();


function get() {
    global $conn;
   $sql =  "SELECT * FROM `players`"; 

    $stmt = $conn->prepare($sql);

$stmt->execute();

//CHECK WHETHER THERE IS ANY Player IN OUR DATABASE
if($stmt->rowCount() > 0){
    // CREATE PlayerS ARRAY
    $playersArr = [];
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $players_data = [
            'id' => $row['id'],
            'name' => $row['name'],
            'status' => $row['status'],
            'captain' => $row['captain'],
            'pace' => $row['pace'],
            'shooting' => $row['shooting'],
            'passing' => $row['passing'],
            'dribbling' => $row['dribbling'],
            'defending' => $row['defending'],
            'physicality' => $row['physicality'],
            'total' => $row['total'],
            'tcolor' => $row['tcolor'],
        ];
        // PUSH players DATA IN OUR $players ARRAY
        array_push($playersArr, $players_data);
    }
    //SHOW POST/POSTS IN JSON FORMAT
    echo json_encode($playersArr, JSON_NUMERIC_CHECK);
 

}
else{
    //IF THER IS NO Player IN OUR DATABASE
    // echo json_encode(['message'=>'No Player found']);
    echo json_encode([]);
}
}
function checkData($data, $key){
    if(isset($data->$key) && !empty($data->$key)){

        return true;
    }else{
        return false;
    }
}
function post() {
    global $conn;
    // GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));

//CREATE MESSAGE ARRAY AND SET EMPTY
$msg['message'] = '';

        if(isset($data->name) && isset($data->status) && isset($data->captain) && isset($data->pace)
&& isset($data->shooting) && isset($data->passing) && isset($data->dribbling) && isset($data->defending) 
&& isset($data->physicality) && isset($data->total) && isset($data->tcolor)
){
        $insert_query = "INSERT INTO `players`(name,status,captain,pace,shooting,passing,dribbling,defending,physicality,total,tcolor) 
        VALUES(:name,:status,:captain,:pace,:shooting,:passing,:dribbling,:defending,:physicality,:total,:tcolor)";
        $insert_stmt = $conn->prepare($insert_query);
        // DATA BINDING
        $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($data->name)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':status', htmlspecialchars(strip_tags($data->status)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':captain', htmlspecialchars(strip_tags($data->captain)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':pace', htmlspecialchars(strip_tags($data->pace)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':shooting', htmlspecialchars(strip_tags($data->shooting)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':passing', htmlspecialchars(strip_tags($data->passing)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':dribbling', htmlspecialchars(strip_tags($data->dribbling)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':defending', htmlspecialchars(strip_tags($data->defending)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':physicality', htmlspecialchars(strip_tags($data->physicality)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':total', htmlspecialchars(strip_tags($data->total)),PDO::PARAM_STR);
        $insert_stmt->bindValue(':tcolor', htmlspecialchars(strip_tags($data->tcolor)),PDO::PARAM_STR);
        
        if($insert_stmt->execute()){
            $msg['message'] = 'Data Inserted Successfully';
        }else{
            $msg['message'] = 'Data not Inserted';
        } 
}
else{
    $msg['message'] = 'Please fill all the fields';
}
echo json_encode([]);

}

function put() {
        global $conn;
    // GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
    //CHECKING, IF ID AVAILABLE ON $data
if(isset($data->id)){
    
    $msg['message'] = '';
    $player_id = $data->id;
    $update_stmt = $conn->prepare("UPDATE players 
    SET name = '$data->name',
     status = '$data->status',
     captain = '$data->captain',
     pace = '$data->pace',
     shooting = '$data->shooting',
     passing = '$data->passing',
     dribbling = '$data->dribbling',
     defending = '$data->defending',
     physicality = '$data->physicality',
     total = '$data->total',
     tcolor = '$data->tcolor'
    WHERE id = '$player_id'");
    // $stmt->execute(array()); 
    
        
        if($update_stmt->execute()){
            $msg['message'] = 'Data updated successfully';
        }else{
            $msg['message'] = 'data not updated';
        }   
        

    
    echo  json_encode($msg);
    
}
}

function delete() {
     global $conn;
    // GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
    //CHECKING, IF ID AVAILABLE ON $data
if(isset($data->id)){
    $msg['message'] = '';
    
    $player_id = $data->id;
    
    $delete_player = "DELETE FROM `players` WHERE id=:player_id";
        $delete_player_stmt = $conn->prepare($delete_player);
        $delete_player_stmt->bindValue(':player_id', $player_id,PDO::PARAM_INT);
        
        if($delete_player_stmt->execute()){
            $msg['message'] = 'Player Deleted Successfully';
        }else{
            $msg['message'] = 'Player Not Deleted';
        }
    // ECHO MESSAGE IN JSON FORMAT
    echo  json_encode($msg);
    
}
}

function notHandle() {
    echo json_encode($result);
}




$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        get();
        break;
    case 'POST':
        post();
        break;
    case 'PUT':
        put();
        break;
    case 'DELETE':
        delete();
        break;
    default:
        notHandle();
        break;
}
?>