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
    var categoryId = me.param('categoryId')
    var type = me.param('type')

    me.request().all([{
      name: 'attribute_list',
      params: {
        categoryId: categoryId,
        type: type,
        pageNo: pageNo,
        pageSize: pageSize
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        categoryId: categoryId,
        type: type,
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
    var categoryId = e.params.categoryId
    var me = this
    me.confirm('确定要删除此类目？彻底删除后不可复原！', function() {
      me.request().all([{
        name: 'category_remove',
        params: {
          categoryId: categoryId
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
    formatInputType: function(value) {
      var status
      switch(value) {
        case 0 :
          status = '手工录入'
          break
        case 1 :
          status = '从列表中选取'
          break
      }
      return status
    }
  }
})