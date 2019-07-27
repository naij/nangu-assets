var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
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
  },
  'pickCover<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 2,
      callback: function() {
        me.render()
      }
    })
  }
})