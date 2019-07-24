var fs = require('fs')
var path = require('path')
var mat   = require('mat')
var proxy = require('mat-proxy')
var less  = require('mat-less')
var combine = require('./tool/combine')

// 预编译less
mat.task('less', function () {
  mat.url([/.*\.css/])
    .rewrite([
      [/\.css/g, '.less']
    ])
    .use(less({
      sourceMap: {sourceMapFileInline: true}
    }))
})

mat.task('combine', function() {
  mat.url([/.js/])
    .use(combine())
})

mat.task('pushState', function () {
  mat.url([/^((?!\.(css|less|js|html|ico|swf)).)*$/])
    .rewrite([
      [/(\/.*)+/, 'index.html']
    ])
})

mat.task('default', ['less', 'combine', 'pushState'], function () {
  mat.url([/\.json/])
    .use(proxy({
      proxyPass: '127.0.0.1:7001'
    }))
})