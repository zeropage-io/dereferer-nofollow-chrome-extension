var deref_url = "";
chrome.storage.sync.get( "deref_url", function( item ) {
  deref_url = item.deref_url;
});

var isExternal = function( url ) {
  var domain = function( url ) {
    return url.replace( 'http://', '' ).replace( 'https://', '' ).split( '/' )[ 0 ];
  };
  badprefix = "javascript";
  if ( badprefix == domain( url ).toLowerCase( ).substr( 0, badprefix.length ) )
    return false;
  else
    return domain( location.href ) !== domain( url );
}

// function isExternal2( url ) {
//   var match = url.match( /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/ );
//   if ( typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol )
//     return true;
//   if ( typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host )
//     return true;
//   return false;
// }

chrome.storage.sync.get( "running", function( item ) {
  if ( item.running ) {
    var links = [ ].slice.apply( document.getElementsByTagName( 'a' ) );
    links = links.map( function( element ) {
      if ( element.hasAttribute( "href" ) ) {
        element.href = ( isExternal( element.href ) ? deref_url : "" ) + element.href;
      }
    });
  }
});

chrome.storage.sync.get( "nofollow", function( item ) {
  if ( item.nofollow ) {
		var sheet = (function() {
			var style = document.createElement( "style" );
			style.appendChild( document.createTextNode( "" ) );
			document.head.appendChild( style );
			return style.sheet;
		})();
    sheet.insertRule( "a[rel~='nofollow'] { border:1px dashed #f00; }", 0 );
  }
});

