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
    '</div>' +
    '</div>' +
    '</div>' +

    '</div>')

    var url = $('#myModal iframe').attr('src');

    $('#myModal').on('hide.bs.modal', function(){
        console.log('close modal ');
        jQuery('#myModal iframe').removeAttr("src", jQuery('#myModal iframe').removeAttr("src"));

    });

    $('#myModal').on('show.bs.modal', function(){
        $('#myModal iframe').attr('src', url);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// ==== Main function that loads panorama ====//
function loadPano(){
    var id = getParameterByName('id');
    var list_steps = getParameterByName('list');

    var steps = list_steps.split('_');
    var p; var n; var s;
    for (var i=0; i< steps.length-1; i++) {
        if(id==steps[i]){
            s=i+1;
            if(i==0) {
                p=" ";
                n=steps[i+1];
                //console.log("previous: "+ p + " / next: "+ n);
            } else if(i==(steps.length-2)) {
                p=steps[i-1];
                n=" ";
                console.log("previous: "+ p + " / next: "+ n);
            } else {
                p=steps[i-1];
                n=steps[i+1];
                //console.log("previous: "+ p + " / next: "+ n);
            }

        }
    }

    var new_content1 = "";
    if(p==" "){
        new_content1 += '    '
                    + '<a class="next" href="?id='+n+'&list='+list_steps+'">'
                    + ''+(s+1)+' >'
                    + '</a>';
    } else if(n==" "){
        new_content1 += '<a class="previous" href="?id='+p+'&list='+list_steps+'">'
                    + '< '+(s-1)+''
                    + '</a>';
    } else {
        new_content1 += '<a class="previous" href="?id='+p+'&list='+list_steps+'">'
                    + '< '+(s-1)+''
                    + '</a>'
                    + ' '
                    + '<a class="next" href="?id='+n+'&list='+list_steps+'">'
                    + ''+(s+1)+' >'
                    + '</a>';
    }

    $("#steps_nav" ).html(new_content1);
    //console.log(parseHash(hash));


    // retrieve Interest points for this step
    $.getJSON( API_BASE_URL+"listings/"+id, function( data ) {
        var interestPoints = data.acf.pint;
        // render template >>> FIXME use real template here
        var new_content = "";
        new_content += "<div>";
        var pos_x = 0;
        for (var i=0; i< interestPoints.length; i++) {
            var interestPoint = interestPoints[i];
            new_content += "<div>"
                        +      "<h1>"+interestPoint.post_title+"</h1>"
                        + "</div>";
            pos_x+=1000;// position of the interest point, from the json??
        };
        new_content += "</div>";
        // replace panorama slider
        $( "#slider" ).html(new_content);
        $('#slider').pslider();
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
