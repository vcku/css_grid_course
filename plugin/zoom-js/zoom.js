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
	Reveal.addEventListener( 'overviewhidden', function() { isEnabled = true; } );
})();

/*!
 * zoom.js 0.2 (modified version for use with reveal.js)
 * http://lab.hakim.se/zoom-js
 * MIT licensed
 *
 * Copyright (C) 2011-2012 Hakim El Hattab, http://hakim.se
 */
var zoom = (function(){

	// The current zoom level (scale)
	var level = 1;

	// The current mouse position, used for panning
	var mouseX = 0,
		mouseY = 0;

	// Timeout before pan is activated
	var panEngageTimeout = -1,
		panUpdateInterval = -1;

	var currentOptions = null;

	// Check for transform support so that we can fallback otherwise
	var supportsTransforms = 	'WebkitTransform' in document.body.style ||
								'MozTransform' in document.body.style ||
								'msTransform' in document.body.style ||
								'OTransform' in document.body.style ||
								'transform' in document.body.style;

	if( supportsTransforms ) {
		// The easing that will be applied when we zoom in/out
		document.body.style.transition = 'transform 0.8s ease';
		document.body.style.OTransition = '-o-transform 0.8s ease';
		document.body.style.msTransition = '-ms-transform 0.8s ease';
		document.body.style.MozTransition = '-moz-transform 0.8s ease';
		document.body.style.WebkitTransition = '-webkit-transform 0.8s ease';
	}

	// Zoom out if the user hits escape
	document.addEventListener( 'keyup', function( event ) {
		if( level !== 1 && event.keyCode === 27 ) {
			zoom.out();
		}
	}, false );

	// Monitor mouse movement for panning
	document.addEventListener( 'mousemove', function( event ) {
		if( level !== 1 ) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}
	}, false );

	/**
	 * Applies the CSS required to zoom in, prioritizes use of CSS3
	 * transforms but falls back on zoom for IE.
	 *
	 * @param {Number} pageOffsetX
	 * @param {Number} pageOffsetY
	 * @param {Number} elementOffsetX
	 * @param {Number} elementOffsetY
	 * @param {Number} scale
	 */
	function magnify( pageOffsetX, pageOffsetY, elementOffsetX, elementOffsetY, scale ) {

		if( supportsTransforms ) {
			var origin = pageOffsetX +'px '+ pageOffsetY +'px',
				transform = 'translate('+ -elementOffsetX +'px,'+ -elementOffsetY +'px) scale('+ scale +')';

			document.body.style.transformOrigin = origin;
			document.body.style.OTransformOrigin = origin;
			document.body.style.msTransformOrigin = origin;
			document.body.style.MozTransformOrigin = origin;
			document.body.style.WebkitTransformOrigin = origin;

			document.body.style.transform = transform;
			document.body.style.OTransform = transform;
			document.body.style.msTransform = transform;
			document.body.style.MozTransform = transform;
			document.body.style.WebkitTransform = transform;
		}
		else {
			// Reset all values
			if( scale === 1 ) {
				document.body.style.position = '';
				document.body.style.left = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
				document.body.style.zoom = '';
			}
			// Apply scale
			else {
				document.body.style.position = 'relative';
				document.body.style.left = ( - ( pageOffsetX + elementOffsetX ) / scale ) + 'px';
				document.body.style.top = ( - ( pageOffsetY + elementOffsetY ) / scale ) + 'px';
				document.body.style.width = ( scale * 100 ) + '%';
				document.body.style.height = ( scale * 100 ) + '%';
				document.body.style.zoom = scale;
			}
		}

		level = scale;

		if( level !== 1 && document.documentElement.classList ) {
			document.documentElement.classList.add( 'zoomed' );
		}
		else {
			document.documentElement.classList.remove( 'zoomed' );
		}
	}

	/**
	 * Pan the document when the mosue cursor approaches