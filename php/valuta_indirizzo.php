 <?php
header("Access-Control-Allow-Origin: *");

$servername = "lhcp1061.webapps.net";
$username = "mb1x2pg6_danidix";
$password = "#r8$]5";
$dbname = "mb1x2pg6_leccce";


$nome       = $_POST['nome'];
$cognome    = $_POST['cognome'];
$eta        = $_POST['eta'];
$sesso      = $_POST['sesso'];
$lat        = $_POST['lat'];
$lon        = $_POST['lon'];
$indirizzo  = $_POST['indirizzo'];
$opinione   = $_POST['opinione'];
$green      = $_POST['green'];
$social     = $_POST['social'];
$commercial = $_POST['commercial'];
$services   = $_POST['services'];
$data       = date('Y-m-d H:i:s');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "INSERT INTO valutazioni (nome, cognome, eta, sesso, lat, lon, indirizzo, opinione, green, social, commercial, services,data) VALUES ('". $nome."','".$cognome."','".$eta."','".$sesso."','".$lat."','".$lon."','".$indirizzo."','".$opinione."','".$green."','".$social."','".$commercial."','".$services."','".$data."')";
   



if ($conn->query($sql) === TRUE) {
    $response = array("Risultato"=>"ok");
} else {
    $response = array("Risultato"=>"no");
}
 


        
$risultato = json_encode($response);
print($risultato);

?> 