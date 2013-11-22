
var LoginForm = Backbone.View.extend( {
  el:'.page',
  render: function() {
    var template = App.Templates['sessions/login'](App.currentUser);
    this.$el.html(template);
  },
  events: {
    'submit .login-form': 'signInArtist'
  },

  signInArtist: function(ev) {
    var loginDetails = $(ev.currentTarget).serializeObject();
    $.ajax({
      url:'api/index.php/login',
      type:'POST',
      dataType:'json',
      data: loginDetails,
      success:function(data) {
        App.Flash.success("You are now logged in!");
        App.currentArtist.set(data);
        nav.render();
        router.navigate('', {trigger: true});
      },
      error: function() {
        App.Flash.error("Invalid email or password");
      }
    });
    return false;
  }
});