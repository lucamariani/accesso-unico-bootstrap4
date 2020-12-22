$('#comune').on('change', function(event) {
    console.log( 'selected ' + $(this).val() );
    //$('#gobutton').attr( 'href', $(this).val() );
    window.location.href = $(this).val()
});