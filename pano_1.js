$('#slider').pslider();

function renderAndShowModalVideo(title, vid_src){
    
    $('#modals').html('<div class="modal fade" id="myModal" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '<h4 class="modal-title">'+title+'</h4>' +
    '</div>' +
    '<div class="modal-body">' +
    '<iframe id="videoContent" width="100%" height="100%" src="'+vid_src+'" frameborder="0" allowfullscreen></iframe>' + //video could a feature!!
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>')
    // myModal opens as introduction of the stage
    $('#myModal').modal('show');
    var url = $('#myModal iframe').attr('src');
    
    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $('#myModal').on('hide.bs.modal', function() {
        jQuery('#myModal iframe').removeAttr("src", jQuery('#myModal iframe').removeAttr("src"));
    });
    
    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $('#myModal').on('show.bs.modal', function() {
        $('#myModal iframe').attr('src', url);
    });
}
