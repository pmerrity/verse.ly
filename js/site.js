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

  var getBooks = function() {
    var oldBooks = [
      {
        name: 'Genesis',
        number: 50
      },
      {
        name: 'Exodus',
        number: 40
      },
      {
        name: 'Leviticus',
        number: 27
      },
      {
        name: 'Numbers',
        number: 36
      },
      {
        name: 'Deuteronomy',
        number: 34
      },
      {
        name: 'Joshua',
        number: 24
      },

      {
        name: 'Judges',
        number: 21
      },

      {
        name: 'Ruth',
        number: 4
      },
      {
        name: '1 Samuel',
        number: 31
      },
      {
        name: '2 Samuel',
        number: 24
      },
      {
        name: '1 Kings',
        number: 22
      },
      {
        name: '2 Kings',
        number: 25
      },
      {
        name: '1 Chronicles',
        number: 29
      },
      {
        name: '2 Chronicles',
        number: 36
      },
      {
        name: 'Ezra',
        number: 10
      },
      {
        name: 'Nehemiah',
        number: 13
      },

      {
        name: 'Esther',
        number: 10
      },
      {
        name: 'Job',
        number: 42
      },
      {
        name: 'Psalms',
        number: 150
      },
      {
        name: 'Proverbs',
        number: 31
      },
      {
        name: 'Ecclesiastes',
        number: 12
      },
      {
        name: 'Song of Solomon',
        number: 8
      },
      {
        name: 'Isaiah',
        number: 66
      },

      {
        name: 'Jeremiah',
        number: 52
      },
      {
        name: 'Lamentations',
        number: 5
      },
      {
        name: 'Ezekiel',
        number: 48
      },
      {
        name: 'Daniel',
        number: 12
      },

      {
        name: 'Hosea',
        number: 14
      },
      {
        name: 'Joel',
        number: 3
      },
      {
        name: 'Amos',
        number: 9
      },
      {
        name: 'Obadiah',
        number: 1
      },
      {
        name: 'Jonah',
        number: 4
      },
      {
        name: 'Micah',
        number: 7
      },
      {
        name: 'Nahum',
        number: 3
      },
      {
        name: 'Habakkuk',
        number: 3
      },
      {
        name: 'Zephaniah',
        number: 3
      },
      {
        name: 'Haggai',
        number: 2
      },
      {
        name: 'Zechariah',
        number: 14
      },
      {
        name: 'Malachi',
        number: 4
      }
      ];
    var newBooks = [
      {
        name: 'Matthew',
        number: 28
      },
      {
        name: 'Mark',
        number: 16
      },
      {
        name: 'Luke',
        number: 24
      },
      {
        name: 'John',
        number: 21
      },
      {
        name: 'Acts',
        number: 28
      },
      {
        name: 'Romans',
        number: 16
      },

      {
        name: '1 Corinthians',
        number: 16
      },
      {
        name: '2 Corinthians',
        number: 13
      },
      {
        name: 'Galatians',
        number: 6
      },
      {
        name: 'Ephesians',
        number: 6
      },
      {
        name: 'Philippians',
        number: 4
      },
      {
        name: 'Colossians',
        number: 4
      },
      {
        name: '1 Thessalonians',
        number: 5
      },
      {
        name: '2 Thessalonians',
        number: 3
      },
      {
        name: '1 Timothy',
        number: 6
      },
      {
        name: '2 Timothy',
        number: 4
      },
      {
        name: 'Titus',
        number: 3
      },
      {
        name: 'Philemon',
        number: 1
      },
      {
        name: 'Hebrews',
        number: 13
      },
      {
        name: 'James',
        number: 5
      },
      {
        name: '1 Peter',
        number: 5
      },
      {
        name: '2 Peter',
        number: 3
      },
      {
        name: '1 John',
        number: 5
      },
      {
        name: '2 John',
        number: 1
      },

      {
        name: '3 John',
        number: 1
      },

      {
        name: 'Jude',
        number: 1
      },
      {
        name: 'Revelation',
        number: 22
      }
      ];
  };

	$("#search").submit(
		function searchScripture(e, passage, version){
			e.preventDefault();
			var userInput = $("#searchField").val();
			passage = "p="+userInput;
			version = "v=nasb";
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
