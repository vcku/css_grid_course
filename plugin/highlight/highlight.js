// START CUSTOM REVEAL.JS INTEGRATION
(function() {
	if( typeof window.addEventListener === 'function' ) {
		var hljs_nodes = document.querySelectorAll( 'pre code' );

		for( var i = 0, len = hljs_nodes.length; i < len; i++ ) {
			var element = hljs_nodes[i];

			// trim whitespace if data-trim attribute is present
			if( element.hasAttribute( 'data-trim' ) && typeof element.innerHTML.trim === 'function' ) {
				element.innerHTML = element.innerHTML.trim();
			}

			// Now escape html unless prevented by author
			if