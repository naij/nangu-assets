define('app/views/common/404',['magix'],function(require,exports,module){
/*Magix */
var Magix = require('magix')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"status-404\"><img mx-guid=\"g1\u001f\" src=\"/assets/img/404.jpg\"></div>","subs":[]},
  render: function() {
    var me = this
    me.setView()
  }
})
});