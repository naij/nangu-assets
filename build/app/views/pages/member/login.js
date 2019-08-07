define('app/views/pages/member/login',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-login\"><div class=\"login-header\">南谷后台登录</div><div class=\"login-panel\"><div class=\"tip tip-alert\" t-if=\"error\">{{error}}</div><form id=\"loginForm\"><ul class=\"union-form\"><li class=\"field\"><div class=\"field-label2\">用户名：</div><input mx-guid=\"g8\u001f\" type=\"text\" class=\"input\" name=\"username\"></li><li class=\"field\"><div class=\"field-label2\">密码：</div><input mx-guid=\"gb\u001f\" type=\"password\" class=\"input\" name=\"password\"></li><li class=\"field\"><a href=\"#\" class=\"btn btn-brand btn-large\" mx-click=\"\u001f\u001esubmit()\">登 录</a></li></ul></form></div></div>","subs":[]},
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
});