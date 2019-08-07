define('app/views/common/sidenav',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')
var Router = Magix.Router
var menuList = [{
  mainCat: '内容管理',
  subCat: [
    {
      path: '/activity/list',
      name: '活动管理',
      icon: 'iconicon3'
    },
    {
      path: '/picture/list',
      name: '图片管理',
      icon: 'icontupian'
    }
  ]
}, {
  mainCat: '订单管理',
  subCat: [
    {
      path: '/custom/list',
      name: '定制管理',
      icon: 'iconziyuan'
    }
  ]
}, {
  mainCat: '用户管理',
  subCat: [
    {
      path: '/member/list',
      name: '注册用户',
      icon: 'iconyonghu'
    }
  ]
}, {
  mainCat: '代码管理',
  subCat: [
    {
      path: '/assets/list',
      name: '发布列表',
      icon: 'icondaima'
    }
  ]
}]

module.exports = Magix.View.extend({
  tmpl: {"html":"<h1 class=\"title\"><a href=\"/\">南谷小程序后台</a></h1><dl class=\"nav\">{{#for(item in menuList)}}<dt>{{item.mainCat}}</dt>{{#for(subitem in item.subCat)}}<dd t-class:active=\"subitem.active\"><a href=\"{{subitem.path}}\"><span class=\"iconfont {{subitem.icon}}\"></span>{{subitem.name}}</a></dd>{{/for}} {{/for}}</dl>","subs":[]},
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path
    var i, menu, finded


    // for (i = 0; (menu = menuList[i]) != null; i++) {
    //   menu.active = false

    //   if (menu.sub && $.inArray(path, menu.sub) != -1) {
    //     menu.active = true
    //     finded = true
    //   } else if (path === menu.path) {
    //     menu.active = true
    //     finded = true
    //   }
    // }

    $.each(menuList, function(index, value) {
      $.each(value.subCat, function(subIndex, subValue) {
        subValue.active = false
        if (path === subValue.path) {
          subValue.active = true
          finded = true
        }
      })
    })

    //找不到就选中第一个
    if (!finded) {
      menuList[0].subCat[0].active = true
    }

    me.data = {
      menuList: menuList
    }
    me.setView()
  }
})
});