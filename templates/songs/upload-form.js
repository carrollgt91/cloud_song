App.Templates['songs/upload-form'] = _.template('\
  <form action="/songs/new" class="upload-form large-12 columns" data-abide>\
    <fieldset>\
        <div class="row">\
          <div class="large-12 columns">\
            <input type="text" name="title" placeholder="Title" required/>\
          </div>\
      </div>\
\
      <div class="row">\
        <div class="large-12 columns">\
          <input type="file" name="location" placeholder="Location"/>          \
        </div>\
      </div>\
\
      <div class="row">\
        <div class="large-12 columns centered">\
          <button type="submit" class="medium">Upload Song</button>\
        </div>\
      </div>\
    </fieldset>\
  </form>\
');