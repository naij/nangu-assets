var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/', loginRequire: true},
    {path: '/home/overview', loginRequire: true},
    {path: '/product/category', loginRequire: true},
    {path: '/product/publish', loginRequire: true},
    {path: '/product/update', loginRequire: true},
    {path: '/product/successful', loginRequire: true},
    {path: '/product/recyclebin', loginRequire: true},
    {path: '/product/activity/list', loginRequire: true},
    {path: '/product/roomvoucher/list', loginRequire: true},
    {path: '/product/category/list', loginRequire: true},
    {path: '/product/category/create', loginRequire: true},
    {path: '/product/attribute/list', loginRequire: true},
    {path: '/product/attribute/create', loginRequire: true},
    {path: '/product/detailfield/list', loginRequire: true},
    {path: '/product/detailfield/create', loginRequire: true},
    {path: '/product/tag/list', loginRequire: true},
    {path: '/product/tag/create', loginRequire: true},
    {path: '/product/tag/category_tag_relation', loginRequire: true},
    {path: '/product/photograph/list', loginRequire: true},
    {path: '/content/ad/index', loginRequire: true},
    {path: '/content/ad/list', loginRequire: true},
    {path: '/content/ad/create', loginRequire: true},
    {path: '/picture/list', loginRequire: true},
    {path: '/order/custom/list', loginRequire: true},
    {path: '/order/list', loginRequire: true},
    {path: '/order/detail', loginRequire: true},
    {path: '/order/refund_detail', loginRequire: true},
    {path: '/order/refund_reason_list', loginRequire: true},
    {path: '/order/refund_reason_create', loginRequire: true},
    {path: '/user/member/list', loginRequire: true},
    {path: '/user/business/list', loginRequire: true},
    {path: '/user/business/create', loginRequire: true},
    {path: '/user/associate/withdraw_list', loginRequire: true},
    {path: '/assets/list', loginRequire: true},
    {path: '/assets/detail', loginRequire: true},
    {path: '/setting/menu/list', loginRequire: true},
    {path: '/setting/menu/create', loginRequire: true},
    {path: '/setting/admin/list', loginRequire: true},
    {path: '/setting/admin/create', loginRequire: true},
    {path: '/setting/admin/reset_password', loginRequire: true},
    {path: '/setting/role/list', loginRequire: true},
    {path: '/setting/role/create', loginRequire: true},
  ],
  'app/views/layout/blank': [
    {path: '/user/admin/login', loginRequire: false}
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
        if (v.loginRequire) {
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