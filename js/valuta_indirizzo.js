w3IncludeHTML();
var lat, lng,place,indirizzo;
$(document).ready(function() {

    function initialize() {
            var input2 = document.getElementById('search_view_2');
            var autocomplete2 = new google.maps.places.Autocomplete(input2);

                        google.maps.event.addListener(autocomplete2, 'place_changed',
                                function() {
                                    place = autocomplete2.getPlace();
                                    lat = place.geometry.location.lat();
                                    lng = place.geometry.location.lng();
                                    indirizzo = place.address_components[0].long_name;
                                    initializeMap(lat, lng);
                                } 
                            );
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    
    
    function initializeMap(lat, lng) {
        var location = new google.maps.LatLng(lat,lng);
        var mapCanvas = document.getElementById('map_canvas');
        var map_options = {
          center: location,
          zoom: 15,
         /* mapTypeId: google.maps.MapTypeId.ROADMAP */
            styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: -80 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            },{
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                { hue: '#388e3c' },
                { saturation: 80 }
              ]
            }
          ]

        }
        var map = new google.maps.Map(map_canvas, map_options);

        new google.maps.Marker({
            position: location,
            map: map,
            icon:'img/man.png'
            /* animation:google.maps.Animation.BOUNCE */
        });
    }
    
    

    
    $('#valuta').click(function(event){
        validation = true;
        
        var nome = $("#nome").val();
        var cognome = $("#cognome").val();
        var eta = $("#eta").val();
            var e = document.getElementById("sesso");
        var sesso = e.options[e.selectedIndex].value;
        var opinione = $("#opinione").val();
        
        var green = $('#input-green').val();
        var social = $('#input-social').val();
        var commercial = $('#input-commercial').val();
        var services = $('#input-services').val();
        
        validation = validateField(nome,"nome");
        validation = validateField(eta,"eta");
        validation = validateField(lat,"search_view_2");
        validation = validateField(opinione,"opinione");
        
        if(opinione.length>30){
            alert("Sono consentiti massimo 30 caratteri per esprimere la tua opinione. Per favore, correggila.");
            validation = false;
        }
   

        if(validation == true){
            
        $.ajax({
            
          type: "POST",
          url: "http://liveinlecce.com/valuta_indirizzo.php",
          data: "nome=" + nome + "&cognome=" + cognome + "&eta=" + eta + "&lat=" + lat + "&lon=" + lng + "&sesso=" + sesso + "&indirizzo=" + indirizzo + "&opinione=" + opinione + "&green=" + green + "&social=" + social + "&commercial=" + commercial + "&services=" + services ,                                     
          dataType: "text",
          success: function(msg)
          {
            var json = msg;
            var jsonData = JSON.parse(json);
            var risposta = jsonData.Risultato;
            if(risposta=="ok"){
                
                $("#main_content").html("");
                $("#main_content").append("La registrazione della sua opinione è avvenuta correttamente! <br>La sua opinione permetterà una stima del livello della qualità della vita migliore.<br> La ringraziamo per l'aiuto. <br><br>A breve sarà reindirizzato in Homepage."); 
                setTimeout(function() {
                    window.location.assign("index.html");
                }, 7000);
            }
            else{
                var Testo_errore = jsonData.Testo_errore;
                    alert("Errore");
            }
         },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
              }
        });       
            }

    });


});

function validateField(text,field_name) {   
    if (text == null || text == "") {
        document.getElementById(field_name).style.visibility = "visible";
        document.getElementById(field_name).style.border = '1px solid red';
        document.getElementById(field_name).style.boxShadow = '0px 0px 8px red';
        return false;
    }
    return true;
}
