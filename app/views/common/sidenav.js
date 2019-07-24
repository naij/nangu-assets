var Magix = require('magix')
var Router = Magix.Router
var menuList = [{
  path: '/activity/list',
  name: '活动管理'
}]

module.exports = Magix.View.extend({
  tmpl: '@sidenav.html',
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path
    var i, menu, finded

    for (i = 0; (menu = menuList[i]) != null; i++) {
      menu.active = false

      if (menu.sub && $.inArray(path, menu.sub) != -1) {
        menu.active = true
        finded = true
      } else if (path === menu.path) {
        menu.active = true
        finded = true
      }
    }

    //找不到就选中第一个
    if (!finded) {
      menuList[0].active = true
    }

    me.data = {
      menuList: menuList
    }
    me.setView()
  }
})