var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var position = me.param('position')
    me.request().all([{
      name: 'ad_list',
      params: {
        position: position
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        position: position,
        list: data.list
      }
      me.setView()
    })
  },
  'remove<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.confirm('确定要删除此数据？删除后不可复原！', function() {
      me.request().all([{
        name: 'ad_remove',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        me.render()
      })
    })
  },
  filters: {
    formatUrlType: function(value) {
      var type
      switch(value) {
        case 0 :
          type = '跳转网页'
          break
        case 1 :
          type = '跳转小程序'
          break
      }
      return type
    }
  }
})