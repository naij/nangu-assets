var Magix = require('magix')
var $ = require('jquery')

var routes = function() {
  var map = {
    'app/views/layout/default': [
      '/',
      '/activity/list',
      '/picture/list'
    ]
  }

  var s = {}
  $.each(map, function(k, item) {
    $.each(item, function(i, v) {
      s[v] = k
    })
  })
  return s
}()

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