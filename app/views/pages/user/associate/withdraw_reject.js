var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@withdraw_reject.html',
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
      name: 'associate_reject',
      params: {
        partnerTradeNo: me.extraData.partnerTradeNo,
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