var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@withdraw_list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo', 'q'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 50
    var q = me.param('q')

    me.request().all([{
      name: 'associate_withdraw_list',
      params: {
        pageNo: pageNo,
        pageSize: pageSize,
        q: q
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data.list,
        q: q,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'search<keydown>': function(e) {
    if (e.keyCode == '13') {
      this.to({q: $(e.eventTarget).val(), pageNo: 1})
    }
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