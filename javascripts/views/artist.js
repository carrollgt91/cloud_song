
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
  el:'.artist-wrap',

  initialize: function() {
    dispatcher.on("CloseView", this.close, this);
  },

  events: {
    'click .title': 'playSong'
  },

  playSong: function(ev) {
    var list = this.model.get("songs").models;
    var index = parseInt(ev.currentTarget.id);
    if(list != App.currentList) {
      changeCurrentList(list, index);    
    } else {
      changeCurrentSong(list[index]);
    }
    return false;
  },

  render: function() {
    var that = this;
    this.model.fetch({
      success: function(artist) {
        var that2 = that;
        var songs = artist.get("songs");
        songs.url = artist.url() + "/songs";
        songs.fetch({
          success: function(songs) {
            that2.model.set({"songs": songs});
            var template = _.template(App.Templates["artists/show"], {artist: that2.model, songs: songs.models});

            that2.$el.html(template);
          }
        });
      }
    });
  },

  close: function() {
    // Unregister for event to stop memory leak
    console.log("closing down");
    dispatcher.off( 'CloseView', this.close, this );
    this.remove();
    this.unbind();
    this.views = [];   // Clear the view array
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