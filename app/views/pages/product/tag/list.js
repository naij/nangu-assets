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
      name: 'tag_list',
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
  'remove<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要删除此数据？彻底删除后不可复原！', function() {
      me.request().all([{
        name: 'tag_remove',
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
    formatType: function(value) {
      var type
      switch(value) {
        case 1 :
          type = '文本标签'
          break
        case 2 :
          type = '带图标标签'
          break
      }
      return type
    }
  }
})