var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@overview.html',
  render: function() {
    var me = this
    // me.request().all([{
    //   name: 'member_list',
    //   params: {
    //     pageNo: pageNo,
    //     pageSize: pageSize
    //   }
    // }], function(e, MesModel) {
    //   var data = MesModel.get('data')

    //   me.data = {
    //     list: data.list,
    //     pageNo: pageNo,
    //     pageSize: pageSize,
    //     totalCount: data.totalCount
    //   }
    //   me.setView()
    // })
    me.data = {
      username: Magix.config('username')
    }
    me.setView()
  }
})