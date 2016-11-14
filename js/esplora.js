w3IncludeHTML();
$(document).ready(function() {

    

    
    $('#thead').css('color',"white");
    
// ************************************************* RECUPERO I DATI DAL DB E LI VISUALIZZO        
    $.ajax({
      type: "POST",
      url: "http://liveinlecce.com/distanza_punti.php",
      data: "user=2",
      dataType: "text",
      success: function(msg)
      {
		  
		var json = msg;
		var jsonData = JSON.parse(json);
          
        social = jsonData.social;
        green  = jsonData.green;
        commercial  = jsonData.commercial;
        services  = jsonData.services;
          
        green_info = "Nella categoria Green sono comprese: le aree adatte al passeggio e divertimento dei cani, i parchi giochi per i bambini ed i giardini dove poter praticare sport all'aria aperta.";      
        social_info = "Nella categoria Social sono compresi: i centri giovanili, le sale cinematografiche, gli impianti sportivi, i musei, le piscine ed i teatri.";  
        commercial_info = "Nella categoria Commercial sono comprese: le attività commerciali, le edicole e le farmacie.";  
        services_info = "Nella categoria Services sono comprese: le postazioni di bike sharing, quelle di car sharing, le fermate dell'autobus e le piste ciclabili.";  
        cicloFor(green,"green",green_info);  
            

	 },
      error: function()
      {
		  alert("Si è verificato un errore nella chiamata Ajax");		
      }
    });
    
    

});



function cicloFor(jsonData,brColor,info){
    var tipo_struttura ="";
    var strutture_trovate = new Array();
    
    $("#info-tab").html("");
    $("#info-tab").append(info);
    $('#thead').css('background-color',brColor);
    
      if (jsonData.length > 0) {
                      
					  $("#tbody").html("");
                      for(var i = 0; i < jsonData.length; i++) {
                          $("#tbody").append('<tr>'+
                                             '<td>' + jsonData[i].nome + '</td>'+
                                             '<td>' + jsonData[i].indirizzo + '</td>'+
                                             '<td>' + jsonData[i].tipo_struttura + '</td>'+
                                             '</tr>'
                                            );
                    }                  
      }

    }

// ************************************************* GESTISCO I CLICK SULLE MACRO-CATEGORIE
    $('#green').click(function(){
        cicloFor(green,"green",green_info);
    });
    $('#social').click(function(){
        cicloFor(social,"blue",social_info);
    });
    $('#commercial').click(function(){
        cicloFor(commercial,"#f44336",commercial_info);
    });
    $('#services').click(function(){
        cicloFor(services,"#f0d457",services_info);
    });




// ************************************************* RECUPERA I VALORI GET DELL'URL
function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  alert('Query Variable ' + variable + ' not found');
}

