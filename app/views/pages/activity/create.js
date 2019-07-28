var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    me.data = {
      cover: '',
      locationCover: '',
      slide: []
    }
    me.setView().then(function() {
      me._rendered()
    })
  },
  _rendered: function() {
    var costDescriptionEditor = new Editor('#cost-description-editor')
    costDescriptionEditor.create()
    var costIncludeEditor = new Editor('#cost-include-editor')
    costIncludeEditor.create()
    var usageEditor = new Editor('#usage-editor')
    usageEditor.create()
    var noticeEditor = new Editor('#notice-editor')
    noticeEditor.create()
    var descriptionEditor = new Editor('#description-editor')
    descriptionEditor.create()

    this.costDescriptionEditor = costDescriptionEditor
    this.costIncludeEditor = costIncludeEditor
    this.usageEditor = usageEditor
    this.noticeEditor = noticeEditor
    this.descriptionEditor = descriptionEditor
  },
  _getEditorContent: function() {
    var me = this
    var editorContent = {}
    editorContent.costDescription = me.costDescriptionEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '')
    editorContent.costInclude = me.costIncludeEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '')
    editorContent.usage = me.usageEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '')
    editorContent.notice = me.noticeEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '')
    editorContent.description = me.descriptionEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '')
    return editorContent
  },
  'pickLocationCover<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.locationCover = data[0].picPath
        me.setView()
      }
    })
  },
  'pickCover<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.cover = data[0].picPath
        me.setView()
      }
    })
  },
  'pickSlide<click>': function(e) {
    e.preventDefault()
    var me = this
    var index = e.params.index
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        // 有index 说明是替换操作
        if (typeof(index) != "undefined") {
          me.data.slide.splice(index, 1, data[0])
        } else {
          me.data.slide.push(data[0])
        }
        
        me.setView()
      }
    })
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#activity-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var editorContent = me._getEditorContent()
    Magix.mix(formData, editorContent)
    
    // 活动发布后就清空草稿
    formData.draft = ''
    // 发布后状态设置成 1
    formData.status = 1

    var modelName

    if (typeof(id) == 'undefined') {
      modelName = 'activity_create'
    } else {
      formData.id = id
      modelName = 'activity_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/activity/list')
    })
  },
  'draft<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#activity-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var editorContent = me._getEditorContent()
    Magix.mix(formData, editorContent)

    formData.draft = JSON.stringify(formData)
    var modelName

    if (typeof(id) == 'undefined') {
      modelName = 'activity_create'
    } else {
      formData.id = id
      modelName = 'activity_update'
    }

    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.data.id = MesModel.get('data').id
    })
  }
})