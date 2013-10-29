App.Templates['sessions/login'] = _.template('\
<form action="login" class="login-form large-12 columns" data-abide>\
  <fieldset>\
    <div class="row">\
      <div class="large-8 large-offset-2 columns">\
        <input type="email" name="contact" placeholder="Email" required/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-8 large-offset-2 columns">\
        <input type="password" name="password" placeholder="Password" required/>\
      </div>\
    </div>\
    <div class="row">\
      <div class="large-12 columns centered">\
        <button type="submit" class="medium"> Log in </button>\
      </div>\
    </div>\
  </fieldset>\
</form>\
');