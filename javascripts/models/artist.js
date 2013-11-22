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