var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    // me.request().all([{
    //   name: 'activity_list',
    //   params: {
    //     status: [1, 2],
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
      list: []
    }
    me.setView()
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  }
})