var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@login.html',
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var formData = $('#loginForm').serializeJSON()

    me.request().all([{
      name: 'login',
      params: formData
    }], function(e, MesModel) {
      Magix.config({'isLogined': true})
      me.to('/activity/list')
    })
  }
})