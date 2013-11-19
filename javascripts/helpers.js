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



$("input[type=file]").each(function() {
    var proxy = $('<input type="text" value="'+$(this).val()+'" />');

    var context = {_this: $(this), _proxy: proxy};
    var intervalFunc = $.proxy(function() {
        this._proxy.val(this._this.val());
    }, context);

    // hide file input and watch for changes
    $(this)
        .css("position", "absolute")
        .css("opacity", "0.000001")
        .attr("size", "100")
        .parent().append(proxy)
        .click(function() {
            setInterval(intervalFunc, 1000);
        });
});