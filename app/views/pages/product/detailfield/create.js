var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  render: function() {
    var me = this
    var id = me.param('id')
    var categoryId = me.param('categoryId')

    if (id) {
      me.request().all([{
        name: 'detailfield_detail',
        params: {
          id: id
        }
      }], function(e, DetailModel) {
        var detailData = DetailModel.get('data')

        me.data = detailData
        me.setView()
      })
    } else {
      me.data = {
        fieldType: 0,
        categoryId: categoryId
      }
      me.setView()
    }
  },
  'switchFieldType<click>': function(e) {
    this.data.fieldType = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var categoryId = me.data.categoryId
    var formData = $('#detailfield-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'detailfield_create'
    } else {
      formData.id = id
      modelName = 'detailfield_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/product/detailfield/list?categoryId=' + categoryId)
    })
  }
})