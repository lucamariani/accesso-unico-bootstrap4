$('#modulistica').on('change', function(event) {
    console.log( 'selected ' + $(this).val() );
    window.location.href = $(this).val()
});