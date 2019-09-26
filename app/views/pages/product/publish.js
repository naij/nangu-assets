var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')
var util = require('app/util/index')

module.exports = Magix.View.extend({
  tmpl: '@publish.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var categoryId = me.param('categoryId')

    me.request().all([{
      name: 'attribute_list',
      params: {
        categoryId: categoryId,
        type: 0
      }
    }], function(e, MesModel) {
      var data = MesModel.get('data')
      me.data = {
        attributeList: data.list,
        slide: []
      }
      me.setView()
    })
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
  // 计算sku排列方式
  _parseSku: function() {
    var attributeList = this.data.attributeList
    var attributeValues = []
    $.each(attributeList, function ( i, v ) {
      attributeValues.push(v.attributeValues)
    })
    var skuList = util.calcDescartes(attributeValues)
    $.each(skuList, function (i, v) {
      v.push({
        fieldName: 'price',
        fieldLabel: '价格',
        fieldValue: '',
        input: true
      })
      v.push({
        fieldName: 'stock',
        fieldLabel: '库存',
        fieldValue: '',
        input: true
      })
    })
    this.data.skuList = skuList
  },
  'addAttributeValue<click>': function(e) {
    e.preventDefault()
    var me = this
    var attributeId = e.params.attributeId
    var attributeList = me.data.attributeList
    var value = $('#J_attr_value_' + attributeId).val()
    var attributeObject 

    if (value) {
      $.each(attributeList, function( i, v ) {
        if (!v.attributeValues) {
          v.attributeValues = []
        }
        if (v.attributeId == attributeId) {
          attributeObject = v
        }
      })
      var attributeValues = attributeObject.attributeValues
      attributeValues.push({
        attributeId: attributeId,
        value: value
      })
      $.each(attributeValues, function( i, v ) {
        v.index = i
      })
      attributeObject.attributeValues = attributeValues
      me._parseSku()
      me.setView()
    }
  },
  'delAttributeValue<click>': function(e) {
    e.preventDefault()
    var me = this
    var index = e.params.index
    var attributeId = e.params.attributeId
    var attributeList = me.data.attributeList
    var attributeObject 
    
    $.each(attributeList, function( i, v ) {
      if (v.attributeId == attributeId) {
        attributeObject = v
      }
    })
    var attributeValues = attributeObject.attributeValues
    attributeValues.splice(index, 1)
    $.each(attributeValues, function( i, v ) {
      v.index = i
    })
    me._parseSku()
    me.setView()
  },
  'skuFieldChange<change>': function(e) {
    var me = this
    var index = e.params.index
    var field = e.params.field
    var input = $(e.eventTarget)
    var curSku = me.data.skuList[index]

    $.each(curSku, function (i, v) {
      if (v.fieldName == field) {
        v.fieldValue = input.val()
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
    var categoryId = me.param('categoryId')
    var attributeList = me.data.attributeList
    var skuList = me.data.skuList
    var formData = $('#product-create-form').serializeJSON({useIntKeysAsArrayIndex: true})

    $.extend(formData, {
      categoryId: categoryId,
      attributeList: attributeList,
      skuList: skuList
    })

    me.request().all([{
      name: 'product_create',
      params: formData
    }], function(e, MesModel) {
      // me.to('/roomvoucher/list')
    })
  }
})