var Magix = require('magix')
var $ = require('jquery')
var Router = Magix.Router
var menuList = [{
  mainNav: {
    name: '内容管理',
    icon: 'iconsucai'
  },
  subNav: [
    {
      path: '/activity/list',
      name: '活动管理',
      icon: 'iconicon3',
      childNav: [
        '/activity/create',
        '/activity/recyclebin'
      ]
    },
    {
      path: '/roomvoucher/list',
      name: '房券管理',
      icon: 'iconyouhuiquan',
      childNav: [
        '/roomvoucher/create',
        '/roomvoucher/recyclebin'
      ]
    },
    {
      path: '/photograph/list',
      name: '旅拍管理',
      icon: 'iconpaizhao',
      childNav: [
        '/photograph/create',
        '/photograph/recyclebin'
      ]
    },
    {
      path: '/picture/list',
      name: '图片管理',
      icon: 'icontupian'
    },
    {
      path: '/category/list',
      name: '类目管理',
      icon: 'iconleimu',
      childNav: [
        '/category/create'
      ]
    }
  ]
}, {
  mainNav: {
    name: '订单管理',
    icon: 'iconorder'
  },
  subNav: [
    {
      path: '/custom/list',
      name: '定制管理',
      icon: 'iconziyuan'
    }
  ]
}, {
  mainNav: {
    name: '用户管理',
    icon: 'iconyonghu'
  },
  subNav: [
    {
      path: '/member/list',
      name: '注册用户',
      icon: 'iconyonghu'
    }
  ]
}, {
  mainNav: {
    name: '代码管理',
    icon: 'icondaima'
  },
  subNav: [
    {
      path: '/assets/list',
      name: '发布列表',
      icon: 'iconfabu',
      childNav: [
        '/assets/detail'
      ]
    }
  ]
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
    var mainNav = [], subNav, finded

    $.each(menuList, function(index, value) {
      value.mainNav.active = false
      mainNav.push(value.mainNav)
      $.each(value.subNav, function(subIndex, subValue) {
        subValue.active = false
        if (subValue.childNav && $.inArray(path, subValue.childNav) != -1) {
          subValue.active = true
          finded = true
          subNav = value.subNav
          value.mainNav.active = true
        } else if (path === subValue.path) {
          subValue.active = true
          finded = true
          subNav = value.subNav
          value.mainNav.active = true
        }
      })
    })

    //找不到就选中第一个
    if (!finded) {
      subNav = menuList[0].subNav
      subNav[0].active = true
    }

    me.data = {
      mainNav: mainNav,
      subNav: subNav
    }
    me.setView()
  },
  'switchMainNav<click>': function (e) {
    var me = this
    var index = e.params.index
    var mainNav = me.data.mainNav
    var subNav
    $.each(mainNav, function(i, v) {
      v.active = false
      if (index == i) {
        v.active = true
      }
    })

    $.each(menuList, function(i, v) {
      if (index == i) {
        subNav = v.subNav
      }
    })

    me.data = {
      mainNav: mainNav,
      subNav: subNav
    }
    me.setView()
  }
})