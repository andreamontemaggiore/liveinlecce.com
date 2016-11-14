 <?php
header("Access-Control-Allow-Origin: *");

$servername = "lhcp1061.webapps.net";
$username = "mb1x2pg6_danidix";
$password = "#r8$]5";
$dbname = "mb1x2pg6_leccce";


$nome_utente     = $_POST['nome_utente'];
$password_utente = $_POST['password'];


//--- Connessione al DB per ricevere la psw associata allo user ---//
$conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connessione fallita: " . $conn->connect_error);
    }


$query = "SELECT * FROM amministratori WHERE nome_utente= \"".$nome_utente."\"";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        if ( $row[nome_utente] == $password_utente  ) {
            $response = array("Risultato"=>"ok");  
         }        
        else{
            $response = array("Risultato"=>"no");

        }
    }
} else {
    $response = array("Risultato"=>"no");
}


$risultato = json_encode($response);
print($risultato);

?> 