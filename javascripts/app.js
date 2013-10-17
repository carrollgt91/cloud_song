// @codekit-prepend "templates.js"
// @codekit-prepend "../templates/application/nav.js"
// @codekit-prepend "../templates/artists/signup-form.js"
// @codekit-prepend "../templates/sessions/login.js"
// @codekit-prepend "../templates/static_pages/about.js"
// @codekit-prepend "../templates/static_pages/landing.js"


function isSignedIn() {
  $.ajax("logged_in", {
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
