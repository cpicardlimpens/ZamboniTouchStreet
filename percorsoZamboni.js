var map;
var currentMarker;
var infoWindow;
var markers_list = [];

var c;
var count = -1;
var current_count = 0;
var list_steps = '';

// HERE automatic get from wordpress
var features = [];
var API_BASE_URL = "http://zambonits.limpica.net/wp/wp-json/wp/v2/"



function initMap() {

    $.getJSON( API_BASE_URL+"listings/", function( data ) {
        for (var i=0; i< data.length; i++) {
            var listing = data[i];
            var new_feature = {
                "pos_lat": listing.acf.loc_lat,
                "pos_lng": listing.acf.loc_lng,
                "title": listing.title.rendered,
                "listing_id": String(listing.id),
                "label": (listing.title.rendered).substring(0, 1),
            }
            features.push(new_feature);
        }
        // Sorting the stages according the label
        features.sort(function(a, b){
            var a1= a.label, b1= b.label;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });
        console.log("Got it!",features.length);

        loadMap();

        for (var i = 0, feature; feature = features[i]; i++) {
            addMarker(feature);
        }

        markers_list[current_count].setAnimation(google.maps.Animation.BOUNCE);


        $('#modals').append('<div class="modal fade" id="myModal" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color:rgba(255,255,255,0.2); top:100px">' +
            '<div class="modal-header" style="border-bottom: 0px solid #e5e5e5">' +
            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
            '<h4 class="modal-title">Zamboni Touch Street: Un percorso in 7 Tappe</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<audio controls><source src="sounds/Event2.wav" type="audio/wav"></audio>' +
            '</div>' +
            '</div>' +
            '</div>')
        // myModal opens with button 'i'

        var url = $('#myModal audio').attr('src');
        $('#myModal').on('hide.bs.modal', function(){
            //console.log('close modal '+id);
            jQuery('#myModal audio').removeAttr("src", jQuery('#myModal audio').removeAttr("src"));

        });

        $('#myModal').on('show.bs.modal', function(){
            $('#myModal audio').attr('src', url);
        });
    });
}

function addMarker(f) {
    infoWindow = new google.maps.InfoWindow({
        map: map
    });
    //infoWindow.setOptions({strokeWeight: 2.0, strokeColor: 'green', fillColor: 'green'});
    infoWindow.close();
    //var currentMark;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(f.pos_lat,f.pos_lng), //f.position,
        //icon: f.icon,//pinSymbol('red')
        title: f.title,
        listing_id: f.listing_id,
        label: f.label
    });
    console.log(marker.title + " // "+ marker.label + " // " + marker.listing_id);
    //console.log(marker.listing_id);
    list_steps+=marker.listing_id;
    list_steps+="_";
    markers_list.push(marker);

    attachSecretMessage(marker, marker.title);

}


function attachSecretMessage(marker, secretMessage) {
    marker.addListener('click', function() {
        var id = this.listing_id;
        var label = this.label;
        console.log("id"+id);
        console.log(features[0].listing_id);
        //opens another window
        /*if(label==1) {
            window.open('pano.html#id'+id+'&p'+'&n'+features[label].listing_id,'_self');
        } else if(label==8){
            window.open('pano.html#id'+id+'&p'+features[label-2]+'&n ','_self');
        } else {
            window.open('pano.html#id'+id+'&p'+features[label-2]+'&n'+features[label],'_self');
        }*/
        window.open('pano.html#id'+id+'&l'+list_steps,'_self');

    });
}


/////////////////////////////////////
function ParsingPoints(controlDiv, map) {

    // Set CSS for the control border.
    /*var controlUI = document.createElement('div');

    controlUI.style.boxShadow = '0px 1px 4px -1px rgba(0, 0, 0, 0.298039)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '10px';

    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgba(255,255,255,.75)';
    controlText.style.fontFamily = 'sans-serif';
    controlText.style.fontWeight = 'bold';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Un percorso in 7 Tappe';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: go to points
    controlUI.addEventListener('click', function() {
        if (count < 2) {
            count++;
            if (current_count > -1) markers_list[current_count].setAnimation(null);
            current_count = count;
            markers_list[current_count].setAnimation(google.maps.Animation.BOUNCE);
            controlText.style.color = 'rgba(255,155,155,.75)';
        } else {
            controlText.style.color = 'rgba(255,255,255,.75)';
            count = -1;
        }
        triggerMarker(count);
    });*/
}


function triggerMarker(i) {
    /*if (i < 100) {
        google.maps.event.trigger(markers_list[i], 'click', function() {
            map.setZoom(18);
            map.setCenter(marker.getPosition());
            infoWindow.close();

            infoWindow.setPosition(marker.getPosition());
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
        });
        $('#myModal').modal('show');
    } else {
        infoWindow.close();
        map.setZoom(16);
        map.panTo(c);
    }*/

}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 0.5
    };
}
