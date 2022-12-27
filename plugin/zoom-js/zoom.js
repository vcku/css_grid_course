// Custom reveal.js integration
(function(){
	var isEnabled = true;

	document.querySelector( '.reveal' ).addEventListener( 'mousedown', function( event ) {
		if( event.altKey && isEnabled ) {
			event.preventDefault();
			zoom.to({ element: event.target, pan: false });
		}
	} );

	Reveal.addEventListener( 'overviewshown', function() { isEnabled = false; } );
	Reveal.addEven