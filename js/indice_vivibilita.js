w3IncludeHTML();

$(document).ready(function() {
    
// ************************************************* NASCONDO TUTTE LE SCHEDE CHE NON SIANO LA PRINCIPALE
    $('#row_blue').css('display','none');
    $('#row_red').css('display','none');
    $('#row_yellow').css('display','none');
    

    $('.first.circle').circleProgress({
      value: 0.35,
      animation: false,
      fill: {gradient: ['#ff5f43' , '#ff1e41']}
    });

    var c4 = $('.forth.circle');

    c4.circleProgress({
      startAngle: -Math.PI / 4 * 3,
      value: 0.5,
      lineCap: 'round',
      fill: {color: '#ffa500'}
    });

    // let's emulate dynamic value update
    setTimeout(function() { c4.circleProgress('value', 0.7); }, 1000);
    setTimeout(function() { c4.circleProgress('value', 1.0); }, 1100);
    setTimeout(function() { c4.circleProgress('value', 0.5); }, 2100);

    /*
     * Example 5:
     *
     * - image fill; image should be squared; it will be stretched to SxS size, where S - size of the widget
     * - fallback color fill (when image is not loaded)
     * - custom widget size (default is 100px)
     * - custom circle thickness (default is 1/14 of the size)
     * - reverse drawing mode
     * - custom animation start value
     * - usage of "data-" attributes
     */
    $('.fifth.circle').circleProgress({
      value: 0.7
      // all other config options were taken from "data-" attributes
      // options passed in config object have higher priority than "data-" attributes
      // "data-" attributes are taken into account only on init (not on update/redraw)
      // "data-fill" (and other object options) should be in valid JSON format
    });
    
    
// ************************************************* RECUPERO LATITUDINE E LONGITUDINE
    var lat = getQueryVariable("lat");
    var lng = getQueryVariable("lng");

// ************************************************* INIZIALIZZO E VISUALIZZO LA MAPPA
    function initialize(lat, lng) {
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
    google.maps.event.addDomListener(window, 'load', initialize(lat,lng));
    
// ************************************************* VISUALIZZO IL GRAFICO
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('#grafico').highcharts('StockChart', {


            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Rilevazioni giornaliere centraline'
            },

            series: [{
                name: 'AAPL',
                data: data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
    
// ************************************************* GESTISCO I CLICK SULLE CARDS
// Al click su una scheda, nascondo il dettaglio di quella attualmente visualizzata e visualizzo quella cliccata..    
    $('#green').click(function(){
        $('#row_blue').css('display','none');
        $('#row_red').css('display','none');
        $('#row_yellow').css('display','none');
        $('#row_green').css('display','block');
        document.getElementById('anchor_row_dettagli').scrollIntoView();
    });
    
    $('#blue').click(function(){
        $('#row_green').css('display','none');
        $('#row_red').css('display','none');
        $('#row_yellow').css('display','none');
        $('#row_blue').css('display','block');
        document.getElementById('anchor_row_dettagli').scrollIntoView();
    });
    
    $('#red').click(function(){
        $('#row_green').css('display','none');
        $('#row_blue').css('display','none');
        $('#row_yellow').css('display','none');
        $('#row_red').css('display','block');
        document.getElementById('anchor_row_dettagli').scrollIntoView();
    });
    
    $('#yellow').click(function(){
        $('#row_green').css('display','none');
        $('#row_blue').css('display','none');
        $('#row_red').css('display','none');
        $('#row_yellow').css('display','block');
        document.getElementById('anchor_row_dettagli').scrollIntoView();
    });
    
// ************************************************* ANIMO I COMMENTI INVIATI DALLE PERSONE   
    
    $('#rotate_user').rotaterator({fadeSpeed:500, pauseSpeed:5000});
    $('#rotate_review').rotaterator({fadeSpeed:500, pauseSpeed:5000});

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
        var raggio_scelto = 5; // 5 Km
        
        
        var social = jsonData.social;
        var green  = jsonData.green;
          
          
            var strutture_green = cicloFor(green,lat,lng,raggio_scelto);
                // CREO LA "GRIGLIA" RIASSUNTIVA DELLE STRUTTURE PRESENTI IN QUELLA DETERMINATA AREA 
                nomi_strutture_singolare = ["area_cani", "area_giochi"];
                nomi_strutture_plurale   = ["aree cani", "aree giochi"];
                punteggio_green = populate(raggio_scelto,strutture_green,nomi_strutture_singolare,nomi_strutture_plurale); 
                $('.second.circle').circleProgress({
                  value: punteggio_green
                }).on('circle-animation-progress', function(event, progress) {
                  $(this).find('strong').html(parseInt(100 * punteggio_green) + '<i>%</i>');
                });
          
            var strutture_social = cicloFor(social,lat,lng,raggio_scelto);
                // CREO LA "GRIGLIA" RIASSUNTIVA DELLE STRUTTURE PRESENTI IN QUELLA DETERMINATA AREA 
                nomi_strutture_singolare = ["centro_giovanile", "cinema", "impianto_sportivo", "museo", "piscina", "teatro"];
                nomi_strutture_plurale   = ["centri giovanili", "sale cinematografiche", "impianti sportivi", "musei", "piscine", "teatri"];
                punteggio_social = populate(raggio_scelto,strutture_social,nomi_strutture_singolare,nomi_strutture_plurale); 
                $('.third.circle').circleProgress({
                  value: punteggio_social,
                  fill: {gradient: [['#0681c4', .5], ['#4ac5f8', .5]], gradientAngle: Math.PI / 4}
                }).on('circle-animation-progress', function(event, progress, stepValue) {
                  $(this).find('strong').html(parseInt(100 * punteggio_social) + '<i>%</i>');
                });

              
                 
        
	 },
      error: function()
      {
		  alert("Si è verificato un errore Ajax");		
      }
    });
    
    

});

function cicloFor(jsonData,lat,lng,raggio_scelto){
    var tipo_struttura ="";
    var strutture_trovate = new Array();
      if (jsonData.length > 0) {
					 
                      for(var i = 0; i < jsonData.length; i++) {
                        
						if(jsonData[i].tipo_struttura==tipo_struttura){			
							    // Calcolo la distanza tra la via indicata dall'utente e 
                                // la struttura analizzata
								var distanza = distance(lat, lng, jsonData[i].lat, jsonData[i].lon);
                                // Se la struttura si trova all'interno del raggio di tot. Km, allora..
								if(Math.floor(distanza)<raggio_scelto){
                                    strutture_trovate[tipo_struttura]++;
                                }    
                         }		
                        else{
                            tipo_struttura = jsonData[i].tipo_struttura;
                            var distanza = distance(lat, lng, jsonData[i].lat, jsonData[i].lon);	
                                // Se la struttura si trova all'interno del raggio di tot. Km, allora..
								if(Math.floor(distanza)<raggio_scelto){
                                    strutture_trovate[tipo_struttura] = 1;
                                }   
                                else{
                                    strutture_trovate[tipo_struttura] = 0;
                                }   
						}				
				    
                    }                  
      }
    return strutture_trovate;
}



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

// *********************************************** CALCOLA LA DISTANZA TRA DUE PUNTI CON LA FORMULA HEVERSINE
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// *********************************************** POPOLA I DETTAGLI DI OGNI CATEGORIA
function populate(raggio_scelto,strutture_trovate,nomi_strutture_singolare,nomi_strutture_plurale ) {
    
    punteggio = 0;
    step = 1/nomi_strutture_singolare.length;
    
    for(i=0;i<nomi_strutture_singolare.length;i++){
        if(strutture_trovate[ nomi_strutture_singolare[i] ]>0){
            $("#" + nomi_strutture_singolare[i]).append('<img src="img/true.png" alt="true" class="true-false">Ottime notizie, nel raggio di '+ raggio_scelto +" km rispetto l'indirizzo da te inserito sono presenti " + strutture_trovate[ nomi_strutture_singolare[i] ] + " " + nomi_strutture_plurale[i]   );
            punteggio += step;
        }
        else{
            $("#" + nomi_strutture_singolare[i] ).append('<img src="img/false.png" alt="true" class="true-false">Purtroppo nel raggio di '+ raggio_scelto +" km rispetto l'indirizzo da te inserito non sono presenti " + nomi_strutture_plurale[i]);
        }
    }
    
return punteggio;    
}


// *********************************************** GESTISCE LO SLIDER DI FRASI
(function($){
    $.fn.extend({ 
        rotaterator: function(options) {
 
            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 100,
				child:null
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() {
                  var o =options;
                  var obj = $(this);                
                  var items = $(obj.children(), obj);
				  items.each(function() {$(this).hide();})
				  if(!o.child){var next = $(obj).children(':first');
				  }else{var next = o.child;
				  }
				  $(next).fadeIn(o.fadeSpeed, function() {
						$(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
							var next = $(this).next();
							if (next.length == 0){
									next = $(obj).children(':first');
							}
							$(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
						})
					});
            });
        }
    });
})(jQuery);



