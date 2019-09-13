var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@recyclebin.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'roomvoucher_list',
      params: {
        category: '4',
        status: '0',
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
      name: 'roomvoucher_offline',
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
    me.confirm('确定要删除此房券？彻底删除后不可复原！', function() {
      me.request().all([{
        name: 'roomvoucher_remove_complete',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  }
})