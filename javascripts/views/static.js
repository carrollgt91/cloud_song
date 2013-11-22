var Landing = Backbone.View.extend({
  el:'.page',
  render: function() {    
    var template = App.Templates['static_pages/landing'];
    this.$el.html(template);
  }
});

var About = Backbone.View.extend({
  el:'.page',
  render: function() {    
    var template = App.Templates["static_pages/about"];
    this.$el.html(template);
  }
});