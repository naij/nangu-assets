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
      name: 'product_list',
      params: {
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
    var me = this
    var productSn = e.params.productSn
    me.request().all([{
      name: 'product_offline',
      params: {
        productSn: productSn
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'removeComplete<click>': function(e) {
    e.preventDefault()
    var me = this
    var productSn = e.params.productSn
    me.confirm('确定要删除此商品？彻底删除后不可复原！', function() {
      me.request().all([{
        name: 'product_remove_complete',
        params: {
          productSn: productSn
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