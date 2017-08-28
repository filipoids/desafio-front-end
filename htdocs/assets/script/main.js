'use strict';
var Index = (function (window, document){

	var URLDATA = 'data.json'

	return {

		templateList: function (image, label, title, description, link) {
			return	'<div class="item-noticia">' + 
						'<img src="assets/media/' + image + '" />' +
						'<small class="categoria">' + label + '</small>' + 
						'<h2 class="title-noticia">' + title + '</h2>' + 
						'<p class="descricao">' + description + '</p>' +
						'<a href="' + link + '"></a>' +
					'</div>';
		},

		getJSON: function (url, callback){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					callback(JSON.parse(xmlhttp.responseText));
				}
			}
			
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

		},

		renderSections: function (response) {
			for(var i = 0; i < response.section.length; i++) {

				if(response.section[i].name === 'Brasil') {
					for(var b = 0; b < response.section[i].data.length; b++){
						console.log(b);
						console.log(response.section[i].data[b]);

						var secBrasil = document.getElementById('brasil');
						var template = document.createElement(Index.templateList(response.section[i].data[b].image, response.section[i].data[b].label, response.section[i].data[b].title, response.section[i].data[b].description, response.section[i].data[b].url));
						secBrasil.appendChild(template);
					} 
				}

			}

		},

		init: function () {
			Index.getJSON(URLDATA, Index.renderSections);
		}
	}

})(window, document);