if(document.querySelector('#assignmentTags')){
	//just adapted from the jQuery example at https://jqueryui.com/autocomplete/#multiple
	jQuery( function() {
		const tagsEntry = document.querySelector('#assignmentTags');
		//console.log(tagsEntry)	
		const tagsUrl =  WPURLS.siteurl + '/wp-json/wp/v2/tags?orderby=count&order=desc&per_page=20';
		//console.log(tagsFeed)
	   	var availableTags = getTags(tagsUrl);
	   
	    function split( val ) {
	      return val.split( /,\s*/ );
	    }
	    function extractLast( term ) {
	      return split( term ).pop();
	    }
	 
	    jQuery( "#assignmentTags" )
	      // don't navigate away from the field on tab when selecting an item
	      .on( "keydown", function( event ) {
	        if ( event.keyCode === jQuery.ui.keyCode.TAB &&
	            jQuery( this ).autocomplete( "instance" ).menu.active ) {
	          event.preventDefault();
	        }
	      })
	      .autocomplete({
	      	autoFocus: true,
	        minLength: 0,
	        source: function( request, response ) {
	          // delegate back to autocomplete, but extract the last term
	          response( jQuery.ui.autocomplete.filter(
	            availableTags, extractLast( request.term ) ) );
	        },
	        focus: function() {
	          // prevent value inserted on focus
	          return false;
	        },
	        select: function( event, ui ) {
	          var terms = split( this.value );
	          // remove the current input
	          terms.pop();
	          // add the selected item
	          terms.push( ui.item.value );
	          // add placeholder to get the comma-and-space at the end
	          terms.push( "" );
	          this.value = terms.join( ", " );
	          return false;
	        }
	      });
	  } );
}



function getTags(tagsUrl){
	const myRequest = new Request(tagsUrl);
	let tags = new Array();
	fetch(myRequest)
	  .then(response => response.json())
	  .then(data => {
	    for (const tag of data) {
	       //console.log(tag.name)
	       tags.push(tag.name)
	    }
	  })
	  .catch(console.error);
	  return tags;
}
