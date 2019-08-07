define('app/views/pages/assets/detail',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">发布详情</h2></div></div><div class=\"page-body assets-detail\"><div class=\"info-container\">{{{info}}}</div></div>","subs":[]},
  render: function() {
    var me = this
    var id = me.param('id')

    me.request().all([{
      name: 'assets_detail',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        info: data.info
      }
      me.setView()
    })
  }
})
});