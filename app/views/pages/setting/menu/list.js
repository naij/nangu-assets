var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo', 'parentId'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10
    var parentId = me.param('parentId')
    var parentName = me.param('parentName')

    me.request().all([{
      name: 'setting_menu_list',
      params: {
        parentId: parentId,
        pageNo: pageNo,
        pageSize: pageSize
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        parentId: parentId,
        parentName: parentName,
        list: data.list,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'remove<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要删除此菜单？菜单删除后不可复原！', function() {
      me.request().all([{
        name: 'menu_remove',
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
  },
  filters: {
    formatLevel: function(value) {
      var level
      switch(value) {
        case 0 :
          level = '一级菜单'
          break
        case 1 :
          level = '二级菜单'
          break
      }
      return level
    }
  }
})