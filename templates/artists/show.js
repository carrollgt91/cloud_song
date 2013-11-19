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
</div>'