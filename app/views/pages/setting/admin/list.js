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
      name: 'admin_list',
      params: {
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
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  'disable<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要禁用此成员吗？', function() {
      me.request().all([{
        name: 'admin_update_status',
        params: {
          id: id,
          status: 2
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  'enable<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要启用此成员吗？', function() {
      me.request().all([{
        name: 'admin_update_status',
        params: {
          id: id,
          status: 1
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  'resetPassword<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要重置密码吗？', function() {
      me.request().all([{
        name: 'admin_reset_password_to_origin',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        me.alert('重置密码成功')
      })
    })
  },
  filters: {
    formatStatus: function(value) {
      var status
      switch(value) {
        case 1 :
          status = '<span class="color-green">正常</span>'
          break
        case 2 :
          status = '<span class="color-m">禁用</span>'
          break
      }
      return status
    }
  }
})