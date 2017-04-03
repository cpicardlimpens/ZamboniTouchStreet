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
