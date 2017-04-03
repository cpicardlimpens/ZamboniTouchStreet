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
                '<p>' + markers_list[i - 1].title + '</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>')
        }

    });

}


function ParsingPoints(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');

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
    });
}

function loadMap() {
    // Styles a map in night mode.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 44.4962284,
            lng: 11.350587899999937
        },
        zoom: 16,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffeb3b"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#ffeb3b"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": 4.5
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#b9d3c2"
                    },
                    {
                        "weight": 4.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ]
    });
    c = map.getCenter();
    //google.maps.event.addDomListener(window, 'load');
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    // MAsk to focus on Zamboni street
    // Define the LatLng coordinates for the polygon's path.
    var outerCoords = [{
            lat: 44.49926027609643,
            lng: 11.327075958251953
        },
        {
            lat: 44.505749187681566,
            lng: 11.339521408081055
        },
        {
            lat: 44.50109683378502,
            lng: 11.356086730957031
        },
        {
            lat: 44.485667951204974,
            lng: 11.358060836791992
        },
        {
            lat: 44.48646398548003,
            lng: 11.339263916015625
        },
        {
            lat: 44.49044399391039,
            lng: 11.328964233398438
        }
    ];

    // Define the LatLng coordinates for the polygon's inner path.
    // Note that the points forming the inner path are wound in the
    // opposite direction to those in the outer path, to form the hole.
    var innerCoords = [{
            lat: 44.49428597518099,
            lng: 11.346087455749512
        },
        {
            lat: 44.49440842460528,
            lng: 11.347653865814209
        },
        {
            lat: 44.49489821973133,
            lng: 11.348834037780762
        },
        {
            lat: 44.4954492343308,
            lng: 11.350829601287842
        },
        {
            lat: 44.49626044079391,
            lng: 11.352524757385254
        },
        {
            lat: 44.49675022036458,
            lng: 11.354176998138428
        },
        {
            lat: 44.49740835518457,
            lng: 11.356065273284912
        },
        {
            lat: 44.49838789092852,
            lng: 11.356322765350342
        },
        {
            lat: 44.49881643264208,
            lng: 11.354155540466309
        },
        {
            lat: 44.49806648257639,
            lng: 11.352567672729492
        },
        {
            lat: 44.49728591205956,
            lng: 11.351323127746582
        },
        {
            lat: 44.49673491481525,
            lng: 11.349992752075195
        },
        {
            lat: 44.496382886072254,
            lng: 11.348190307617188
        },
        {
            lat: 44.49567882221063,
            lng: 11.3468599319458
        },
        {
            lat: 44.49514311575167,
            lng: 11.345744132995605
        },
        {
            lat: 44.494454343073116,
            lng: 11.345658302307129
        }
    ];


    // Construct the polygon.
    var zone = new google.maps.Polygon({
        paths: [outerCoords, innerCoords],
        strokeColor: '#FFFFFF',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FFFFFF',
        fillOpacity: 0.65
    });
    zone.setMap(map);

    // Create the DIV to hold the control and call the ParsingPoints() constructor
    // passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new ParsingPoints(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

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
        $('#myModal_' + id + '').modal('show');
    });
}


function triggerMarker(i) {
    if (i < 100) {
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
    }

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
