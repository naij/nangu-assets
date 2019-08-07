define('app/views/partials/alert',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"alert-dialog\"><div class=\"dialog-hd\"><h2 class=\"dialog-title\">{{title}}</h2></div><div class=\"dialog-bd\">{{body}}</div><div class=\"dialog-ft\"><a href=\"javascript:;\" class=\"btn btn-brand btn-large mr10\" mx-click=\"\u001f\u001esubmit()\">确定</a></div></div>","subs":[]},
  ctor: function() {
    this.observe(null, true)
  },
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    this.data = this.extraData
    this.data.title = this.data.title || '提示'
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    if (me.extraData.enterCallback) {
      me.extraData.enterCallback()
    }
    this.extraData.dialog.close()
  }
})
});