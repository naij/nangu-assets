var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  render: function() {
    var me = this
    var id = me.param('id')

    if (id) {
      me.request().all([{
        name: 'tag_detail',
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
        type: 1
      }
      me.setView()
    }
  },
  'switchType<click>': function(e) {
    this.data.type = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#tag-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'tag_create'
    } else {
      formData.id = id
      modelName = 'tag_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/product/tag/list')
    })
  }
})