 <?php
header("Access-Control-Allow-Origin: *");

$servername = "lhcp1061.webapps.net";
$username = "mb1x2pg6_danidix";
$password = "#r8$]5";
$dbname = "mb1x2pg6_leccce";


$nome           = $_POST['nome'];
$cognome        = $_POST['cognome'];
$lat            = $_POST['lat'];
$lon            = $_POST['lon'];
$email          = $_POST['email'];
$telefono       = $_POST['telefono'];
$segnalazione   = $_POST['segnalazione'];
$data           = date('Y-m-d H:i:s');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "INSERT INTO segnalazioni (nome, cognome, lat, lon, email, telefono, segnalazione,data) VALUES ('". $nome."','".$cognome."','".$lat."','".$lon."','".$email."','".$telefono."','".$segnalazione."','".$data."')";
   



if ($conn->query($sql) === TRUE) {
    $response = array("Risultato"=>"ok");
} else {
    $response = array("Risultato"=>"no");
}
 


        
$risultato = json_encode($response);
print($risultato);

?> 