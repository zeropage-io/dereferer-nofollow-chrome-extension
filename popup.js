function toggle_setting( ) {
  pref = this.id;
  chrome.storage.sync.get( pref, function( item ) {
    // pref = running|nofollow
    var object = { };
    object[ pref ] = !item[ pref ];
    chrome.storage.sync.set( object, function( ) {
      // setting written
    });
  });
}

function deref_url_changed( ) {
  pref = this.id;
  value = this.value;
  chrome.storage.sync.get( pref, function( item ) {
console.log(pref + " - " + value + " - " + item[pref]);
    // item["deref_url"] = item[pref] = current dereferer-service url
    if ( item[ pref ] != value ) {
      var object = { };
      object[ pref ] = value;
      chrome.storage.sync.set( object, function( ) {
        // setting written
      });
    }
  });
}

window.onload = function( ) {
  // status running
  chrome.storage.sync.get( "running", function( item ) {
    document.getElementById( "running" ).checked = item.running;
  });
  document.getElementById( "running" ).onclick = toggle_setting;
  
  // status nofollow
  chrome.storage.sync.get( "nofollow", function( item ) {
    document.getElementById( "nofollow" ).checked = item.nofollow;
  });
  document.getElementById( "nofollow" ).onclick = toggle_setting;
  
  // pull the dereferer-service
  chrome.storage.sync.get( "deref_url", function( item ) {
    document.getElementById( "deref_url" ).value = item.deref_url;
  });
  document.getElementById( "deref_url" ).onchange = deref_url_changed;
}
