var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@category_tag_relation.html',
  render: function() {
    var me = this
    var categoryId = me.param('categoryId')

    me.request().all([{
      name: 'tag_list',
      params: {
        type: 1
      }
    }, {
      name: 'category_tag_relation_list',
      params: {
        categoryId: categoryId
      }
    }], function(e, TagListModel, RelationListModel) {
      var tagList = TagListModel.get('data').list
      var relationList = RelationListModel.get('data').list

      tagList.forEach(function(v1) {
        v1.selected = false
        v1.relationId = ''
        relationList.forEach(function(v2) {
          if (v1.id == v2.tagId) {
            v1.selected = true,
            v1.relationId = v2.id
          }
        })
      })

      me.data = {
        categoryId: categoryId,
        tagList: tagList,
        originRelationList: relationList
      }
      me.setView()
    })
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var formData = $('#relation-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var relationList = formData.relation
    var originRelationList = me.data.originRelationList
    var deletedRealtionList = []

    // 删除两个数组中id相同的值，留下来的就是被取消的值
    originRelationList.forEach(function(v1, i1) {
      deletedRealtionList.push(v1.id)
      relationList.forEach(function(v2) {
        var ids = v2.split(':')
        if (ids[1] && (ids[1] == v1.id)) {
          var deletedRealtionIndex = deletedRealtionList.indexOf(v1.id)
          deletedRealtionList.splice(deletedRealtionIndex, 1)
        }
      })
    })

    formData.deletedRealtionList = deletedRealtionList

    me.request().all([{
      name: 'category_tag_relation_create',
      params: formData
    }], function(e, MesModel) {
      window.history.go(-1)
    })
  }
})