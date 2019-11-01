var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@reset_password.html',
  mixins: [Dialog],
  render: function() {
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#password-create-form').serializeJSON({useIntKeysAsArrayIndex: true})

    me.request().all([{
      name: 'admin_reset_password',
      params: formData
    }], function(e, MesModel) {
      if (e && e.msg) {
        me.alert(e.msg)
      } else {
        me.alert('密码重置成功')
      }
    })
  }
})