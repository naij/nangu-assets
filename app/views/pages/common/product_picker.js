var Magix = require('magix')
var $ = require('jquery')
var _ = require('underscore')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@product_picker.html',
  mixins: [Dialog],
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    me.data = {
      tabList: [
        {title: '活动', categoryId: '10015', selected: true},
        {title: '民宿', categoryId: '10014'}
      ],
      categoryId: '10015'
    }
    me.setView()
    me._getList()
  },
  _getList: function() {
    var me = this
    var pageNo = me.pageNo || 1
    var pageSize = 8
    var categoryId = me.data.categoryId
    me.request().all([{
      name: 'product_list',
      params: {
        categoryId: categoryId,
        status: '1,2',
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
  'switchTab<click>': function(e) {
    var me = this
    var tabList = me.data.tabList
    tabList.forEach(function(v, k) {
      v.selected = false
      if (k == e.params.index) {
        v.selected = true
        me.data.categoryId = v.categoryId
      }
    })
    me.data.tabList = tabList
    me.data.selectedItem = ''
    me.setView()
    me.pageNo = 1
    me._getList()
  },
  'pageChange<change>': function(e) {
    this.pageNo = e.state.page
    this.render()
  },
  'submit<click>': function (e) {
    e.preventDefault()
    var categoryId = this.data.categoryId
    var url

    switch(categoryId) {
      case '10014':
        url = '/pages/roomvoucher/detail?id=' + this.data.selectedItem.productSn
        break
      case '10015':
        url = '/pages/activity/detail?id=' + this.data.selectedItem.productSn
        break
    }

    this.extraData.dialog.close()
    this.extraData.callback(url)
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})