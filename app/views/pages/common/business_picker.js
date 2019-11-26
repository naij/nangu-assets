var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@business_picker.html',
  mixins: [Dialog],
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    var pageNo = me.pageNo || 1
    var pageSize = 18
    var q = me.q || ''

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
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'pick<click>': function(e) {
    var me = this
    var id = e.params.id
    var list = me.data.list
    var selectedItem

    $.each(list, function(i, v) {
      v.selected = false
      if (v.id == id) {
        v.selected = true
        selectedItem = v
      }
    })

    me.data = {
      list: list,
      selectedItem: selectedItem
    }
    me.setView()
  },
  'search<keydown>': function(e) {
    if (e.keyCode == '13') {
      this.q = $(e.eventTarget).val()
      this.pageNo = 1
      this.render()
    }
  },
  'pageChange<change>': function(e) {
    this.pageNo = e.state.page
    this.render()
  },
  'submit<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
    this.extraData.callback(this.data.selectedItem)
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})