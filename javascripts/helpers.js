Backbone.View.prototype.assign = function (selector, view) {
    var selectors;
    if (_.isObject(selector)) {
        selectors = selector;
    }
    else {
        selectors = {};
        selectors[selector] = view;
    }
    if (!selectors) return;
    _.each(selectors, function (view, selector) {
        view.setElement(this.$(selector)).render();
    }, this);
}

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};


var uploadManager = new Backbone.UploadManager({
    'uploadUrl': '/cloud_song/api/index.php/songs/upload',
    'templates': {
        'main': 'upload_manager/upload-manager.main',
        'file': 'upload_manager/upload-manager.file'
    }
});