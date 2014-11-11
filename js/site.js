$.ajax({
	type : 'GET',
	url : 'https://ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU:bibles.org/v2/verses/eng-esv:Acts.8.34.js',
	crossdomain : 'true',
//	data: {"ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU":"ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU"},
	jsonp: "false",
	dataType : 'jsonp',
//	contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
	success : function(response){
		console.log(response);
		console.log("success");
	},
	error : function(response){
		console.log(JSON.stringify(response));
		console.log("fail");
	}
});

//$.getJSON('https://ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU:bibles.org/v2/verses/eng-esv:Acts.8.34.js', function(k,v) {
//	console.log(k,v)
//})

//ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU


//function callApi(api){
//	var s = document.createElement('script');
//	s.setAttribute('src',api);
//	document.getElementsByTagName('head')[0].appendChild(s);
//}
//var api = 'YOUR HTTP GET URL';
//callApi(api);

//ckwO6bJ9byAuO1aYnsR303owo795tbMK9LGGMjpU
