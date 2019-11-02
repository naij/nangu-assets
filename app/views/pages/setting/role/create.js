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
        name: 'role_detail',
        params: {
          id: id
        }
      }, {
        name: 'menu_full_list'
      }], function(e, DetailModel, ListModel) {
        var detailData = DetailModel.get('data')
        var listData = ListModel.get('data')
        var menuList = listData.list
        var menuPermission = detailData.menuPermission

        $.each(menuList, function(i, v) {
          if (menuPermission['m' + v.id]) {
            v.selected = true
          }
          $.each(v.subMenuList, function(i2, v2) {
            if (menuPermission['m' + v2.id]) {
              v2.selected = true
            }
          })
        })

        me.data = {
          id: id,
          name: detailData.name,
          status: detailData.status,
          menuList: menuList
        }
        me.setView()
      })
    } else {
      me.request().all([{
        name: 'menu_full_list'
      }], function(e, MesModel) {
        var data = MesModel.get('data')
        me.data = {
          status: 1,
          menuList: data.list
        }
        me.setView()
      })
    }
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#role-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    if (!id) {
      modelName = 'role_create'
    } else {
      formData.id = id
      modelName = 'role_update'
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