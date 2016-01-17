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



    var bookTitle;
    var passageNum;


    var oldBooks = [
      {
        name: 'Genesis',
        num: 50
      },
      {
        name: 'Exodus',
        num: 40
      },
      {
        name: 'Leviticus',
        num: 27
      },
      {
        name: 'Numbers',
        num: 36
      },
      {
        name: 'Deuteronomy',
        num: 34
      },
      {
        name: 'Joshua',
        num: 24
      },

      {
        name: 'Judges',
        num: 21
      },

      {
        name: 'Ruth',
        num: 4
      },
      {
        name: '1 Samuel',
        num: 31
      },
      {
        name: '2 Samuel',
        num: 24
      },
      {
        name: '1 Kings',
        num: 22
      },
      {
        name: '2 Kings',
        num: 25
      },
      {
        name: '1 Chronicles',
        num: 29
      },
      {
        name: '2 Chronicles',
        num: 36
      },
      {
        name: 'Ezra',
        num: 10
      },
      {
        name: 'Nehemiah',
        num: 13
      },

      {
        name: 'Esther',
        num: 10
      },
      {
        name: 'Job',
        num: 42
      },
      {
        name: 'Psalms',
        num: 150
      },
      {
        name: 'Proverbs',
        num: 31
      },
      {
        name: 'Ecclesiastes',
        num: 12
      },
      {
        name: 'Song of Solomon',
        num: 8
      },
      {
        name: 'Isaiah',
        num: 66
      },

      {
        name: 'Jeremiah',
        num: 52
      },
      {
        name: 'Lamentations',
        num: 5
      },
      {
        name: 'Ezekiel',
        num: 48
      },
      {
        name: 'Daniel',
        num: 12
      },

      {
        name: 'Hosea',
        num: 14
      },
      {
        name: 'Joel',
        num: 3
      },
      {
        name: 'Amos',
        num: 9
      },
      {
        name: 'Obadiah',
        num: 1
      },
      {
        name: 'Jonah',
        num: 4
      },
      {
        name: 'Micah',
        num: 7
      },
      {
        name: 'Nahum',
        num: 3
      },
      {
        name: 'Habakkuk',
        num: 3
      },
      {
        name: 'Zephaniah',
        num: 3
      },
      {
        name: 'Haggai',
        num: 2
      },
      {
        name: 'Zechariah',
        num: 14
      },
      {
        name: 'Malachi',
        num: 4
      }
      ];
    var newBooks = [
      {
        name: 'Matthew',
        num: 28
      },
      {
        name: 'Mark',
        num: 16
      },
      {
        name: 'Luke',
        num: 24
      },
      {
        name: 'John',
        num: 21
      },
      {
        name: 'Acts',
        num: 28
      },
      {
        name: 'Romans',
        num: 16
      },

      {
        name: '1 Corinthians',
        num: 16
      },
      {
        name: '2 Corinthians',
        num: 13
      },
      {
        name: 'Galatians',
        num: 6
      },
      {
        name: 'Ephesians',
        num: 6
      },
      {
        name: 'Philippians',
        num: 4
      },
      {
        name: 'Colossians',
        num: 4
      },
      {
        name: '1 Thessalonians',
        num: 5
      },
      {
        name: '2 Thessalonians',
        num: 3
      },
      {
        name: '1 Timothy',
        num: 6
      },
      {
        name: '2 Timothy',
        num: 4
      },
      {
        name: 'Titus',
        num: 3
      },
      {
        name: 'Philemon',
        num: 1
      },
      {
        name: 'Hebrews',
        num: 13
      },
      {
        name: 'James',
        num: 5
      },
      {
        name: '1 Peter',
        num: 5
      },
      {
        name: '2 Peter',
        num: 3
      },
      {
        name: '1 John',
        num: 5
      },
      {
        name: '2 John',
        num: 1
      },

      {
        name: '3 John',
        num: 1
      },

      {
        name: 'Jude',
        num: 1
      },
      {
        name: 'Revelation',
        num: 22
      }
      ];

  		function searchScripture(book){
			var userInput = $("#searchField").val();
      var book = book;
      if (book === "oldTest") {
        var bookNum = Math.floor(Math.random()* 39);
        bookTitle = oldBooks[bookNum].name;
        passageNum = Math.floor(Math.random() * oldBooks[bookNum].num) + 1;
      } else if (book === "newTest") {
        var bookNum = Math.floor(Math.random()* 27);
            bookTitle = newBooks[bookNum].name;
            passageNum = Math.floor(Math.random() * newBooks[bookNum].num) + 1;
      }
      var input = userInput || bookTitle + ' ' + passageNum;
			var passage = "p="+input;
			var version = "v=nasb";
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

	$("#search").submit(function(event) {
    event.preventDefault();
    searchScripture();
  });

  $("#oldTest").submit(function(event) {
    event.preventDefault();
    searchScripture('oldTest');
  });

  $("#newTest").submit(function(event) {
      event.preventDefault();
      searchScripture('newTest');
    });

	// function getScripture(){

	// }
