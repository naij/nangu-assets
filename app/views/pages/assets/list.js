var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'assets_list',
      params: {
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
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  filters: {
    formatType: function(value) {
      if (/daily/.test(value)) {
        return '日常'
      } else {
        return '正式'
      }
    },
    formatStatus: function(value) {
      switch(value) {
        case 0:
          return '<span class="color-red">发布失败</span>'
          break
        case 1:
          return '<span class="color-yellow">发布中</span>'
          break
        case 2:
          return '<span class="color-green">发布成功</span>'
          break
      }
    }
  }
})