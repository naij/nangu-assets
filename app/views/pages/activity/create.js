var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  render: function() {
    var me = this
    me.setView().then(function() {
      me._rendered()
    })
  },
  _rendered: function() {
    var noticeEditor = new Editor('#notice-editor')
    noticeEditor.create()
    var descriptionEditor = new Editor('#description-editor')
    descriptionEditor.create()

  }
})