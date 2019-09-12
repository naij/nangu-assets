var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')

    if (id !== '') {
      me.request().all([{
        name: 'activity_detail',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        var data = MesModel.get('data')
  
        me.data = data
        me.data.id = id

        // 在上线状态并且有草稿的情况下显示提示
        if (data.draft && data.status == 1) {
          me.data.hasDraft = true
        }
        
        me.setView().then(function() {
          me._rendered(data)
        })
      })
    } else {
      me.data = {
        type: 1,
        title: '',
        price: '',
        cover: '',
        slide: [],
        costDescription: '',
        costInclude: '',
        usage: '',
        notice: '',
        description: ''
      }
      me.setView().then(function() {
        me._rendered()
      })
    }
  },
  _rendered: function(data) {
    var me = this
    var costDescriptionEditor = new Editor('#cost-description-editor')
    this._customInsertImg(costDescriptionEditor)
    costDescriptionEditor.create()
    var costIncludeEditor = new Editor('#cost-include-editor')
    this._customInsertImg(costIncludeEditor)
    costIncludeEditor.create()
    var usageEditor = new Editor('#usage-editor')
    this._customInsertImg(usageEditor)
    usageEditor.create()
    var noticeEditor = new Editor('#notice-editor')
    this._customInsertImg(noticeEditor)
    noticeEditor.create()
    var descriptionEditor = new Editor('#description-editor')
    this._customInsertImg(descriptionEditor)
    descriptionEditor.create()

    this.costDescriptionEditor = costDescriptionEditor
    this.costIncludeEditor = costIncludeEditor
    this.usageEditor = usageEditor
    this.noticeEditor = noticeEditor
    this.descriptionEditor = descriptionEditor

    if (data) {
      this._setEditorContent(data)
    }
  },
  _setEditorContent: function(data) {
    this.costDescriptionEditor.txt.html(data.costDescription)
    this.costIncludeEditor.txt.html(data.costInclude)
    this.usageEditor.txt.html(data.usage)
    this.noticeEditor.txt.html(data.notice)
    this.descriptionEditor.txt.html(data.description)
  },
  // 自定义图片插入
  _customInsertImg: function(editorInstance) {
    var me = this
    editorInstance.customConfig.onInsertImg = function (cb) {
      me.mxDialog('app/views/pages/common/imgpicker', {
        width: 700,
        limit: 1,
        callback: function(data) {
          cb(data[0].picPath)
        }
      })
    }
  },
  _getEditorContent: function() {
    var me = this
    var editorContent = {}
    editorContent.costDescription = me.costDescriptionEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    editorContent.costInclude = me.costIncludeEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    editorContent.usage = me.usageEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    editorContent.notice = me.noticeEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    editorContent.description = me.descriptionEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    return editorContent
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
          me.data.slide.splice(index, 1, data[0].picPath)
        } else {
          me.data.slide.push(data[0].picPath)
        }
        
        me.setView()
      }
    })
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var formData = $('#spu-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
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
      me.to('/photograph/list')
    })
  },
  'draft<click>': function(e) {
    e.preventDefault()
    var me = this
    var id = me.data.id
    var status = me.data.status || 2
    var postData = {}
    var formData = $('#spu-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var editorContent = me._getEditorContent()

    // 上线状态时保存草稿只改变draft字段，其他字段不能动
    if (status == 1) {
      postData = me.data
    } else {
      postData.status = status
      Magix.mix(postData, formData)
      Magix.mix(postData, editorContent)
    }
    
    postData.draft = JSON.stringify(formData)
    var modelName

    if (typeof(id) == 'undefined') {
      modelName = 'activity_create'
    } else {
      postData.id = id
      modelName = 'activity_update'
    }

    me.request().all([{
      name: modelName,
      params: postData
    }], function(e, MesModel) {
      me.alert('草稿保存成功！')
      me.data.id = MesModel.get('data').id
    })
  },
  'loaddraft<click>': function(e) {
    e.preventDefault()
    var data = this.data
    this.data = Magix.mix(data, JSON.parse(data.draft))
    this.data.hasDraft = false
    this.setView()
    this._setEditorContent(this.data)
    this.alert('已用草稿内容覆盖当前内容！')
  },
  'canceldraft<click>': function(e) {
    e.preventDefault()
    this.data.hasDraft = false
    this.setView()
  }
})