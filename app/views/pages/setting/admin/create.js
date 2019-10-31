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
        name: 'setting_admin_detail',
        params: {
          id: id
        }
      }, {
        name: 'setting_role_list'
      }], function(e, DetailModel, ListModel) {
        var detailData = DetailModel.get('data')
        var listData = ListModel.get('data')
        var roleList = listData.list

        if (id !== 0) {
          $.each(roleList, function (i, v) {
            v.selected = false
            if (v.id == id) {
              v.selected = true
            }
          })
        }
        me.data = $.extend(detailData, {roleList: roleList})
        me.setView()
      })
    } else {
      me.request().all([{
        name: 'setting_role_list'
      }], function(e, MesModel) {
        var data = MesModel.get('data')
        var roleList = data.list
        me.data = {
          roleList: roleList
        }
        me.setView()
      })
    }
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#admin-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'setting_admin_create'
    } else {
      formData.id = id
      modelName = 'setting_admin_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      window.history.go(-1)
    })
  }
})