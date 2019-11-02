var Magix = require('magix')
var $ = require('jquery')
var Router = Magix.Router
var menuList = [{
  name: '首页',
  icon: 'iconshouye',
  subMenuList: [
    {
      path: '/home/overview',
      name: '概览',
      icon: 'icongailan'
    }
  ]
}, {
  name: '商品',
  icon: 'iconsucai',
  subMenuList: [
    {
      path: '/product/category',
      name: '新增商品',
      icon: 'iconxinzeng',
      relativePath: [
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
      relativePath: [
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
  name: '订单',
  icon: 'iconorder',
  subMenuList: [
    {
      path: '/order/custom/list',
      name: '定制管理',
      icon: 'icondingzhi'
    },
    {
      path: '/order/list',
      name: '订单列表',
      icon: 'iconorder',
      relativePath: [
        '/order/detail',
        '/order/refund_detail'
      ]
    },
    {
      path: '/order/refund_reason_list',
      name: '退款原因设置',
      icon: 'iconyuanyin',
      relativePath: [
        '/order/refund_reason_create',
      ]
    },
  ]
}, {
  name: '用户',
  icon: 'iconyonghu',
  subMenuList: [
    {
      path: '/member/list',
      name: '注册用户',
      icon: 'iconyonghu'
    }
  ]
}, {
  name: '代码',
  icon: 'icondaima',
  subMenuList: [
    {
      path: '/assets/list',
      name: '发布列表',
      icon: 'iconfabu',
      relativePath: [
        '/assets/detail'
      ]
    }
  ]
}, {
  name: '设置',
  icon: 'iconshezhi',
  subMenuList: [
    {
      path: '/setting/menu/list',
      name: '菜单管理',
      icon: 'iconcaidan',
      relativePath: [
        '/setting/menu/create'
      ]
    },
    {
      path: '/setting/admin/list',
      name: '成员管理',
      icon: 'iconguanliyuan',
      relativePath: [
        '/setting/admin/create'
      ]
    },
    {
      path: '/setting/role/list',
      name: '角色管理',
      icon: 'icongangweiguanli',
      relativePath: [
        '/setting/role/create'
      ]
    },
    {
      path: '/setting/admin/reset_password',
      name: '重置密码',
      icon: 'iconzhongzhimima'
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
    var subMenuList, finded

    $.each(menuList, function(index, value) {
      value.active = false
      $.each(value.subMenuList, function(subIndex, subValue) {
        subValue.active = false
        if (subValue.relativePath && $.inArray(path, subValue.relativePath) != -1) {
          subValue.active = true
          finded = true
          subMenuList = value.subMenuList
          value.active = true
        } else if (path === subValue.path) {
          subValue.active = true
          finded = true
          subMenuList = value.subMenuList
          value.active = true
        }
      })
    })

    //找不到就选中第一个
    if (!finded) {
      subMenuList = menuList[0].subMenuList
      subMenuList[0].active = true
    }

    me.data = {
      menuList: menuList,
      subMenuList: subMenuList
    }
    me.setView()
  },
  'switchMainMenu<click>': function (e) {
    var me = this
    var index = e.params.index
    var menuList = me.data.menuList
    var subMenuList
    $.each(menuList, function(i, v) {
      v.active = false
      if (index == i) {
        v.active = true
      }
    })

    $.each(menuList, function(i, v) {
      if (index == i) {
        subMenuList = v.subMenuList
      }
    })

    me.data = {
      menuList: menuList,
      subMenuList: subMenuList
    }
    me.setView()
  }
})