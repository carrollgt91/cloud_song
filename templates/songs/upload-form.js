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
