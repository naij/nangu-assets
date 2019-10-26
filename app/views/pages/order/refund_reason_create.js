var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@refund_reason_create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')

    if (id) {
      me.request().all([{
        name: 'order_refund_reason_detail',
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
        status: 1
      }
      me.setView()
    }
  },
  'switchStatus<click>': function(e) {
    this.data.status = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#refund-reason-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'order_refund_reason_create'
    } else {
      formData.id = id
      modelName = 'order_refund_reason_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/order/refund_reason_list')
    })
  }
})