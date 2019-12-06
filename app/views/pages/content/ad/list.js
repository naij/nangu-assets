var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var position = me.param('position')
    me.request().all([{
      name: 'ad_list',
      params: {
        position: position
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        position: position,
        list: data.list
      }
      me.setView()
    })
  },
  'online<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = e.params.id
    me.request().all([{
      name: 'ad_online',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'offline<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = e.params.id
    me.request().all([{
      name: 'ad_offline',
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
    me.confirm('确定要删除此数据？删除后不可复原！', function() {
      me.request().all([{
        name: 'ad_remove',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  filters: {
    formatUrlType: function(value) {
      var type
      switch(value) {
        case 0 :
          type = '跳转网页'
          break
        case 1 :
          type = '跳转小程序'
          break
      }
      return type
    },
    formatStatus: function(value) {
      var status
      switch(value) {
        case 1 :
          status = '<span class="color-green">正常</span>'
          break
        case 2 :
          status = '<span class="color-l">已下线</span>'
          break
      }
      return status
    }
  }
})