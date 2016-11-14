$(document).ready(function() {
    
    // PERMETTE DI VISUALIZZARE IL PANNELLO PER RECUPERARE LA PASSWORD
    $("#visualizza_pannello").click(function(){
        document.getElementById('login-panel').style.visibility='hidden';
        document.getElementById('login-panel').style.height='0';
        document.getElementById('recupera-password-panel').style.height='100%';
        document.getElementById('recupera-password-panel').style.visibility='visible';
    });
    
    
  // PERMETTE DI EFFETTUARE IL LOGIN    
  $("#effettua_login").click(function(){
      
    var nome_utente = $("#nome_utente").val();
    var password = $("#password").val();
	
    $.ajax({
      type: "POST",
      url:  "http://liveinlecce.com/amministratori.php",
      data: "nome_utente=" + nome_utente + "&password=" + password ,
      dataType: "text",
      success: function(msg)
      {
		  
		var json = msg;
		var jsonData = JSON.parse(json);
        var risposta = jsonData.Risultato;
           
		if(risposta=="ok"){
				
            window.location.assign("http://liveinlecce.com/dashboard.html");
            
                
		}
		else{
            alert("Errore di connessione al DB");
		}
        
	 },
      error: function()
      {
		  alert("Hai inserito il nome utente o la password errati");		
      }
    });
  });
  
  
});

