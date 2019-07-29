var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: '@blank.html',
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path

    me.data = {
      mainView: 'app/views/pages' + path
    }
    me.setView()
    me.animateLoading()
  }
})