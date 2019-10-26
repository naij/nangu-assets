var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'picture_list',
      params: {
        status: 1,
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
  'upload<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/picture/upload', {
      width: 700, 
      callback: function() {
        me.render()
      }
    })
  },
  'remove<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = e.params.id
    me.confirm('确定要删这条数据？', function() {
      me.request().all([{
        name: 'picture_remove',
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