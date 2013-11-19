// @codekit-prepend "templates.js"
// @codekit-prepend "../templates/application/nav.js"
// @codekit-prepend "../templates/artists/signup-form.js"
// @codekit-prepend "../templates/sessions/login.js"
// @codekit-prepend "../templates/static_pages/about.js"
// @codekit-prepend "../templates/static_pages/landing.js"
// @codekit-prepend "../templates/artists/list.js"
// @codekit-prepend "../templates/player/small.js"
// @codekit-prepend "../templates/artists/show.js"
// @codekit-prepend "../templates/songs/upload-form.js"
// @codekit-prepend "helpers.js"

function isSignedIn() {
	$.ajax("api/index.php/logged_in", {
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

function grabSongs() {
  $.ajax("api/index.php/artists/5/songs", {
    type: "GET",
     dataType: "json",
     success: function(data) {
       App.currentList = data;
       App.currentIndex = 0;
       App.currentSong = App.currentList[0];
       App.currentSound = soundManager.createSound({
        url: App.currentSong.track_url,
        autoPlay: false
       });

       player.render();
     },
     error: function() {
       return false;
     }
  });
}

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

var Song = Backbone.Model.extend({
  urlRoot: 'api/index.php/songs',
});

var Songs = Backbone.Collection.extend({
  url: "api/index.php/songs",
});

var SongList = Backbone.View.extend({

  
  render: function(javascripts) {
    var that = this;
    var songs = new Songs();
    songs.fetch( 
    {
      success: function(artists) {
        var template = _.template(App.Templates["songs/list"], { songs: songs.models });

        that.$el.html(template);
      }
    })
  }
});


var Artist = Backbone.Model.extend({

  initialize: function() {
    this.urlRoot = "api/index.php/artists"
    var songs = new Songs();
    this.set("songs", songs);
  },

  isSignedIn: function() {
    return this.id == App.currentArtist.id && !this.isNew();
  }

});

//Sets the current artist to be blank so you can easily assign it later
App.currentArtist = new Artist;
App.currentList = null;

var Artists = Backbone.Collection.extend({
  url: 'api/index.php/artists'
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

var ArtistView = Backbone.View.extend({
  el:'.page',

  render: function() {
    var that = this;
    this.model.fetch({
      success: function(artist) {
        var that2 = that;
        var songs = artist.get("songs");
        songs.url = artist.url() + "/songs";
        songs.fetch({
          success: function(songs) {
            var template = _.template(App.Templates["artists/show"], {artist: artist, songs: songs.models});

            that2.$el.html(template);
          }
        });
      }
    });
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
      url:'api/index.php/login',
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

var Player = Backbone.View.extend({
  el: $('.player'),
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .fastforward': 'fastforward',
    'click .rewind': 'rewind'
  },

  swapArtist: function() {
    $(".player>li>.song").html(App.currentSong.artist + " - " + App.currentSong.title);
  },

  play: function(ev) {
    App.currentSound.play();
    $(".play").replaceWith('<img src="assets/pause.png" alt="pause" class="pause">');
  },
  pause: function(ev) {
    App.currentSound.pause();
    $(".pause").replaceWith('<img src="assets/play.png" alt="play" class="play">');
  },
  rewind: function(ev) {
    //if it's currently paused, we shouldn't play the next song automatically
    var shouldPlay = App.currentSound.playState == 1 && !App.currentSound.paused

    App.currentSound.stop();
    App.currentIndex = App.currentIndex==0 ? App.currentList.length -1 : App.currentIndex - 1;
    App.currentSong = App.currentList[App.currentIndex];
    App.currentSound = soundManager.createSound({
      url: App.currentSong.track_url,
      autoPlay: shouldPlay
   });
    this.swapArtist();
  },
  fastforward: function(ev) {
    //if it's currently paused, we shouldn't play the next song automatically
    var shouldPlay = App.currentSound.playState == 1 && !App.currentSound.paused

    App.currentSound.stop();
    App.currentIndex = (App.currentIndex+1) % App.currentList.length
    App.currentSong = App.currentList[App.currentIndex];
    App.currentSound = soundManager.createSound({
      url: App.currentSong.track_url,
      autoPlay: shouldPlay
   });
    this.swapArtist();
  },

  render: function() {    
    var template = _.template(App.Templates["player/small"], {song: App.currentSong});
    this.$el.html(template);
  }
});

var Upload = Backbone.View.extend( {
  el:'.page',
  render: function() {
    var template = _.template(App.Templates['songs/upload-form'], {artist:App.currentArtist});
    this.$el.html(template);
    uploadManager.renderTo($('#upload-manager'));
  },
  events: {
    'submit .upload-form': 'saveSong'
  },

  saveSong: function(ev) {
    var songDetails = $(ev.currentTarget).serializeObject();
    var song = new Song();



    song.save(songDetails, {
      success: function(song) {
        router.navigate('artist/' + App.currentArtist.id, {trigger: true});
      }
    })
    return false;
  }
})

var Nav = Backbone.View.extend({
  el: $('.right'),

  initialize: function() {
    this.listenTo(App.currentArtist, "change", this.render);
  },

  events: {
    'click .logout' : 'logout'
  },

  render : function() {
    var template = App.Templates['application/nav'];
    this.$el.html(template);
    
  },

  logout: function() {
    $.ajax({
      url:'api/index.php/logout',
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
    'artist/:id': 'showArtist',
    'about': 'about',
    'login': 'login',
    'upload': 'upload',
  }
});

var loginForm = new LoginForm();
var artistList = new ArtistList();
var signupForm = new SignupForm();
var landing = new Landing();
var about = new About();
var nav = new Nav();
var player = new Player();
var upload = new Upload();

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
  if(!App.currentArtist.isNew()) {
    router.navigate("", true);
  } else {
    loginForm.render();
  }
});

router.on('route:upload', function() {
  if(App.currentArtist.isNew()) {
    router.navigate("", true);
  } else {
    upload.render();
    $("#f1_upload_process").hide();
  }
});

router.on('route:showArtist', function(id) {
  var artist = new Artist({id:id});
  var view = new ArtistView({model:artist})
  view.render();
});
isSignedIn();
nav.render();

Backbone.history.start();

soundManager.setup({
  url:'javascripts/libs/soundmanager2/swf/',
  flashVersion: 9,
  onready: function() {
    console.log("ready");
    grabSongs();
  }
});