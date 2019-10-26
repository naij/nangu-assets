var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@successful.html',
  render: function() {
    var me = this
    me.data = {
      type: me.param('type')
    }
    me.setView()
  }
})