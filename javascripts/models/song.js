var Song = Backbone.Model.extend({
  urlRoot: 'api/index.php/songs',
});

var Songs = Backbone.Collection.extend({
  url: "api/index.php/songs",
});