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
			if( ! element.hasAttribute( 'data-noescape' )) {
				element.innerHTML = element.innerHTML.replace(/</g,"&lt;").replace(/>/g,"&gt;");
			}

			// re-highlight when focus is lost (for edited code)
			element.addEventListener( 'focusout', function( event ) {
				hljs.highlightBlock( event.currentTarget );
			}, false );
		}
	}
})();
// END CUSTOM REVEAL.JS INTEGRATION

// highlight.js build includes support for:
// Bash, C#, C++, CSS, Diff, HTML, XML, HTTP, Ini, JSON, Java, JavaScript, PHP, Perl, Python, Ruby, SQL, Clojure, GLSL, Lua, Scala, CoffeeScript, Go, Objective C, ActionScript, Markdown

var hljs=new function(){function l(o){return o.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function b(p){for(var o=p.firstChild;o;o=o.nextSibling){if(o.nodeName=="CODE"){return o}if(!(o.nodeType==3&&o.nodeValue.match(/\s+/))){break}}}function h(p,o){return Array.prototype.map.call(p.childNodes,function(q){if(q.nodeType==3){return o?q.nodeValue.replace(/\n/g,""):q.nodeValue}if(q.nodeName=="BR"){return"\n"}return h(q,o)}).join("")}function a(q){var p=(q.className+" "+q.parentNode.className).split(/\s+/);p=p.map(function(r){return r.replace(/^language-/,"")});for(var o=0;o<p.length;o++){if(e[p[o]]||p[o]=="no-highlight"){return p[o]}}}function c(q){var o=[];(function p(r,s){for(var t=r.firstChild;t;t=t.nextSibling){if(t.nodeType==3){s+=t.nodeValue.length}else{if(t.nodeName=="BR"){s+=1}else{if(t.nodeType==1){o.push({event:"start",offset:s,node:t});s=p(t,s);o.push({event:"stop",offset:s,node:t})}}}}return s})(q,0);return o}function j(x,v,w){var p=0;var y="";var r=[];function t(){if(x.length&&v.length){if(x[0].offset!=v[0].offset){return(x[0].offset<v[0].offset)?x:v}else{return v[0].event=="start"?x:v}}else{return x.length?x:v}}function s(A){function z(B){return" "+B.nodeName+'="'+l(B.value)+'"'}return"<"+A.nodeName+Array.prototype.map.call(A.attributes,z).join("")+">"}while(x.length||v.length){var u=t().splice(0,1)