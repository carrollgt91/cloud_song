// @codekit-prepend "templates.js"
// @codekit-prepend "../templates/application/nav.js"
// @codekit-prepend "../templates/artists/signup-form.js"
// @codekit-prepend "../templates/sessions/login.js"
// @codekit-prepend "../templates/static_pages/about.js"
// @codekit-prepend "../templates/static_pages/landing.js"
// @codekit-prepend "../templates/artists/list.js"
// @codekit-prepend "../templates/player/small.js"
// @codekit-prepend "helpers.js"

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

$.ajaxPrefilter( function( options, originalOptions, jqHXR) {
  options.url = "api/index.php" + options.url;
});

var Artists = Backbone.Collection.extend({
  url: '/artists'
});

var Artist = Backbone.Model.extend({
  urlRoot: '/artists'
});

var ArtistList = Backbone.View.extend({
  el:'.page',
  render: function() {
    var that = this;
    var artists = new Artists();
    artists.fetch( 
    {
      success: function(artists) {
        var template = _.template(App.Templates["artists/list"], {artists: artists.models });

        that.$el.html(template);
      }
    })
  }
});

var Landing = Backbone.View.extend({
  el:'.page',
  render: function() {    
    var template = App.Templates['static_pages/landing'];
    this.$el.html(template);
  }
});

var About = Backbone.View.extend({
  el:'.page',
  render: function() {    
    var template = App.Templates["static_pages/about"];
    this.$el.html(template);
  }
});

var SignupForm = Backbone.View.extend( {
  el:'.page',
  render: function() {
    var template = App.Templates['artists/signup-form'];
    this.$el.html(template);
  },
  events: {
    'submit .signup-form': 'saveArtist'
  },

  saveArtist: function(ev) {
    var artistDetails = $(ev.currentTarget).serializeObject();
    var artist = new Artist();
    artist.save(artistDetails, {
      success: function(artist) {
        router.navigate('', {trigger: true});
      }
    })
    return false;
  }
})

var LoginForm = Backbone.View.extend( {
  el:'.page',
  render: function() {
    var template = App.Templates['sessions/login'](App.currentUser);
    this.$el.html(template);
  },
  events: {
    'submit .login-form': 'signInArtist'
  },

  signInArtist: function(ev) {
    var loginDetails = $(ev.currentTarget).serializeObject();
    $.ajax({
      url:'/login',
      type:'POST',
      dataType:'json',
      data: loginDetails,
      success:function(data) {
        App.Flash.success("You are now logged in!");
        App.currentArtist.set(data);
        nav.render();
        router.navigate('', {trigger: true});
      },
      error: function() {
        App.Flash.error("Invalid email or password");
      }
    });
    return false;
  }
});

var SmallPlayer = Backbone.View.extend({
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .fastforward': 'fastforward',
    'click .rewind': 'rewind'
  },

  play: function(ev) {
    currentSong.play();
    $(".play").replaceWith('<img src="assets/pause.png" alt="pause" class="pause">');
  },
  pause: function(ev) {
    currentSong.pause();
    $(".pause").replaceWith('<img src="assets/play.png" alt="play" class="play">');
  },
  rewind: function(ev) {

  },
  forward: function(ev) {

  },

  render: function() {    
    var template = App.Templates['player/small'];
    this.$el.html(template);
  }
});


var Nav = Backbone.View.extend({
  el: $('.top-bar-section'),

  initialize: function() {
    this.listenTo(App.currentArtist, "change", this.render);
  },
  events: {
    'click .logout' : 'logout'
  },

  player: new SmallPlayer(),

  render : function() {
    var template = App.Templates['application/nav'];
    this.$el.html(template);
    this.assign({
      '.player': this.player
    });
  },

  logout: function() {
    $.ajax({
      url:'/logout',
      type:'GET',
      success:function() {
        App.currentArtist.clear();
        router.navigate('', {trigger: true});
        location.reload(true);
      }
    });
  }
})

var Router = Backbone.Router.extend({
  routes:{
    '': 'home',
    'signup': 'newArtist',
    'explore': 'listArtists',
    'about': 'about',
    'login': 'login'
  }
});

var loginForm = new LoginForm();
var artistList = new ArtistList();
var signupForm = new SignupForm();
var landing = new Landing();
var about = new About();
var nav = new Nav();
var smallPlayer = new SmallPlayer();

var router = new Router();

router.on('route:home', function() {
  landing.render();
});
router.on('route:listArtists', function() {
  artistList.render();
});
router.on('route:newArtist', function() {
  signupForm.render();
});
router.on('route:about', function() {
  about.render();
});
router.on('route:login', function() {
  loginForm.render();
});

isSignedIn();
nav.render();

Backbone.history.start();

var currentSong = null;

soundManager.setup({
  url:'javascripts/libs/soundmanager2/swf/',
  flashVersion: 9,
  onready: function() {
    currentSong = soundManager.createSound({
      url: 'assets/sounds/5/01 Intro.mp3',
      autoPlay:false
    });
  }

})