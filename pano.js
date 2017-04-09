// Page-scope variables
var API_BASE_URL = "http://zambonits.limpica.net/wp/wp-json/wp/v2/"

// ==== Main function that loads panorama ====//
function loadPano(){
    var hash = window.location.hash;
    console.log("hash = ",hash)
    var id = hash.replace("#","");
    
    // retrieve Interest points for this step
    $.getJSON( API_BASE_URL+"listings/"+id, function( data ) {
        var interestPoints = data.acf.pint;
        // render template >>> FIXME use real template here
        var new_content = "";
        for (var i=0; i< interestPoints.length; i++) {
            var interestPoint = interestPoints[i];
            new_content += "<div>"
                        +      "<h1>"+interestPoint.post_title+"</h1>"
                        + "</div>";
        };
        // replace panorama slider
        $( "#interestPoints" ).html(new_content);
        // render and show modal (see pano_1.js)
        video_src = "https://www.youtube.com/embed/em5PRRO-sK0";
        renderAndShowModalVideo(data.title.rendered, video_src);
        
    });
};

// ==== Execution on document ready and hashchange ====//
$( document ).ready(function() {
    loadPano();
    $(window).on('hashchange', function() {
        loadPano();
    });
});


