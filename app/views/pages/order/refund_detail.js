var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@refund_detail.html',
  render: function() {
    var me = this
    var id = me.param('id')

    me.request().all([{
      name: 'order_refund_detail',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')
      me.data = data
      me.setView()
    })
  },
  'submit<click>': function(e) {
    var me = this
    var id = me.param('id')
    me.request().all([{
      name: 'order_refund_create',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  filters: {
    formatRefundStatus: function(value) {
      var status
      switch(value) {
        case 0 :
          status = '<span class="color-m">退款拒绝</span>'
          break
        case 1 :
          status = '<span class="color-orange">退款处理</span>'
          break
        case 2 :
          status = '<span class="color-orange">退款中</span>'
          break
        case 3 :
          status = '<span class="color-green">退款成功</span>'
          break
      }
      return status
    }
  }
})