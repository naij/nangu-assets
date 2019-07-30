var script = function() {
  var scripts = document.getElementsByTagName('script')
  return scripts[scripts.length - 1]
}()

var base = function() {
  var src = script.getAttribute('src')
  var base = /(.*\/)(.+\/.+)/.exec(src)[1]
  return base
}()

seajs.config({
  alias: {
    'jquery': 'app/libs/jquery-1.12.1',
    'magix': 'app/libs/magix',
    'pat': 'app/libs/pat',
    'moment': 'app/libs/moment',
    'underscore': 'app/libs/underscore'
  },
  base: base,
  charset: 'utf-8'
})

seajs.use(['magix', 'jquery'], function(Magix, $) {
  Magix.checkToLogin =  function() {
    if (!Magix.config('isLogined')) {
      location.href = '/member/login'
    }
  }

  $.ajax({
    url: '/api/member/pubinfo.json',
    dataType: 'json',
    complete: function(xhr, text) {
      var resp = $.parseJSON(xhr.responseText)
      Magix.config({'isLogined': resp.data.isLogined})
      Magix.config({'csrf': resp.data.csrf})

      Magix.boot({
        ini: 'app/ini'
      })
    }
  })
})
