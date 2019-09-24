var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@category.html',
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    me._getCategoryList(0, function(parentData) {
      var parentList = parentData.list
      parentList[0].selected = true

      me._getCategoryList(parentList[0].categoryId, function(childData) {
        var childList = childData.list
        childList[0].selected = true
        var categoryId = childList[0].categoryId
        me.data = {
          parentList: parentList,
          childList: childList,
          categoryId: categoryId
        }
        me.setView()
      })
    })
  },
  _getCategoryList: function (parentId, cb) {
    this.request().all([{
      name: 'category_list',
      params: {
        parentId: parentId || 0,
        pageNo: 1,
        pageSize: 50
      }
    }], function(e, MesModel) {
      cb(MesModel.get('data'))
    })
  },
  'switchParentCategory<click>': function(e) {
    e.preventDefault()
    var parentId = e.params.parentId
    var index = e.params.index
    var me = this
    var parentList = me.data.parentList

    $.each(parentList, function (i, v) {
      v.selected = false
      if (i == index) {
        v.selected = true
      }
    })

    me._getCategoryList(parentId, function(data) {
      var childList = data.list
      me.data = {
        parentList: parentList,
        childList: childList,
        categoryId: ''
      }
      me.setView()
    })
  },
  'switchChildCategory<click>': function(e) {
    e.preventDefault()
    var categoryId = e.params.categoryId
    var index = e.params.index
    var me = this
    var childList = me.data.childList
    var categoryId

    $.each(childList, function (i, v) {
      v.selected = false
      if (i == index) {
        v.selected = true
        categoryId = v.categoryId
      }
    })

    me.data = {
      childList: childList,
      categoryId: categoryId
    }
    me.setView()
  },
  'gotoPublish<click>': function(e) {
    this.to('/product/publish?categoryId=' + this.data.categoryId)
  }
})