
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