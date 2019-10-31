var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')
    var parentId = me.param('parentId')

    if (id) {
      me.request().all([{
        name: 'role_detail',
        params: {
          id: id
        }
      }, {
        name: 'menu_list'
      }], function(e, DetailModel, ListModel) {
        var detailData = DetailModel.get('data')
        var listData = ListModel.get('data')

        var menuList = listData.list
        menuList.push({
          id: '0',
          name: '无上级分类',
          selected: true
        })

        if (parentId !== 0) {
          $.each(menuList, function (i, v) {
            v.selected = false
            if (v.id == parentId) {
              v.selected = true
            }
          })
        }

        me.data = {
          id: id,
          name: detailData.name,
          icon: detailData.icon,
          path: detailData.path,
          relativePath: detailData.relativePath,
          sort: detailData.sort,
          menuList: menuList
        }
        me.setView()
      })
    } else {
      me.request().all([{
        name: 'setting_menu_list'
      }], function(e, MesModel) {
        var data = MesModel.get('data')

        var menuList = data.list
        menuList.push({
          id: '0',
          name: '无上级分类',
          selected: true
        })

        me.data = {
          menuList: menuList
        }
        me.setView()
      })
    }
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#menu-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var modelName

    var relativePath = formData.relativePath
    if (relativePath) {
      relativePath = relativePath.split(/[(\r\n)\r\n]+/)
      formData.relativePath = relativePath.join()
    } else {
      formData.relativePath = ''
    }

    if (!id) {
      modelName = 'setting_menu_create'
    } else {
      formData.id = id
      modelName = 'setting_menu_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      // me.to('/setting/menu/list')
      window.history.go(-1)
    })
  },
  filters: {
    formatRelativePath: function(value) {
      return value ? value.split(',').join('\r\n') : ''
    }
  }
})