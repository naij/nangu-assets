define('app/coms/gotop/gotop',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"gotop quanfont icon-fanhuidingbu\" mx-click=\"\u001f\u001egotop()\" title=\"返回顶部\"></div>","subs":[]},
  ctor: function(e) {
    this.opt = e
  },
  render: function() {
    var me = this

    me.setView().then(function () {
      me.scroll()
    })
  },
  scroll: function () {
    var me = this
    var $el = $('#' + me.id)
    var viewportHeight = $(window).height()
    var scrollTop = $(window).scrollTop()
    var $gotopNode = $el.find('.gotop')

    if (scrollTop > viewportHeight) {
      $gotopNode.show()
    } else {
      $gotopNode.hide()
    }
  },
  'gotop<click>': function () {
    $('body,html').animate({
      scrollTop: 0
    }, 250)
  },
  '$win<scroll>': function () {
    this.scroll()
  }
})
});