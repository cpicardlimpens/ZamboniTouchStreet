// Page-scope variables
var API_BASE_URL = "http://zambonits.limpica.net/wp/wp-json/wp/v2/"

/*Introduction to the step*/
function renderAndShowIntroModalVideo(title, vid_src){

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

/* Interest Point*/
function renderAndShowInterestPointModal(){
    ///???

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


// Now watch position change
/*
var identifier = window.navigator.geolocation.watchPosition(function(position) {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    if((Oldpos.lat != pos.lat && Oldpos.lng != pos.lng) || Oldpos.lat==0) {

        Oldpos = pos;
        //console.log("new: " + pos+" / old: "+Oldpos);
        console.log(" Position change ! lat: "+pos.lat+" lng: "+pos.lng);

        compute_distance_and_set_position(pos);
    } else {
        console.log("no update position");
    }


}*/

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
        console.log("ratio "+ratio);
        var scaledImageWidth = data.acf.panoramica.width * ratio;
        console.log("background-position: "+ $('#panorama').css("background-position"));
        // BE sure that when switching from map to panorama the interest points remain well located
        if($('#panorama').css("background-position")!=0) $('#panorama').css('background-position',0);
        $('.interest_points').css('width', scaledImageWidth );
        // Listen for resize changes (landscape to portrait and vice versa)
        window.addEventListener("resize", function() {
        	// Get screen size (inner/outerWidth, inner/outerHeight)
            ratio = parseInt($('#panorama').css("height").replace("px", ""))*1.0/data.acf.panoramica.height;
            scaledImageWidth = data.acf.panoramica.width * ratio;
            var delta = parseInt($('#panorama').css('background-position-x').replace("px", ""));
            console.log(delta);
            $('.interest_points').css('width', scaledImageWidth);
            $(panorama).find(".ipoint").each(function(index, ip){
                current_left = parseInt($(ip).attr('data-left').replace("%", ""))*scaledImageWidth/100;
                console.log("cur-left " + current_left);
                $(ip).css('left', current_left +delta +'px');
            })
            console.log("ALERT");
            console.log("ratio changed: "+ratio);
        }, false);

        // go through all ip and add annotations and modal window
        for (var i = 0; i < interestPoints.length; i++) {
            ip = interestPoints[i]; var index=i;
            $.getJSON( API_BASE_URL+"posts/"+ip.ID, function( data ) {
                console.log(API_BASE_URL+"posts/"+ip.ID);
                //remove "false" value
                /*var original = {a:1, b:2, c:3};
                var squaredValues = $.map(original, function (value, key) {
                    return [key, value * value];
                });
                original=squaredValues;console.log("r"+original);
                $.each(original, function(value, key) { this[key] = value +3;  }); console.log("r  "+ original)*/

                $.each( data.acf, function(key,value  ) {

                    if(value==false) {
                        //console.log(ip.ID+" - catégories vides:"+key);
                        //$.extend("bbbb");
                        console.log(ip.ID+" - catégories vides:"+key+"/ value: "+value);
                    }
                    //console.log( key + "///: " + value );
                });
                // append interest points annotations
                $.get('templates/interest_points_annotation.mst', function(template) {
                    console.log("ip data", data);

                    var rendered = Mustache.render(template, data);
                    $('.interest_points').append(rendered);

                    //todo: comment faire si le champ acf est vide??
                    $('#modals').append('<div class="modal fade" id="pi'+data.id+'" role="dialog">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content" style="background-color:rgba(255,255,255,0.2); top:100px">' +
                        '<div class="modal-header" style="border-bottom: 0px solid #e5e5e5">' +
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                        '<h3 class="modal-title">'+data.title.rendered+'</h3>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<p>'+data.acf.scheda_tecnica+'</p>'+
                        '<br>'+
                        '<p>'+data.acf.intro_t+'</p>'+
                        '<br>'+
                        '<h4 class="modal-title">Approfondimenti</h4>' +
                        (data.acf.desc_gnal_a !=false ? '<audio controls><source src="'+data.acf.desc_gnal_a.url+'" type="audio/wav"></audio>': '') +
                        '<img src="'+data.acf.dentro_i1.url+'" class="img-responsive" alt="" >'+
                        '<img src="'+data.acf.dentro_i2.url+'" class="img-responsive" alt="" >'+
                        '<img src="'+data.acf.dentro_i3.url+'" class="img-responsive" alt="" >'+
                        '<br>'+
                        '<h4 class="modal-title">Esperienza</h4>' +
                        '<p>'+data.acf.esperienza_t+'</p>'+
                        (data.acf.esperienza_a !=false ? '<audio controls><source src="'+data.acf.esperienza_a.url+'" type="audio/wav"></audio>': '') +
                        '<img src="'+data.acf.esperienza_i.url+'" class="img-responsive" alt="" >'+
                        '</div>' +
                        '</div>' +
                        '</div>')

                        var url = $('#pi'+data.id+' audio').attr('src');
                        $("#pi"+data.id).on('hide.bs.modal', function(){
                            jQuery('#pi'+data.id+' audio').removeAttr("src", jQuery('#pi'+data.id+' audio').removeAttr("src"));
                        });

                        $("#pi"+data.id).on('show.bs.modal', function(){
                            $('#pi'+data.id+' audio').attr('src', url);
                        });

                        var pi_ = 'pi'+data.id+'.ipoint';

                        $('#'+pi_).click(function() {
                            // render modal window
                            console.log('click!!');
                            $("#pi"+data.id).modal();
                        });


                });
                var contents = data.acf;
                console.log("got interest point details", contents);
                //console.log("got interest point details: ", contents.size);
                for (var j=0; j< contents.length-1; j++) {
                    console.log(j+" "+contents[j]);
                }



            });
        };

        // render and show info modal (see pano_1.js)
        video_src = "https://www.youtube.com/embed/em5PRRO-sK0";
        renderAndShowIntroModalVideo(data.title.rendered, video_src);

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
