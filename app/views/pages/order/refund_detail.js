var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@refund_detail.html',
  mixins: [Dialog],
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
    e.preventDefault()
    var me = this
    var id = me.param('id')
    var curNode = $(e.eventTarget)
    if (curNode.hasClass('btn-disabled')) {
      return
    }

    me.data.submit = true
    me.setView()

    me.request().all([{
      name: 'order_refund',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'refuse<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.param('id')
    me.mxDialog('app/views/pages/order/refund_refuse', {
      width: 700,
      id: id,
      callback: function() {
        me.render()
      }
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
          status = '<span class="color-orange">退款待处理</span>'
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