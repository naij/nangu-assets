var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  ctor: function() {
    this.observe(['pageNo', 'q'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 50
    var q = me.param('q')

    me.request().all([{
      name: 'business_list',
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
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  }
})