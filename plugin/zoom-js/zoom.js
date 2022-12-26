// Custom reveal.js integration
(function(){
	var isEnabled = true;

	document.querySelector( '.reveal' ).addEventListener( 'mousedown', function( event ) {
		if( event.altKey && isEnabled ) 