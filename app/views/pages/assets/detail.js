var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@detail.html',
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