
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