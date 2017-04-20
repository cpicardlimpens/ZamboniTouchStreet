// Page-scope variables
var API_BASE_URL = "http://zambonits.limpica.net/wp/wp-json/wp/v2/"

function renderAndShowModalVideo(title, vid_src){

    $('#modals').html('<div class="modal fade" id="myModal" role="dialog">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content" style="background-color:rgba(255,255,255,0.2); top:100px">' +
                                '<div class="modal-header" style="border-bottom: 0px solid #e5e5e5">' +
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                                    '<h4 class="modal-title">'+title+'</h4>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<iframe id="videoContent" width="100%" height="100%" src="'+vid_src+'" frameborder="0" allowfullscreen></iframe>' + //video could a feature!!
                        '</div></div></div></div>')

    var url = $('#myModal iframe').attr('src');

    $('#myModal').on('hide.bs.modal', function(){
        console.log('close modal ');
        jQuery('#myModal iframe').removeAttr("src", jQuery('#myModal iframe').removeAttr("src"));
    });

    $('#myModal').on('show.bs.modal', function(){
        $('#myModal iframe').attr('src', url);
    });
}

// ==== Main function that loads panorama ====//
function loadPano(){
    var hash = window.location.hash;
    console.log("hash = ",hash)
    var id = hash.replace("#","");

    // retrieve Interest points for this step
    $.getJSON( API_BASE_URL+"listings/"+id, function( data ) {
        var interestPoints = data.acf.pint;
        // render template >>> FIXME use real template here
        var new_content = "<div>";
        var pos_x = 0;
        for (var i=0; i< interestPoints.length; i++) {
            var interestPoint = interestPoints[i];
            new_content += "<div>"
                        +      "<h1>"+interestPoint.post_title+"</h1>"
                        + "</div>";
            pos_x+=1000;// position of the interest point, from the json??
        };
        new_content += "</div>";
        // replace panorama image and render it with map
        console.log("setting up panorama_viewer", $(".panorama")) ;
        $("#panorama").pano({
            img: "images/panorama-bologna2.jpg"
        });
            
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
