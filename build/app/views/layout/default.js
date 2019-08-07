define('app/views/layout/default',['magix'],function(require,exports,module){
/*Magix */
var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"block-switch-loading\"></div><div mx-view=\"app/views/common/sidenav\" class=\"sidenav\"></div><div class=\"content\"><div mx-view=\"{{mainView}}\"></div></div>","subs":[]},
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path

    if (path === '/') {
      path = '/activity/list'
    }

    me.data = {
      mainView: 'app/views/pages' + path
    }
    me.setView()
    me.animateLoading()
  }
})
});