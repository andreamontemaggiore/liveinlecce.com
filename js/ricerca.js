$(document).ready(function() {
    w3IncludeHTML();
    function initialize() {
            var input = document.getElementById('search_index');
            var autocomplete = new google.maps.places.Autocomplete(input);

                        google.maps.event.addListener(autocomplete, 'place_changed',
                                function() {
                                    var place = autocomplete.getPlace();
                                    var lat = place.geometry.location.lat();
                                    var lng = place.geometry.location.lng();
                                    //window.location.href = "http://liveinlecce.com/indice_vivibilita.html?lat=" + lat +"&lng=" + lng;
                            window.location.href = "indice_vivibilita.html?lat="+lat+"&lng="+lng;
                                } 
                            );
        }

        google.maps.event.addDomListener(window, 'load', initialize);
});