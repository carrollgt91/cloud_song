App.Templates['artists/signup-form'] = _.template('\
  <form action="/artist/new" class="signup-form large-12 columns">\
    <fieldset>\
        <div class="row">\
          <div class="large-6 columns">\
            <input type="text" name="name" placeholder="Name"/>\
          </div>\
          <div class="large-6 columns">\
            <input type="text" name="location" placeholder="Location"/>          \
          </div>\
        </div>\
      </div>\
      <div class="row">\
        <div class="large-12 columns">\
          <input type="text" name="tagline" placeholder="Tagline"/>\
        </div>\
      </div>\
\
      <div class="row">\
        <div class="large-6 columns">\
          <input type="email" name="contact" placeholder="Email"/>\
        </div>\
      </div>\
      <div class="row">\
        <div class="large-12 columns centered">\
          <button type="submit" class="medium"> Sign Up</button>\
        </div>\
      </div>\
      <div class="row">\
        <div class="large-12 columns centered">\
          <h4> Already have an account? <a href="#/login">Log in here </a> </h4>\
        </div>\
      </div>\
    </fieldset>\
  </form>\
');