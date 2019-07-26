var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['type'])
  },
  render: function() {
    var me = this

    me.request().all([{
      name: 'picture_list'
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data
      }
      me.setView()
    })
  },
  'upload<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/picture/upload', {width: 700, callback: function() {
      me.render()
    }})
  }
})