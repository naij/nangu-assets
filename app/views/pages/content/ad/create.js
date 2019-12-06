var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')


module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')
    var position = me.param('position')

    if (id) {
      me.request().all([{
        name: 'ad_detail',
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
        urlType: 0,
        position: position
      }
      me.setView()
    }
  },
  'pickImage<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/common/img_picker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.imageUrl = data[0].picPath
        me.setView()
      }
    })
  },
  'switchUrlType<click>': function(e) {
    this.data.urlType = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var position = me.param('position')
    var formData = $('#ad-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'ad_create'
    } else {
      formData.id = id
      modelName = 'ad_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/content/ad/list?position=' + position)
    })
  }
})