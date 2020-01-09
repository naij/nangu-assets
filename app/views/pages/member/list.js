var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@list.html',
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'member_list',
      params: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data.list,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: data.totalCount
      }
      me.setView()
    })
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  'bind<click>': function(e) {
    e.preventDefault()
    var me = this
    var unionId = e.params.unionId
    me.mxDialog('app/views/pages/common/business_picker', {
      width: 700,
      callback: function(data) {
        me.alert('商户绑定成功！')
        me.request().all([{
          name: 'member_update',
          params: {
            unionId: unionId,
            businessId: data.id
          }
        }], function(e, MesModel) {
          me.render()
        })
      }
    })
  },
  'unbind<click>': function(e) {
    e.preventDefault()
    var me = this
    var unionId = e.params.unionId
    me.confirm('确定要解绑此商户？', function () {
      me.request().all([{
        name: 'member_update',
        params: {
          unionId: unionId,
          businessId: ''
        }
      }], function(e, MesModel) {
        me.alert('商户解绑成功！')
        me.render()
      })
    })
  },
  filters: {
    formatType: function(value) {
      if (value) {
        return '<span class="color-green">商户</span>'
      } else {
        return '<span class="color-m">普通用户</span>'
      }
    }
  }
})