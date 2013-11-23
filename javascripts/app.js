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
// @codekit-prepend "models/song.js"
// @codekit-prepend "models/artist.js"
// @codekit-prepend "views/song.js"
// @codekit-prepend "views/artist.js"
// @codekit-prepend "views/static.js"
// @codekit-prepend "views/session.js"
// @codekit-prepend "helpers.js"

var dispatcher = _.clone(Backbone.Events);

function transitionSong(shouldPlay, direction) {
  shouldPlay = typeof shouldPlay !== 'undefined' ? shouldPlay : true;
  direction = typeof direction !== 'undefined' ? direction : 'forward';

  App.currentSound.stop();

  if(direction == "forward") {
    App.currentIndex = (App.currentIndex+1) % App.currentList.length
  } else if (direction == "backward") {
    App.currentIndex = App.currentIndex==0 ? App.currentList.length -1 : App.currentIndex - 1;    
  }
  App.currentSong = App.currentList[App.currentIndex];
  App.currentSound = soundManager.createSound({
    url: App.currentSong.get("track_url"),
    autoPlay: shouldPlay,
    onfinish: transitionSong
 });
  player.swapArtist();
}

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

function changeCurrentList(list, index) {
  App.currentList = list;
  App.currentIndex = index;
  App.currentSong = App.currentList[index];
  App.currentSound.stop();
  App.currentSound = soundManager.createSound({
    url: App.currentSong.get("track_url"),
    autoPlay: false,
    onfinish: transitionSong
  });
  player.swapArtist();
  player.play();
}

function changeCurrentSong(song) {
  App.currentSong = song;
  App.currentSound.stop();
  App.currentSound = soundManager.createSound({
    url: App.currentSong.get("track_url"),
    autoPlay: false,
    onfinish: transitionSong
  });
  player.swapArtist();
  player.play();
}

function grabSongs() {
  $.ajax("api/index.php/artists/5/songs", {
    type: "GET",
     dataType: "json",
     success: function(data) {
        var artist = new Artist({"id":5});
        artist.fetch({
          success: function(artist) {
            artist.songs = new Songs();
            var songs = artist.get("songs");
            songs.url = artist.url() + "/songs";
            songs.fetch({
              success: function(songs) {
                App.currentList = songs.models;
                App.currentIndex = 0;
                App.currentSong = App.currentList[0];
                App.currentSound = soundManager.createSound({
                 url: App.currentSong.get("track_url"),
                 autoPlay: false,
                 onfinish: transitionSong
                });
                player.render();
                player.swapArtist();
              }
            });
          }
        });     },
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

//Sets the current artist to be blank so you can easily assign it later
App.currentArtist = new Artist;
App.currentList = null;

var Player = Backbone.View.extend({
  el: $('.player'),
  events: {
    'click .play': 'play',
    'click .pause': 'pause',
    'click .fastforward': 'fastforward',
    'click .rewind': 'rewind'
  },

  swapArtist: function() {
    $(".player>li>.song").html(App.currentSong.get("artist") + " - " + App.currentSong.get("title"));
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
    transitionSong(shouldPlay, "backward");
  },
  fastforward: function(ev) {
    //if it's currently paused, we shouldn't play the next song automatically
    var shouldPlay = App.currentSound.playState == 1 && !App.currentSound.paused

    transitionSong(shouldPlay, "forward");
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
    var uploadManager = new Backbone.UploadManager({
        'uploadUrl': 'api/index.php/songs/upload',
        'templates': {
            'main': 'upload-manager.main',
            'file': 'upload-manager.file'
        }
    });
    uploadManager.renderTo($('#upload-manager'));
    uploadManager.on("filedone", function() {
      router.navigate('explore', {trigger: true});
      App.Flash.success("Song successfully uploaded.");
    });
  },
  events: {
    'submit .upload-form': 'saveSong'
  },

  saveSong: function(ev) {
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
  },
  before: function() {
    dispatcher.trigger("CloseView");
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
  var $artistEl = $('<div class="artist-wrap"/>');
  $(".page").empty();
  $(".page").append($artistEl);
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