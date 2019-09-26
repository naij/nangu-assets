var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@successful.html',
  render: function() {
    var me = this

    // me.request().all([{
    //   name: 'activity_list',
    //   params: {
    //     type: [1, 2],
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

    me.setView()
  },
  'online<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_online',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  }
})