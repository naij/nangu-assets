var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/', needLogin: true},
    {path: '/product/category', needLogin: true},
    {path: '/product/publish', needLogin: true},
    {path: '/product/successful', needLogin: true},
    {path: '/activity/list', needLogin: true},
    {path: '/activity/recyclebin', needLogin: true},
    {path: '/activity/create', needLogin: true},
    {path: '/roomvoucher/list', needLogin: true},
    {path: '/roomvoucher/recyclebin', needLogin: true},
    {path: '/roomvoucher/create', needLogin: true},
    {path: '/category/list', needLogin: true},
    {path: '/category/create', needLogin: true},
    {path: '/attribute/list', needLogin: true},
    {path: '/attribute/create', needLogin: true},
    {path: '/detailfield/list', needLogin: true},
    {path: '/detailfield/create', needLogin: true},
    {path: '/photograph/list', needLogin: true},
    {path: '/photograph/recyclebin', needLogin: true},
    {path: '/photograph/create', needLogin: true},
    {path: '/picture/list', needLogin: true},
    {path: '/custom/list', needLogin: true},
    {path: '/member/list', needLogin: true},
    {path: '/assets/list', needLogin: true},
    {path: '/assets/detail', needLogin: true}
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