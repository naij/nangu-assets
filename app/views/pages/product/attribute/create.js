var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var attributeId = me.param('attributeId')
    var categoryId = me.param('categoryId')
    var type = me.param('type')

    if (attributeId) {
      me.request().all([{
        name: 'attribute_detail',
        params: {
          attributeId: attributeId
        }
      }], function(e, DetailModel) {
        var detailData = DetailModel.get('data')

        me.data = detailData
        me.setView()
      })
    } else {
      me.data = {
        inputType: 0,
        categoryId: categoryId,
        type: type
      }
      me.setView()
    }
  },
  'switchInputType<click>': function(e) {
    this.data.inputType = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var attributeId = me.data.attributeId
    var categoryId = me.data.categoryId
    var type = me.data.type
    var formData = $('#attribute-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    var inputList = formData.inputList
    if (inputList) {
      inputList = inputList.split(/[(\r\n)\r\n]+/)
      formData.inputList = inputList.join()
    } else {
      formData.inputList = ''
    }

    if (!attributeId) {
      modelName = 'attribute_create'
    } else {
      formData.attributeId = attributeId
      modelName = 'attribute_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/product/attribute/list?categoryId=' + categoryId + '&type=' + type)
    })
  },
  filters: {
    formatInputList: function(value) {
      return value ? value.split(',').join('\r\n') : ''
    }
  }
})