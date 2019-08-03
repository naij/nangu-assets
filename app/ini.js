var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/', needLogin: true},
    {path: '/activity/list', needLogin: true},
    {path: '/activity/recyclebin', needLogin: true},
    {path: '/activity/create', needLogin: true},
    {path: '/picture/list', needLogin: true},
    {path: '/custom/list', needLogin: true},
    {path: '/member/list', needLogin: true}
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