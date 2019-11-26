var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/', needLogin: true},
    {path: '/home/overview', needLogin: true},
    {path: '/product/category', needLogin: true},
    {path: '/product/publish', needLogin: true},
    {path: '/product/update', needLogin: true},
    {path: '/product/successful', needLogin: true},
    {path: '/product/recyclebin', needLogin: true},
    {path: '/product/activity/list', needLogin: true},
    {path: '/product/roomvoucher/list', needLogin: true},
    {path: '/product/category/list', needLogin: true},
    {path: '/product/category/create', needLogin: true},
    {path: '/product/attribute/list', needLogin: true},
    {path: '/product/attribute/create', needLogin: true},
    {path: '/product/detailfield/list', needLogin: true},
    {path: '/product/detailfield/create', needLogin: true},
    {path: '/product/photograph/list', needLogin: true},
    {path: '/picture/list', needLogin: true},
    {path: '/order/custom/list', needLogin: true},
    {path: '/order/list', needLogin: true},
    {path: '/order/detail', needLogin: true},
    {path: '/order/refund_detail', needLogin: true},
    {path: '/order/refund_reason_list', needLogin: true},
    {path: '/order/refund_reason_create', needLogin: true},
    {path: '/member/list', needLogin: true},
    {path: '/member/business/list', needLogin: true},
    {path: '/member/business/create', needLogin: true},
    {path: '/assets/list', needLogin: true},
    {path: '/assets/detail', needLogin: true},
    {path: '/setting/menu/list', needLogin: true},
    {path: '/setting/menu/create', needLogin: true},
    {path: '/setting/admin/list', needLogin: true},
    {path: '/setting/admin/create', needLogin: true},
    {path: '/setting/admin/reset_password', needLogin: true},
    {path: '/setting/role/list', needLogin: true},
    {path: '/setting/role/create', needLogin: true},
  ],
  'app/views/layout/blank': [
    {path: '/member/login', needLogin: false}
  ]
}
var routes = function() {
  var s = {}
  $.each(routeMap, function(k, item) {
    $.each(item, function(i, v) {
      s[v.path] = k
    })
  })
  return s
}()

Router.on('changed', function (e) {
  if (!e.path) return
  $.each(routeMap, function(k, item) {
    $.each(item, function(i, v) {
      if (v.path == e.path.to) {
        if (v.needLogin) {
          Magix.checkToLogin()
        }
      }
    })
  })
})


return {
  defaultPath: '/',
  defaultView: 'app/views/layout/default',
  unmatchView: 'app/views/common/404',
  routes: routes,
  exts: [
    'app/exts',
    'app/vclick',
    'app/plugins/index'
  ]
}