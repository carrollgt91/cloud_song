// @codekit-prepend "templates.js"
// @codekit-prepend "../templates/application/nav.js"
// @codekit-prepend "../templates/artists/signup-form.js"
// @codekit-prepend "../templates/sessions/login.js"
// @codekit-prepend "../templates/static_pages/about.js"
// @codekit-prepend "../templates/static_pages/landing.js"


function isSignedIn() {
	$.ajax("/logged_in", {
		type: "GET",
		 dataType: "json",
		 success: function(data) {
			 App.currentArtist.set(data);
		 },
		 error: function() {
			 return false;
		 }
	});
}


var Artist = Backbone.Model.extend({
	urlRoot: '/artists',

	isSignedIn: function() {
		return !this.isNew();
	}
});

App.currentArtist = new Artist;



App.Flash = {
	notice: function(msg) {
		return this.notification('notice', 5000, msg);
	},
	alert: function(msg) {
		return this.notification('alert', false, msg);
	},
	error: function(msg) {
		return this.notification('error', 5000, msg);
	},
	success: function(msg) {
		return this.notification('success', 5000, msg);
	},
	notification: function(type, timeout, msg) {
		$.noty.closeAll();
		return noty({
			text: msg,
			type: type,
			theme: 'defaultTheme',
			layout: "top",
			animation: {
				open: {
					height: "toggle"
				},
				close: {
					height: "toggle"
				},
				easing: 'swing',
				speed: 300
			},
			timeout: timeout,
			closeWith: ['click', 'button'],
			modal: false
		});
	}
};

console.log(App.Flash);
