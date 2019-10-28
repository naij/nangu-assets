var Magix = require('magix')
var $ = require('jquery')
var Router = Magix.Router
var menuList = [{
  mainNav: {
    name: '首页',
    icon: 'iconshouye'
  },
  subNav: [
    {
      path: '/home/overview',
      name: '概览',
      icon: 'icongailan'
    }
  ]
},{
  mainNav: {
    name: '商品',
    icon: 'iconsucai'
  },
  subNav: [
    {
      path: '/product/category',
      name: '新增商品',
      icon: 'iconxinzeng',
      childNav: [
        '/product/publish',
        '/product/update',
        '/product/successful'
      ]
    },
    {
      path: '/product/activity/list',
      name: '活动管理',
      icon: 'iconhuodong'
    },
    {
      path: '/product/roomvoucher/list',
      name: '房券管理',
      icon: 'iconyouhuiquan'
    },
    {
      path: '/product/photograph/list',
      name: '旅拍管理',
      icon: 'iconpaizhao'
    },
    {
      path: '/picture/list',
      name: '图片管理',
      icon: 'icontupian'
    },
    {
      path: '/product/category/list',
      name: '类目管理',
      icon: 'iconleimu',
      childNav: [
        '/product/category/create',
        '/product/attribute/list',
        '/product/attribute/create',
        '/product/detailfield/list',
        '/product/detailfield/create'
      ]
    },
    {
      path: '/product/recyclebin',
      name: '回收站',
      icon: 'iconhuishouzhan'
    },
  ]
}, {
  mainNav: {
    name: '订单',
    icon: 'iconorder'
  },
  subNav: [
    {
      path: '/order/custom/list',
      name: '定制管理',
      icon: 'icondingzhi'
    },
    {
      path: '/order/list',
      name: '订单列表',
      icon: 'iconorder',
      childNav: [
        '/order/detail',
        '/order/refund_detail'
      ]
    },
    {
      path: '/order/refund_reason_list',
      name: '退款原因设置',
      icon: 'iconyuanyin',
      childNav: [
        '/order/refund_reason_create',
      ]
    },
  ]
}, {
  mainNav: {
    name: '用户',
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
    name: '代码',
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
}, {
  mainNav: {
    name: '设置',
    icon: 'iconshezhi'
  },
  subNav: [
    {
      path: '/setting/menu/list',
      name: '菜单管理',
      icon: 'iconcaidan',
      childNav: [
        '/setting/menu/create'
      ]
    },
    {
      path: '/setting/admin/list',
      name: '成员管理',
      icon: 'iconguanliyuan',
      childNav: [
        '/setting/admin/permission'
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