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
        name: 'admin_detail',
        params: {
          id: id
        }
      }, {
        name: 'role_list'
      }], function(e, DetailModel, ListModel) {
        var detailData = DetailModel.get('data')
        var listData = ListModel.get('data')
        var roleList = listData.list

        if (id !== 0) {
          $.each(roleList, function (i, v) {
            v.selected = false
            if (v.id == detailData.roleId) {
              v.selected = true
            }
          })
        }
        me.data = $.extend(detailData, {roleList: roleList})
        me.setView()
      })
    } else {
      me.request().all([{
        name: 'role_list'
      }], function(e, MesModel) {
        var data = MesModel.get('data')
        var roleList = data.list
        me.data = {
          status: 1,
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
    var roleData = formData.role.split(',')
    formData.roleId = roleData[0]
    formData.roleName = roleData[1]
    var modelName

    if (!id) {
      modelName = 'admin_create'
    } else {
      formData.id = id
      modelName = 'admin_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      if (e && e.msg) {
        me.alert(e.msg)
      } else {
        window.history.go(-1)
      }
    })
  }
})