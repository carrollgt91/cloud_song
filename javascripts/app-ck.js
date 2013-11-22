window.App = { Templates : {} };

/* **********************************************
     Begin nav.js
********************************************** */

App.Templates['application/nav'] = _.template('\
  <li><a href="#">Home</a></li>\
  <li><a href="#/explore">Explore</a></li>\
  <% if(App.currentArtist.isSignedIn()) { %>\
    <li><a href="#/logout" class="logout">Sign Out</a></li>\
    <li><a href="#/upload" class="upload">Upload</a></li>\
  <% } else { %>\
    <li><a href="#/signup">Sign Up</a></li>\
    <li><a href="#/login">Log In</a></li>\
  <% } %>\
  <li><a href="#/about">About</a></li>\
');

/* **********************************************
     Begin signup-form.js
********************************************** */

App.Templates['artists/signup-form'] = _.template('\
  <form action="/artist/new" class="signup-form large-12 columns" data-abide>\
    <fieldset>\
        <div class="row">\
          <div class="large-6 columns">\
            <input type="text" name="name" placeholder="Name" required/>\
          </div>\
          <div class="large-6 columns">\
            <input type="text" name="location" placeholder="Location"/>          \
          </div>\
        </div>\
      </div>\
\
      <div class="row">\
        <div class="large-6 columns">\
          <input type="email" name="contact" placeholder="Email" required/>\
        </div>\
        <div class="large-6 columns">\
            <input type="password" name="password" placeholder="Password" required/>          \
          </div>\
        </div>\
      </div>\
\
      <div class="row">\
        <div class="large-12 columns">\
          <input type="text" name="tagline" placeholder="Tagline"/>\
        </div>\
      </div>\
\
      <div class="row">\
        <div class="large-12 columns centered">\
          <button type="submit" class="medium"> Sign Up</button>\
        </div>\
      </div>\
      <div class="row">\
        <div class="large-12 columns centered">\
          <h4> Already have an account? <a href="#/login">Log in here </a> </h4>\
        </div>\
      </div>\
    </fieldset>\
  </form>\
');

/* **********************************************
     Begin login.js
********************************************** */

App.Templates['sessions/login'] = _.template('\
<form action="login" class="login-form large-12 columns" data-abide>\
  <fieldset>\
    <div class="row">\
      <div class="large-8 large-offset-2 columns">\
        <input type="email" name="contact" placeholder="Email" required/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-8 large-offset-2 columns">\
        <input type="password" name="password" placeholder="Password" required/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-12 columns centered">\
        <button type="submit" class="medium"> Log in </button>\
      </div>\
    </div>\
  </fieldset>\
</form>\
');

/* **********************************************
     Begin about.js
********************************************** */

App.Templates['static_pages/about'] = _.template('\
<div class="row">\
  <div class="large-8 columns">\
    <h1>About Cloudsong</h1>\
    <p> For this project, I\'m building a site inspired heavily by <a href="https://www.soundcloud.com">Soundcloud</a>.\
    </p>\
    <p> It\'s by far my favorite web application, and the constraint of having music play as you navigate the site brings up some interesting technological challenges. The primary obstacle is being unable to utilize page redirects at all. This means that every interaction on the site must be asynchronous.\
    </p>\
\
    <p>In order to accomplish this, I\'m using a few tools and techniques that go beyond the scope of the class but are quite standard in modern web development. This page will give you an overview of the tools I\'m using and how the different parts of the application function come together.\
    </p>\
    <h2>Frameworks</h2>\
    <h4>Front end </h4>\
    <h5> <a href="http://foundation.zurb.com/">Zurb-foundation</a></h5>\
    <p>This is an incredible UI/Front end framework. Foundation allows you to make your websites beautiful without having to write a lot of the more common code yourself. The biggest perks are the grid system (which allows you to build your website for desktop and mobile simultaneously. It\'s built on <a href="http://sass-lang.com/">SASS</a>, which helps you keep your CSS concise and effective.</p>\
\
    <h4>Backbone</h4>\
    <h5><a href="http://backbonejs.org/">Backbone.js</a></h5>\
    <p>This framework is what\'s doing the heavy lifting in this application. It\'s built for Javascript, so the majority of the actual functionality of the site will be written on top of this framework. It is what allows me to change the content of the pages without having to redirect to any other pages.\
    </p>\
    <p>\
    Instead, it simply grabs information from the server/database asynchronously (using AJAX) and then repopulates the views on the front end according to what is returned. It has a templating engine (think how you replace parts of your html page with php), a routing engine (which is how it knows that /explore should render the template to list all the artists), and model functionality (which allows you to really easily and intuitively interact with the backend without having to write SQL in javascript. More on that later.)</p>\
    <h4> Back End </h4>\
    <h5> <a href="http://www.slimframework.com/">Slim</a></h5>\
    <p> Slim is a tiny PHP framework that takes care of some really common necessities in modern web development. It provides a number of functionalities that they describe well on the site, but the reason I\'m using it is for it\'s API functionality.\
\
    <h4> APIs </h4>\
    <p>\
      APIs (Or application programming interfaces) are the way modern web services provide data from servers to the any source who might need it. For Backbone to be able to interact with the database, it needs some way of talking to it through a secure, consistant channel. It does so by responding to requests at given <b>endpoints</b>.\
      </p> \
      <p>\
      For example, sending a GET request to the <a href="api/index.php/artists"> /artists </a> endpoint will return the data needed to populate a list of artists. Most APIs communicate with their clients via JSON (<b>J</b>ava<b>s</b>cript <b>O</b>bject <b>N</b>otation), because nearly every programming language can easily parse JSON, it\'s human readable, and Javascript itself is often the language that\'s consuming these APIs, which is the case for CloudSong as well. The Backbone AJAX calls I mentioned earlier hit these endpoints in order to get information on artists, songs, tags, and all the other data that makes the app tick.\
      </p>\
    </p>\
  </div>\
</div>\
');

/* **********************************************
     Begin landing.js
********************************************** */

App.Templates['static_pages/landing'] = _.template('\
<div class="row">\
  <div class="large-8 columns">\
    <h1>Listen to the songs of the Internet</h1>\
    <h2>Find new tunes, keep track of your favorite artists, and help spread the love for great \music.</h2>\
\
    <a href="#/signup" class="large button join-button">Join Cloudsong</a>\
    <a href="#/login" class="large button">Login</a>      \
  </div>\
</div>\
');

/* **********************************************
     Begin list.js
********************************************** */

App.Templates['artists/list'] ='\
<div class="row">\
      <% _.each(artists, function(artist) { %>\
\
      <div class="artist columns large-6">\
        <h4 class="name">\
          <a href="#/artist/<%=artist.get("id")%>"><%= artist.get("name") %></a>\
        </h4>\
        <span class="location">\
          <%= artist.get("location") %>\
        </span>\
      </div>\
      <% }); %>\
    </div>\
';

/* **********************************************
     Begin small.js
********************************************** */

App.Templates['player/small'] = '\
<li>\
  <a href="#" class="song"><%= song.artist %> - <%= song.title %></a>\
</li>\
<li>\
  <img src="assets/rewind.png" alt="rewind" class="rewind">\
  <img src="assets/play.png" alt="play" class="play">\
  <img src="assets/fastforward.png" alt="fastforward" class="fastforward">\
</li>\
';

/* **********************************************
     Begin show.js
********************************************** */

App.Templates['artists/show'] ='\
<div class="row">\
  <h1> <%= artist.get("name") %></h1>\
  <% _.each(songs, function(song) { %>\
\
  <div class="song columns large-12">\
    <h4 class="name">\
      <%= song.get("title") %>\
    </h4>\
  </div>\
  <% }); %>\
</div>';

/* **********************************************
     Begin upload-form.js
********************************************** */

App.Templates['songs/upload-form'] ='\
  <form action="api/index.php/songs/upload" class="upload-form large-12 columns" data-abide>\
    <fieldset>\
        <div class="row">\
          <div class="large-12 columns">\
            <input type="text" name="title" placeholder="Title" required/>\
            <input type="hidden" name="artist_id" value=<%= artist.get("id")%> />\
          </div>\
      </div>\
\
      <div class="row">\
        <div class="large-12 columns" id="upload-manager">\
        </div>\
      </div>\
\
    </fieldset>\
  </form>\
';


/* **********************************************
     Begin song.js
********************************************** */

var Song = Backbone.Model.extend({
  urlRoot: 'api/index.php/songs',
});

var Songs = Backbone.Collection.extend({
  url: "api/index.php/songs",
});

/* **********************************************
     Begin artist.js
********************************************** */

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

/* **********************************************
     Begin song.js
********************************************** */


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

/* **********************************************
     Begin artist.js
********************************************** */


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

/* **********************************************
     Begin static.js
********************************************** */

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

/* **********************************************
     Begin session.js
********************************************** */


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

/* **********************************************
     Begin helpers.js
********************************************** */

Backbone.View.prototype.assign = function (selector, view) {
    var selectors;
    if (_.isObject(selector)) {
        selectors = selector;
    }
    else {
        selectors = {};
        selectors[selector] = view;
    }
    if (!selectors) return;
    _.each(selectors, function (view, selector) {
        view.setElement(this.$(selector)).render();
    }, this);
}

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};


var uploadManager = new Backbone.UploadManager({
    'uploadUrl': '/cloud_song/api/index.php/songs/upload',
    'templates': {
        'main': 'upload_manager/upload-manager.main',
        'file': 'upload_manager/upload-manager.file'
    }
});

/* **********************************************
     Begin app.js
********************************************** */

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
    url: App.currentSong.track_url,
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
        autoPlay: false,
        onfinish: transitionSong
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