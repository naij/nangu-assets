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
    e.preventDefaut()
    var formData = $('#loginForm').serializeJSON()

    me.request().all([{
      name: '',
      params: formData
    }], function(e, MesModel) {
      me.to('/activity/list')
    })
  }
})