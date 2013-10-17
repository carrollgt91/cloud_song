App.Templates['sessions/login'] = _.templates('\
<form action="/sessions/new" class="login-form large-12 columns">\
  <fieldset>\
    <div class="row">\
      <div class="large-8 columns">\
        <input type="email" name="contact" placeholder="Email"/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-6 columns">\
        <input type="password" name="password" placeholder="Password"/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-12 columns">\
        <button type="submit" class="medium"> Log in </button>\
      </div>\
    </div>\
  </fieldset>\
</form>\
');