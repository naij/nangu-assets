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

    me.request().all([{
      name: 'activity_list',
      params: {
        type: [3],
        status: [1, 2],
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
  },
  'offline<click>': function(e) {
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
  'remove<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_remove',
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
    formatStatus: function(value) {
      var status
      switch(value) {
        case 1 :
          status = '<span class="color-green">正式发布</span>'
          break
        case 2 :
          status = '<span class="color-l">已下线</span>'
          break
      }
      return status
    }
  }
})