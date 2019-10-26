var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var categoryId = me.param('categoryId')
    var parentId = me.param('parentId')

    if (categoryId) {
      me.request().all([{
        name: 'category_detail',
        params: {
          categoryId: categoryId
        }
      }, {
        name: 'category_list'
      }], function(e, DetailModel, ListModel) {
        var detailData = DetailModel.get('data')
        var listData = ListModel.get('data')

        var categoryList = listData.list
        categoryList.push({
          categoryId: '0',
          name: '无上级分类',
          selected: true
        })

        if (parentId !== 0) {
          $.each(categoryList, function (i, v) {
            v.selected = false
            if (v.categoryId == parentId) {
              v.selected = true
            }
          })
        }

        me.data = {
          categoryId: categoryId,
          name: detailData.name,
          categoryList: categoryList
        }
        me.setView()
      })
    } else {
      me.request().all([{
        name: 'category_list'
      }], function(e, MesModel) {
        var data = MesModel.get('data')

        var categoryList = data.list
        categoryList.push({
          categoryId: '0',
          name: '无上级分类',
          selected: true
        })

        me.data = {
          categoryList: categoryList
        }
        me.setView()
      })
    }
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var categoryId = me.data.categoryId
    var formData = $('#category-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!categoryId) {
      modelName = 'category_create'
    } else {
      formData.categoryId = categoryId
      modelName = 'category_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/category/list')
    })
  }
})