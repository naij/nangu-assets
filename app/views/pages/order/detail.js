var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@detail.html',
  render: function() {
    var me = this
    var orderSn = me.param('orderSn')

    me.request().all([{
      name: 'order_detail',
      params: {
        orderSn: orderSn
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')
      me.data = data
      me.setView()
    })
  },
  filters: {
    formatTicketGenType: function(value) {
      var type
      switch(value) {
        case 0 :
          type = '自动出票'
          break
        case 1 :
          type = '手动出票'
          break
      }
      return type
    },
    formatStatus: function(value) {
      var status
      switch(value) {
        case 0 :
          status = '<span class="color-m">已关闭</span>'
          break
        case 1 :
          status = '<span class="color-orange">待付款</span>'
          break
        case 2 :
          status = '<span class="color-orange">待处理</span>'
          break
        case 3 :
          status = '<span class="color-green">已付款</span>'
          break
        case 4 :
          status = '<span class="color-green">已完成</span>'
          break
      }
      return status
    },
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