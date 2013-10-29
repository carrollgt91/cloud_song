App.Templates['application/nav'] = _.template('\
  <ul class="right">\
    <li><a href="#">Home</a></li>\
    <li><a href="#/explore">Explore</a></li>\
    <% if(App.currentArtist.isSignedIn()) { %>\
      <li><a href="#/logout" class="logout">Sign Out</a></li>\
    <% } else { %>\
      <li><a href="#/signup">Sign Up</a></li>\
      <li><a href="#/login">Log In</a></li>\
    <% } %>\
    <li><a href="#/about">About</a></li>\
  </ul>\
');