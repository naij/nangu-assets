var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@recyclebin.html',
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'activity_list',
      params: {
        status: [0],
        pageNo: pageNo,
        pageSize: pageSize
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data.list,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'restore<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_offline',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'removeComplete<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_remove_complete',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  filters: {
    formatType: function(value) {
      var type
      switch(value) {
        case 1 :
          type = '合作活动'
          break
        case 2 :
          type = '自营活动'
          break
      }
      return type
    }
  }
})