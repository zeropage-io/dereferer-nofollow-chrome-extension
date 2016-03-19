function badge_icon( key, status ) {
  if ( key == "running" )
    if ( status ) {
      chrome.browserAction.setBadgeBackgroundColor( { color : "#ff0000" } );
      chrome.browserAction.setBadgeText( { text : "on" } );
    } else {
      chrome.browserAction.setBadgeBackgroundColor( { color : "#425bb6" } );
      chrome.browserAction.setBadgeText( { text : "off" } );
    }
  if ( key == "nofollow" )
    if ( status )
      chrome.browserAction.setIcon( { path : "38x38-on.png" } );
    else
      chrome.browserAction.setIcon( { path : "38x38.png" } );
}

chrome.storage.onChanged.addListener( function( changes, namespace ) {
	for ( key in changes )
		badge_icon( key, changes[ key ].newValue );
});

chrome.storage.sync.get( "running", function( item ) {
  if ( Object.getOwnPropertyNames( item ).length === 0 ) {
    // did not find a property named "running".
    // assuming first run of extension and setting running to "true".
    chrome.storage.sync.set( { "running" : true }, function( ) { } );
  } else
    badge_icon( "running", item.running );
});

chrome.storage.sync.get( "nofollow", function( item ) {
  if ( Object.getOwnPropertyNames( item ).length === 0 ) {
    // did not find a property named "nofollow".
    // assuming first run of extension and setting nofollow to "false".
    chrome.storage.sync.set( { "nofollow" : false }, function( ) { } );
  } else
    badge_icon( "nofollow", item.nofollow );
});

chrome.storage.sync.get( "deref_url", function( item ) {
  if ( Object.getOwnPropertyNames( item ).length === 0 ) {
    // did not find a property named "deref_url".
    // assuming first run of extension and setting dereferer service to "nptr.xyz"
    chrome.storage.sync.set( { "deref_url" : "http://nptr.xzy/?" }, function( ) { } );
  }
});
