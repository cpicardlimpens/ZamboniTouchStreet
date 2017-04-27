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
    // FIXME : replace with mustache template
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
    console.log("before loading listing details");
    // retrieve Interest points for this step
    $.getJSON( API_BASE_URL+"listings/"+id, function( data ) {
        console.log("got listing details", data);
        var interestPoints = data.acf.pint;
        
        // load panorama image
        $("#panorama").pano({
            img: data.acf.panoramica.url
        });
        
        // adapt annotations container with image width and height 
            /* 
            FIXME-1 : on mobile, if device is tilted, this has to be changed, since the image ratio then changes!! 
            FIXME-2 : lors d'un tilt, on aura aussi un problème pour replacer les points car le placement en pourcentage est modifié dès qu'on drag le panorama (cf jquery.pano.js moveInterestPointsBy ) =>  SOL = 
            1. faire une fonction qui replace tous les points en fonction de (position en %, scaledImageWidth, position du bkground) 
            2. utiliser les data-left et data-top (cf template des annotation) 
            */
        var ratio = parseInt($('#panorama').css("height").replace("px", ""))*1.0/data.acf.panoramica.height;
        var scaledImageWidth = data.acf.panoramica.width * ratio;
        $('.interest_points').css('width', scaledImageWidth );
        
        // go through all ip and add annotations and modal window
        for (var i = 0; i < interestPoints.length; i++) {
            ip = interestPoints[i];
            $.getJSON( API_BASE_URL+"posts/"+ip.ID, function( data ) {
                // append interest points annotations
                $.get('templates/interest_points_annotation.mst', function(template) {
                    console.log("ip data", data);
                    var rendered = Mustache.render(template, data);
                    $('.interest_points').append(rendered);
                });
                // render modal window
            });
        };
        
        // render and show info modal (see pano_1.js)
        video_src = "https://www.youtube.com/embed/em5PRRO-sK0";
        renderAndShowModalVideo(data.title.rendered, video_src);

    });
};

// ==== Execution on document ready and hashchange ====//
$( document ).ready(function() {
    console.log("initial loading");
    loadPano();
    // FIXME : we no longer monitor hashchange, but we should make sure document gets reloaded on query parameters change (as is the case on FF/Linux+Mac)
    $(window).on('hashchange', function() {
        console.log("Hash has changed!");
        //loadPano();
    });
});
