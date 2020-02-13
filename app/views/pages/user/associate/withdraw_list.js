var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@withdraw_list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo', 'partnerTradeNo', 'associateId', 'businessName', 'status'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 50
    var partnerTradeNo = me.param('partnerTradeNo')
    var associateId = me.param('associateId')
    var businessName = me.param('businessName')
    var status = me.param('status')

    me.request().all([{
      name: 'associate_withdraw_list',
      params: {
        pageNo: pageNo,
        pageSize: pageSize,
        partnerTradeNo: partnerTradeNo,
        associateId: associateId,
        businessName: businessName,
        status: status
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data.list,
        partnerTradeNo: partnerTradeNo,
        associateId: associateId,
        businessName: businessName,
        status: status,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'search<click>': function(e) {
    e.preventDefault()
    var formData = $('#filter-form').serializeJSON()
    this.to(formData)
  },
  'status<click>': function(e) {
    this.to({status: e.params.status, pageNo: 1})
  },
  'transfers<click>': function(e) {
    e.preventDefault()
    var me = this
    var partnerTradeNo = e.params.partnerTradeNo
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
    var partnerTradeNo = e.params.partnerTradeNo
    me.mxDialog('app/views/pages/user/associate/withdraw_reject', {
      width: 700,
      partnerTradeNo: partnerTradeNo,
      callback: function() {
        me.render()
      }
    })
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  filters: {
    formatStatus: function(value) {
      switch(value) {
        case 1:
          return '<span class="color-orange">申请中</span>'
        case 2:
          return '<span class="color-m">已入账</span>'
        case 3:
          return '<span class="color-red">已驳回</span>'
      }
    }
  }
})