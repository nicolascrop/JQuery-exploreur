/*
	Author : Nicolas Crop
	You can use and modify this code as you want
	if you have any question or if you improved this code a lot
	contact me at: crop.nicolas@gmail.com
*/

(function( $ ) {

	'use strict';

	$.Explorer = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	$.Explorer.defaults = {
		//Size: width and height in pixel of an icon 
		size: "40",
		//This is for exemple you can modify it*/
		explData: {
					"name": "root",
					"description":"This is a description",
					"items":
					{
						"folders":
						[
							{
								"name":"Pictures1",
								"description":"folder of picture",
								"items":
								{
									"files":
									[
										{"name":"file4.jpg", "description":"Picture of me roaming", "link":"#"},
										{"name":"file5.bmp", "description":"Picture of me coding", "link":"#"},
										{"name":"file6.png", "description":"Picture of me sleeping", "link":"#"},
									]
								}
							},
							{
								"name":"Pictures2",
								"description":"folder of picture",
								"items":
								{
									"files":
									[
										{"name":"file4.jpg", "description":"Picture of me roaming", "link":"#"},
										{"name":"file5.bmp", "description":"Picture of me coding", "link":"#"},
										{"name":"file6.png", "description":"Picture of me sleeping", "link":"#"},
									]
								}
							},
						],
						"files":
						[
							{"name":"file1.pdf", "description":"Picture of me snoozing", "link":"#"},
							{"name":"file2.doc", "description":"Picture of me jumping", "link":"#"},
							{"name":"file3.jpg", "description":"Picture of me eating", "link":"#"},
						]
					}
				},
		onLastItemClick : function( itemProperties ) { return false; }
	};

	$.Explorer.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.Explorer.defaults, options );

			this.explData = this.options.explData;
			this.root = this.explData;
			this.navBar = new Array();
			this.exploreFolder("root");

		},
		_generateTemplate : function ( callback ){

			var head = this._getHead(),
				body = this._getBody();

			this.$expl = $( '<div class="expl-explorer">' ).append( head, body );

			this.$el.find( 'div.expl-explorer' ).remove().end().append( this.$expl );

			if( callback ) { callback.call(); }

		},
		_getHead : function (){

			var html = '<ul class="expl-navBar">';

			for (var folder in this.navBar)
				html += '<li class="expl-navBar-folder"><a href="#" class="expl-btn expl-btn-up">' + this.navBar[folder] + '</a></li>';

			html += '</ul>';
			return html;

		},
		_getBody : function (){

			var html = '<ul class="expl-liste">';

			if (this.root.items.folders != undefined)
				$.each(this.root.items.folders, function(i, item){

					html += '<li class="expl-folder" data-link="' + item.name + '"><a href="#" class="expl-liste-btn"><span class="expl-icon-folder"></span><span class="expl-folderName">' + item.name + '</span><span class="expl-folderDesc">' + item.description + '</span></a></li>';

				});

			if (this.root.items.files != undefined)
				$.each(this.root.items.files, function(i, item){

					var classe;
					var type = item.name.substr(item.name.lastIndexOf("."));

					//Set icon for each type
					if (type == ".pdf")
						classe = "expl-icon-pdf";
					else if (type == ".jpg" || type == ".gif" || type == ".jpeg" || type == ".png" || type == "bmp")
						classe = "expl-icon-pic";
					else if (type == ".doc" || type == ".docx")
						classe = "expl-icon-doc";
					else if (type == ".xls")
						classe = "expl-icon-xls";
					else if (type == ".mp3" || type == ".flac" || type == ".flv" || type == ".ogg")
						classe = "expl-icon-zik";
					else
						classe = "expl-icon-default";

					html += '<li class="expl-file" data-link="' + item.link + '"><a href="#" class="expl-liste-btn">';
					if (classe == "expl-icon-pic")
						html += '<img class="expl-icon-pic" />';
					else
						html += '<span class="' + classe + '"></span>';
					html += '<span class="expl-fileName">' + item.name + '</span><span class="expl-fileDesc">' + item.description + '</span></a></li>';

				});

			html += '</ul></div>';

			return html;

		},
		_initEvents : function (){

			var obj = this;

			$(".expl-icon-pic").each(function(){

				var maxWidth = 31,
			  		maxHeight = 31,
					dW = 0,
			  		dH = 0,
			  		oImg = new Image();

				$(this).attr("src", $(this).parent().parent().attr("data-link"));

			});

			$(".expl-btn").hover(function(){
				$(this).addClass("expl-btn-hover");
			}, function(){
				$(this).removeClass("expl-btn-hover");
				$(this).removeClass("expl-btn-down");
			}).mousedown(function(){
				$(this).removeClass("expl-btn-hover");
				$(this).addClass("expl-btn-down");
			}).mouseup(function(){
				$(this).removeClass("expl-btn-down");
				$(this).addClass("expl-btn-up");
			}).click(function(){
				obj.exploreFolder($(this).html());
			});

			$(".expl-liste-btn").mousedown(function(){
				$(this).addClass("expl-btn-down");
			}).mouseup(function(){
				$(this).removeClass("expl-btn-down");
			}).hover(function(){
			}, function(){
				$(this).removeClass("expl-btn-down");
			}).click(function(){
				if ($(this).parent().hasClass("expl-folder"))
					obj.exploreFolder($(this).parent().attr("data-link"));
				else
				{
					var ext = $(this).parent().attr("data-link").substring($(this).parent().attr("data-link").lastIndexOf("."));
		            if (ext == ".pdf" || ext == ".jpg" || ext == ".jpeg" || ext == ".png"
		                || ext == ".gif" || ext == ".bmp" || ext == ".pdf" || ext == ".txt")
		              window.open($(this).parent().attr("data-link"));
		            else
		              window.open($(this).parent().attr("data-link"), "_self");
		            return;
				}
			});
		},
		searchObject : function( objectName, startPoint ) {

			startPoint = typeof startPoint !== 'undefined' ? startPoint : this.explData;
			
			if (startPoint.name == folderName)
				return startPoint;

			if (startPoint.items.folders != undefined)
				$.each(startPoint.items.folders, function(i, item){
					if (file.name == objectName)
	    				return this.searchObject(folderName, folder);
				});

			if (startPoint.items.files != undefined)
				$.each(startPoint.items.files, function(i, item){
					if (file.name == objectName)
	    				return file;
				});

			return null;

		},
		exploreFolder : function (folderName) {

			var tmpNavBar = new Array();
			var saveRoot = this.root;

			this.goToFolder(folderName, this.explData, tmpNavBar.slice());

			if (folderName != saveRoot.name && this.root.name == saveRoot.name)
			{
				alert("No folder found");
				return;
			}
			this._generateTemplate();
			this._initEvents();

		},
		goToFolder : function( folderName, startPoint, tmpNavBar ) {

			startPoint = typeof startPoint !== 'undefined' ? startPoint : this.explData;
			
			var pointer = this;
			tmpNavBar.push(startPoint.name);

			if (startPoint.name == folderName)
			{
				this.root = startPoint;
				this.navBar = tmpNavBar;
			}
			else
			{
				if (startPoint.items.folders != undefined)
					$.each(startPoint.items.folders, function(i, item){
						pointer.goToFolder(folderName, item, tmpNavBar.slice());
					});
			}

		},
		goToRoot : function() {

			this.root= this.explData;
			this._generateTemplate();

		}
	};

	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};

	$.fn.explorer = function( options ) {

		var instance = $.data( this, 'explorer' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on calendario prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for calendario instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'explorer', new $.Explorer( options, this ) );
				
				}

			});
		
		}
		
		return instance;

	};

})( jQuery );