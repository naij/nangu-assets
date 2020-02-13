var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@withdraw_detail.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var partnerTradeNo = me.param('partnerTradeNo')

    me.request().all([{
      name: 'associate_withdraw_detail',
      params: {
        partnerTradeNo: partnerTradeNo
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
    var partnerTradeNo = me.param('partnerTradeNo')
    var curNode = $(e.eventTarget)
    if (curNode.hasClass('btn-disabled')) {
      return
    }

    me.data.submit = true
    me.setView()

    me.confirm('确定要打款到此账户？', function () {
      me.request().all([{
        name: 'associate_transfers',
        params: {
          partnerTradeNo: partnerTradeNo
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  'reject<click>': function(e) {
    e.preventDefault()
    var me = this
    var partnerTradeNo = me.param('partnerTradeNo')
    me.mxDialog('app/views/pages/user/associate/withdraw_reject', {
      width: 700,
      partnerTradeNo: partnerTradeNo,
      callback: function() {
        me.render()
      }
    })
  },
  filters: {
    formatStatus: function(value) {
      var status
      switch(value) {
        case 1 :
          status = '<span class="color-orange">申请中</span>'
          break
        case 2 :
          status = '<span class="color-green">已打款</span>'
          break
        case 3 :
          status = '<span class="color-red">已驳回</span>'
          break
      }
      return status
    }
  }
})