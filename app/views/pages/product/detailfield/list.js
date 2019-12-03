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
    var categoryId = me.param('categoryId')

    me.request().all([{
      name: 'detailfield_list',
      params: {
        categoryId: categoryId
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        categoryId: categoryId,
        list: data.list
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
        name: 'detailfield_remove',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  filters: {
    formatFieldType: function(value) {
      var status
      switch(value) {
        case 0 :
          status = '文本'
          break
        case 1 :
          status = '地址'
          break
      }
      return status
    }
  }
})