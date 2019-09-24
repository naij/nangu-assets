var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@publish.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var id = me.param('id')

    if (id !== '') {
      me.request().all([{
        name: 'roomvoucher_detail',
        params: {
          id: id
        }
      }], function(e, MesModel) {
        var data = MesModel.get('data')
  
        me.data = data
        me.data.id = id
        me.data.spuSpec = me._parseSpuSpec(data.spuSpec)
        me.data.skuSpec = me._parseSkuSpec(data.spuSpec, data.sku)
        me.data.deletedSkuSpec = []

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
        detail: {},
        spuSpec: me._parseSpuSpec({}),
        skuSpec: me._parseSkuSpec({}),
        deletedSkuSpec: []
      }
      me.setView().then(function() {
        me._rendered()
      })
    }
  },
  _rendered: function(data) {
    var me = this
    var usageEditor = new Editor('#usage-editor')
    this._customInsertImg(usageEditor)
    usageEditor.create()
    var descriptionEditor = new Editor('#description-editor')
    this._customInsertImg(descriptionEditor)
    descriptionEditor.create()

    this.usageEditor = usageEditor
    this.descriptionEditor = descriptionEditor

    if (data) {
      this._setEditorContent(data)
    }
  },
  _setEditorContent: function(data) {
    this.usageEditor.txt.html(data.detail.usage)
    this.descriptionEditor.txt.html(data.detail.description)
  },
  _parseSpuSpec: function(spec) {
    if ($.isEmptyObject(spec)) {
      return []
    } else {
      return spec['套餐']
    }
  },
  _parseSkuSpec: function (spuSpec, sku) {
    if ($.isEmptyObject(spuSpec)) {
      return []
    } else {
      var skuSpec = []
      spuSpec.forEach(function(v, i) {
        sku.forEach(function(subv, subi) {
          if (subv.indexes == i) {
            skuSpec.push({
              skuSn: subv.skuSn,
              specValue: v,
              price: subv.price,
              stock: subv.stock,
              indexes: i,
              spec: {"套餐": v}
            })
          }
        })
      })
      return skuSpec
    }
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
    editorContent.usage = me.usageEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    editorContent.description = me.descriptionEditor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
    return editorContent
  },
  _updateIndexes: function () {
    var me = this
    me.data.spuSpec.forEach(function(v ,i) {
      me.data.skuSpec[i]['indexes'] = i
    })
  },
  'addSpuSpec<click>': function(e) {
    e.preventDefault()
    var me = this
    var specValue = $('#J_spec_value').val()
    if (specValue) {
      me.data.spuSpec.push(specValue)
      me.data.skuSpec.push({
        specValue: specValue,
        price: '',
        stock: '',
        spec: {"套餐": specValue}
      })
      me._updateIndexes()
      me.setView()
    }
  },
  'delSpuSpec<click>': function(e) {
    e.preventDefault()
    var me = this
    var index = e.params.index
    me.data.spuSpec.splice(index, 1)
    me.data.deletedSkuSpec.push(me.data.skuSpec.splice(index, 1)[0])
    me._updateIndexes()
    me.setView()
  },
  'bindSkuSpecChange<change>': function(e) {
    var me = this
    var index = e.params.index
    var field = e.params.field
    var input = $(e.eventTarget)
    me.data.skuSpec[index][field] = input.val()
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
    var spuSpec = {'套餐': me.data.spuSpec}
    var skuSpec = me.data.skuSpec
    var deletedSkuSpec = me.data.deletedSkuSpec

    if (!formData.title) {
      return this.alert('请填写标题！')
    } else if (me.data.spuSpec.length == 0) {
      return this.alert('请填写套餐内容！')
    } else if (!formData.cover) {
      return this.alert('请选择封面图！')
    } else if (formData.slide.length == 0) {
      return this.alert('请选择轮播图！')
    } 

    formData.spuSpec = JSON.stringify(spuSpec)
    formData.skuSpec = JSON.stringify(skuSpec)
    formData.deletedSkuSpec = JSON.stringify(deletedSkuSpec)
    formData.detail = JSON.stringify(editorContent)

    // 按价格从低到高排序
    skuSpec.sort(function(a, b) {
      return a.price - b.price
    })

    // sku中最低价格
    formData.price = skuSpec[0].price
    // 活动发布后就清空草稿
    formData.draft = ''
    // 发布后状态设置成 1
    formData.status = 1

    var modelName

    if (typeof(id) == 'undefined') {
      modelName = 'roomvoucher_create'
    } else {
      formData.id = id
      modelName = 'roomvoucher_update'
    }
    me.request().all([{
      name: modelName,
      params: formData
    }], function(e, MesModel) {
      me.to('/roomvoucher/list')
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
      formData.detail = editorContent
      Magix.mix(postData, formData)
    }
    
    postData.draft = JSON.stringify(postData)
    var modelName

    if (typeof(id) == 'undefined') {
      modelName = 'roomvoucher_create'
    } else {
      postData.id = id
      modelName = 'roomvoucher_update'
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