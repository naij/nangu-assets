var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')

    if (id) {
      me.request().all([{
        name: 'business_detail',
        params: {
          id: id
        }
      }], function(e, DetailModel) {
        var detailData = DetailModel.get('data')
        me.data = {
          id: id,
          name: detailData.name
        }
        me.setView()
      })
    } else {
      me.setView()
    }
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#business-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'business_create'
    } else {
      formData.id = id
      modelName = 'business_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      // me.to('/setting/menu/list')
      window.history.go(-1)
    })
  }
})