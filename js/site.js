$(document).ready(function(){
    app = new App();
    app.run();
});

function App(){
    var self = this;
    
    var _bible = [];
    
    self.run = function(){
        self.getData();
        self.fonts();
    };
    
    self.getData = function(){
        $.ajax({
				url:'http://getbible.net/json',
				dataType: 'jsonp',
				data: 'v=nasb',
				jsonp: 'getbible',
				success: function(bible){
					if (bible.direction == 'RTL'){
						var direction = 'rtl';
					} else {
						var direction = 'ltr';
					}
                    
                    _bible.push(bible);
                    console.log(_bible);
                    
                    $.each(_bible[0].version, function(i, key) {
                        console.log(i, key.book_name);
                        var book = '<p class="'+i+'">'+key.book_name+'</p>';
                        $("#book").append(book);
                    });
                    
                    $("p.book").on("click", function(){
                        console.log(_bible[0].version[$("#book p:last-child").index()])
                        $.each(_bible[0].version[$("p.book").last().attr('class')], function(i, key){
                            console.log(i, key)
                        })
                    });
                    
					// check response type
					if (bible.type == 'verse'){
						var output = '';
						$.each(bible.book, function(index, value) {
							output += '<div id="book">'+value.book_name+' '+value.chapter_nr+'</div><br/><p class="'+direction+'">';
							$.each(value.chapter, function(index, value) {
								output += '  <span class="ltr">' +value.verse_nr+ '</span>  ';
								output += value.verse;
								output += '<br/>';
							});
							output += '</p>';
						});
						$('#scripture').html(output);  // <---- this is the div id we update
					}

					else if (bible.type == 'chapter'){
						var output = '<div id="book">'+bible.book_name+' '+bible.chapter_nr+'</div><br/><p class="'+direction+'">';
						$.each(bible.chapter, function(index, value) {
							output += '  <span class="ltr">' +value.verse_nr+ '</span>  ';
							output += value.verse;
							output += '<br/>';
						});
						output += '</p>';
						$('#scripture').html(output);  // <---- this is the div id we update
					}

					else if (bible.type == 'book'){
						var output = '';
						$.each(bible.book, function(index, value) {
							output += '<div id="book">'+bible.book_name+' '+value.chapter_nr+'</div><br/><p class="'+direction+'">';
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
    }
    
    self.fonts = function(){
        WebFontConfig = {
            google: { families: [ 'Arimo:400,700:latin' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    };
    
    
}



	$("#search").submit(
		function searchScripture(e, passage, version){
			e.preventDefault();
			var userInput = $("#searchField").val();
			passage = "p="+userInput;
			version = "v=nasb"
			var query = passage + "&" + version;

			$.ajax({
				url:'http://getbible.net/json',
				dataType: 'jsonp',
				data: query,
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
							output += '<div id="book">'+value.book_name+' '+value.chapter_nr+'</div><br/><p class="'+direction+'">';
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
						var output = '<div id="book">'+json.book_name+' '+json.chapter_nr+'</div><br/><p class="'+direction+'">';
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
							output += '<div id="book">'+json.book_name+' '+value.chapter_nr+'</div><br/><p class="'+direction+'">';
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
		}
	);

	function getScripture(){

	}
