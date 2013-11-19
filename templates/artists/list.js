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