$.ajax({
	url:'http://getbible.net/json',
	dataType: 'jsonp',
	data: 'p=John1&v=kjv',
	jsonp: 'getbible',
	success:function(json){
		// set text direction
		if (json.direction == 'RTL'){
			var direction = 'rtl';
		} else {
			var direction = 'ltr';
		}
		// check response type
		if (json.type == 'verse'){
			var output = '';
			$.each(json.book, function(index, value) {
				output += '<div><b>'+value.book_name+' '+value.chapter_nr+'</b></div><br/><p class="'+direction+'">';
				$.each(value.chapter, function(index, value) {
					output += '  <span class="ltr">' +value.verse_nr+ '</span>  ';
					output += value.verse;
					output += '<br/>';
				});
				output += '</p>';
			});
			$('#scripture').html(output);  // <---- this is the div id we update
		}

		else if (json.type == 'chapter'){
			var output = '<div id="chapter"><b>'+json.book_name+' '+json.chapter_nr+'</b></div><br/><p class="'+direction+'">';
			$.each(json.chapter, function(index, value) {
				output += '  <span class="ltr">' +value.verse_nr+ '</span>  ';
				output += value.verse;
				output += '<br/>';
			});
			output += '</p>';
			$('#scripture').html(output);  // <---- this is the div id we update
		}

		else if (json.type == 'book'){
			var output = '';
			$.each(json.book, function(index, value) {
				output += '<div id="book"><b>'+json.book_name+' '+value.chapter_nr+'</b></div><br/><p class="'+direction+'">';
				$.each(value.chapter, function(index, value) {
					output += '  <span class="ltr">' +value.verse_nr+ '</span>  ';
					output += value.verse;
					output += '<br/>';
				});
				output += '</p>';
			});
			if(addTo){
				$('#scripture').html(output);  // <---- this is the div id we update
			}
		}

	},
	error:function(){
		$('#scripture').html('<h2>No scripture was returned, please try again!</h2>'); // <---- this is the div id we update
	},
});
