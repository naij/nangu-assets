define('app/views/pages/activity/create',['magix','jquery','app/coms/editor/editor','app/mixins/dialog'],function(require,exports,module){
/*Magix ,$ ,Editor ,Dialog */
var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\" t-if=\"id\">编辑活动</h2><h2 class=\"title\" t-if=\"!id\">新增活动</h2></div></div><div class=\"page-body activity-create\"><div class=\"draft-tip\" t-if=\"hasDraft\">\b<p class=\"bd\">系统检测到你有一份编辑中的草稿，是否需要覆盖当前内容？</p><div><a href=\"#\" class=\"btn btn-green btn-large mr10\" mx-click=\"\u001f\u001eloaddraft()\">覆盖</a><a href=\"#\" class=\"btn btn-normal btn-large\" mx-click=\"\u001f\u001ecanceldraft()\">不用</a></div></div><form id=\"activity-create-form\"><input mx-guid=\"gb\u001f\" type=\"hidden\" name=\"type\" value=\"1\"><ul class=\"union-form\"><li class=\"field\"><p class=\"field-label2\">标题</p><input mx-guid=\"gf\u001f\" type=\"text\" class=\"input\" name=\"title\" value=\"{{title}}\"></li><li class=\"field\"><p class=\"field-label2\">价格</p><input mx-guid=\"g12\u001f\" type=\"text\" class=\"input\" name=\"price\" value=\"{{price}}\"></li><li class=\"field\"><p class=\"field-label2\">地理位置</p><input mx-guid=\"g15\u001f\" type=\"text\" class=\"input\" name=\"location\" value=\"{{location}}\"></li><li class=\"field\"><p class=\"field-label2\">地理位置经纬度</p><input mx-guid=\"g18\u001f\" type=\"text\" class=\"input\" name=\"longitudeAndlatitude\" value=\"{{longitudeAndlatitude}}\"></li><li class=\"field\"><p class=\"field-label2\">地理位置截图</p><div class=\"location-cover clearfix\">{{^if(locationCover)}}<div class=\"img-placeholder\" mx-click=\"\u001f\u001epickLocationCover()\"><span class=\"iconfont iconhao\"></span><div>添加地理位置截图</div></div>{{/if}} {{#if(locationCover)}}<div class=\"img-container\"><div class=\"mask\" mx-click=\"\u001f\u001epickLocationCover()\">重新选择图片</div><img mx-guid=\"g21\u001f\" src=\"{{locationCover}}\" class=\"img\"> <input mx-guid=\"g22\u001f\" type=\"hidden\" name=\"locationCover\" value=\"{{locationCover}}\"></div>{{/if}}</div></li><li class=\"field\"><p class=\"field-label2\">封面图</p><div class=\"cover clearfix\">{{^if(cover)}}<div class=\"img-placeholder\" mx-click=\"\u001f\u001epickCover()\"><span class=\"iconfont iconhao\"></span><div>添加封面</div></div>{{/if}} {{#if(cover)}}<div class=\"img-container\"><div class=\"mask\" mx-click=\"\u001f\u001epickCover()\">重新选择图片</div><img mx-guid=\"g2b\u001f\" src=\"{{cover}}\" class=\"img\"> <input mx-guid=\"g2c\u001f\" type=\"hidden\" name=\"cover\" value=\"{{cover}}\"></div>{{/if}}</div></li><li class=\"field\"><p class=\"field-label2\">轮播图</p><div class=\"slide clearfix\">{{#if(slide.length > 0)}} {{#for(item in slide)}}<div class=\"img-container\"><div class=\"mask\" mx-click=\"\u001f\u001epickSlide({index:{{__INDEX__}}})\">重新选择图片</div><img mx-guid=\"g32\u001f\" src=\"{{item}}\" class=\"img\"> <input mx-guid=\"g33\u001f\" type=\"hidden\" name=\"slide[{{__INDEX__}}]\" value=\"{{item}}\"></div>{{/for}} {{/if}} {{^if(slide.length >= 2)}}<div class=\"img-placeholder\" mx-click=\"\u001f\u001epickSlide()\"><span class=\"iconfont iconhao\"></span><div>添加轮播图</div></div>{{/if}}</div></li><li class=\"field\"><p class=\"field-label2\">费用说明</p><div id=\"cost-description-editor\"></div></li><li class=\"field\"><p class=\"field-label2\">费用包含</p><div id=\"cost-include-editor\"></div></li><li class=\"field\"><p class=\"field-label2\">使用方法</p><div id=\"usage-editor\"></div></li><li class=\"field\"><p class=\"field-label2\">注意事项</p><div id=\"notice-editor\"></div></li><li class=\"field\"><p class=\"field-label2\">产品说明</p><div id=\"description-editor\"></div></li><li class=\"field\"><a href=\"#\" class=\"btn btn-brand btn-large mr10\" mx-click=\"\u001f\u001esubmit()\">发布</a><a href=\"#\" class=\"btn btn-brand btn-large\" mx-click=\"\u001f\u001edraft()\">保存成草稿</a></li></ul></form></div>","subs":[]},
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
        title: '',
        price: '',
        location: '',
        longitudeAndlatitude: '',
        locationCover: '',
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
    var status = me.data.status || 2
    var postData = {}
    var formData = $('#activity-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
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
});