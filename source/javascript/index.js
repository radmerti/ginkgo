function hideContent(onPreviousHidden, clickTarget) {
	"use strict";
	// TODO: [OPT] system individual (and selectively delayed) hiding of child elements
	var num_waiting = 0;
	$('.content').children('div').each(function(index, element) {
		var pageContainer = $(this); // TODO: [Q] Why jQuery? Use element.[...]?
		if(pageContainer.hasClass('enter')) {

			// get all the childs of that div that have the hideable child class
			var hideableChilds = $('.enter-child', pageContainer);
			if(hideableChilds.length > 0) {
				num_waiting += hideableChilds.length;
				// catch the animationend event 
				pageContainer.on('animationend webkitAnimationEnd', function(event) {
					if($(this).hasClass('.enter-child') && $(this).hasClass('exit')) {
						$(this).hide();
						num_waiting -= 1;
						if(num_waiting === 0) onPreviousHidden();
					}
				});
				hideableChilds.each(function(){
					$(this).removeClass('enter');
					$(this).addClass('exit');
				});
			} else {
				num_waiting += 1;
				pageContainer.on('animationend webkitAnimationEnd', function(event) {
					if(event.target === this && $(this).hasClass('exit')) {
						$(this).hide();
						num_waiting -= 1;
						if(num_waiting === 0) onPreviousHidden();
					}
				});
				pageContainer.removeClass('enter');
				pageContainer.addClass('exit');	
			}
			
		} else {
			pageContainer.hide();
		}
	});
	if(num_waiting === 0) onPreviousHidden();		
}

// TODO: [BUG] article is not loaded when embedded image(s) are not loadable (have dummy image!)
// TODO: [OPT] Is it beneficial to embed the whole article HTML in the data-content property? Compression should get rid of most of the extra size.
function loadArticle(article, isPoppingState) {
	"use strict";
	var contentURL = '/articles/'+article+'.html';
	// var articleGridContainer = $('.content #article-grid-container');
	$.get(contentURL, function(data) {
		var articleContainer = $('.content #article-container');
		articleContainer.html(data);

		// Render code syntax highlighting
		$('pre code', articleContainer).each(function(i, block) {
		    hljs.highlightBlock(block);
		});

		var images = $('img', articleContainer);
		if(images.length > 0) {
			var imagesLoaded = 0;
			images.load(function() {
				if(imagesLoaded++ === images.length-1) { // when all images are loaded

					articleContainer.show();

					articleContainer.removeClass('exit');
					articleContainer.addClass('enter');

					if(!isPoppingState) // Change the current URL
			        	window.history.pushState({article: article}, article, '/' + article);
				}
			});
		}
		else {
			articleContainer.show();

			articleContainer.removeClass('exit');
			articleContainer.addClass('enter');

			if(!isPoppingState) // Change the current URL
				window.history.pushState({article: article}, article, '/' + article);
		}
	});
}

// TODO: [BUG] Grid is not loaded when one or more thumbnails are not loadable (have dummy image!)
function loadArticleGrid(isPoppingState) {
	"use strict";
	$.get('/g', function(data) {
		var articleGridContainer = $('.content #article-grid-container');

		articleGridContainer.html(data);

		var images = $('img', articleGridContainer);
		var imagesLoaded = 0;
		images.load(function() { 
			// TODO: [OPT] remove check and instead display dominant color
			if(imagesLoaded++ === images.length-1) {
				articleGridContainer.show();
				
				$('.article-list-entry', articleGridContainer).removeClass('exit');
				$('.article-list-entry', articleGridContainer).addClass('enter');

				if(!isPoppingState)
					window.history.pushState(undefined, "Ginkgo Home", '/');
				
			}
		});
		$('.article-list-entry.clickable', articleGridContainer).click(function() {
			var This = $(this);
			hideContent(function() {
				loadArticle(This.data('content'), false);
			}, This);
		});
	});
}

// manages the page-containers based on URL state.
function loadPageContent(isPoppingState) {
	"use strict";
	$('.content').children('div').removeClass('exit'); // hide currently shown child elements
	var article = window.location.pathname.split('/')[1];
	// var previousDivHidden = false;
	if(article !== '') { // not empty?
		//$('.content').children('div').removeClass('exit');
		// if(article == "new-article") { // show the new-article page?
		// 	hideContent(function() { 
		// 		loadNewArticle(isPoppingState)
		// 	}, undefined);
		// } else { // else it's an article
			hideContent(function() { 
				loadArticle(article, isPoppingState);
			}, undefined);
		// }
	} 
	else { // load the root page
		hideContent(function() {
			loadArticleGrid(isPoppingState);
		}, undefined);
	}
}

window.onpopstate = function(event) {
	"use strict";
	loadPageContent(function() { return true; }, true);
};

$(document).ready(function() {
	"use strict";
	// catch the file-input change event to parse and display the new file
	$('#new-article-click .hidden-input').change(function(event) {
		var articleContainer = $('.content #article-container');

		var file;

		// load the file
		if( this.files )
			file = this.files[0];
		var reader = new FileReader();
		
		reader.onload = function(event) {

			marked(event.target.result, function(error, articleContent) {
				articleContainer.html(articleContent);

				var title = $('.header h1', articleContainer).text();
				var subtitle = $('.header h2', articleContainer).text();
				//$('.header', articleContainer).remove();


				//$('.metadata', articleContainer).remove();

				var content = $(articleContainer).html().replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ");

				var postJSON = {
					"authors": 0,
					"title": title,
					"subtitle": subtitle,
					"content": content,
					"topics": 0 
				};

				// Render code syntax highlighting
				$('pre code', articleContainer).each(function(i, block) {
					hljs.highlightBlock(block);
				});

				articleContainer.show();
				articleContainer.removeClass('exit');
				articleContainer.addClass('enter');
				var uploadButton = $('#upload-artice-click');
				uploadButton.fadeIn("slow");

				var jContent = $(articleContent);
			});
		};

		// hide the articleContainer if it was shown before
		if(articleContainer.hasClass('enter')) {
			articleContainer.removeClass('enter');
			articleContainer.addClass('exit');
		}

		reader.readAsText(file);
	});
});

$(window).load(function() {
	"use strict";
	$('body').addClass('enter');

	$('body').on('animationend webkitAnimationEnd', function(event) {
		if(event.target === this && $(this).hasClass('enter')) {
			loadPageContent(true);
		}
	});

	// add the root page to the history if the state is not the root page
	var endpoint = window.location.pathname.split('/')[1];
	if(endpoint !==  '') {
		window.history.replaceState(undefined, "Ginkgo Home", '/');
		window.history.pushState(undefined, "", endpoint);
	}
});