var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@refund_refuse.html',
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    me.data = {
      handleNote: ''
    }
    me.setView()
  },
  'handleNote<change>': function(e) {
    var me = this
    var $textarea = $(e.eventTarget)
    var value = $textarea.val()
    me.data.handleNote = value
    me.setView()
  },
  'submit<click>': function (e) {
    e.preventDefault()
    var me = this
    if (!me.data.handleNote) {return}
    me.request().all([{
      name: 'order_refund_refuse',
      params: {
        id: me.extraData.id,
        handleNote: me.data.handleNote
      }
    }], function(e, MesModel) {
      me.extraData.dialog.close()
      me.extraData.callback()
    })
    
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})