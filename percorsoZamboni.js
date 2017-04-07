var map;
var currentMarker;
var infoWindow;
var markers_list = [];

var c;
var count = -1;
var current_count = 0;

// HERE automatic get from wordpress
var features = [];




function initMap() {

    $.getJSON( "features.json", function( data ) {
        //console.log(data);
        for (var i=0; i< data.length; i++) {
            features.push(data[i]);
        }
        console.log("Got it!",features);

        loadMap();

        for (var i = 0, feature; feature = features[i]; i++) {
            addMarker(feature);
        }

        markers_list[current_count].setAnimation(google.maps.Animation.BOUNCE);

        // Modal windows
        for (var i = 1; i <= features.length; i++) {
            $('#modals').append('<div class="modal fade" id="myModal_' + i + '" role="dialog">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">Tappa ' + i + '</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<iframe id="videoContent" width="100%" height="100%" src="https://www.youtube.com/embed/em5PRRO-sK0" frameborder="0" allowfullscreen></iframe>' + //video could a feature!!
                '<p>' + markers_list[i - 1].title + '</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>')
        }

        $('#modals').append('<div class="modal fade" id="myModal" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
            '<h4 class="modal-title">Zamboni Touch Street: Un percorso in 7 Tappe</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<audio controls><source src="sounds/Event2.wav" type="audio/wav"></audio>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
        // myModal opens as introduction
        $('#myModal').modal('show');
        var url = $('#myModal audio').attr('src');
        /* Assign empty url value to the iframe src attribute when
        modal hide, which stop the video playing */

        $('#myModal').on('hide.bs.modal', function(){
            //console.log('close modal '+id);
            jQuery('#myModal audio').removeAttr("src", jQuery('#myModal audio').removeAttr("src"));

        });

        /* Assign the initially stored url back to the iframe src
        attribute when modal is displayed again */
        $('#myModal').on('show.bs.modal', function(){
            $('#myModal_' + id + ' iframe').attr('src', url);
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
        label: f.label
    });
    console.log(marker.title + " // "+ marker.label);
    markers_list.push(marker);

    attachSecretMessage(marker, marker.title);

}


function attachSecretMessage(marker, secretMessage) {
    marker.addListener('click', function() {
        var id = this.label;
        console.log(id);
        //opens another window
        window.open('pano_'+id+'.html', "_self");
        /*$('#myModal_' + id + '').modal('show');
        var url = $('#myModal_' + id + ' iframe').attr('src');

        $('#myModal_' + id + '').on('hide.bs.modal', function(){
            console.log('close modal '+id);
            jQuery('#myModal_' + id + ' iframe').removeAttr("src", jQuery('#myModal_' + id + ' iframe').removeAttr("src"));

        });

        $('#myModal_' + id + '').on('show.bs.modal', function(){
            $('#myModal_' + id + ' iframe').attr('src', url);
        });*/
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
