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
    }, {
      name: 'detailfield_list',
      params: {
        categoryId: categoryId
      }
    }], function(e, AttributeModel, DetailfieldModel) {
      me.data = {
        attributeList: AttributeModel.get('data').list,
        detailfieldList: DetailfieldModel.get('data').list,
        slide: [],
        recommandStatus: 0,
        ticketGenType: 0
      }
      me.setView().then(function() {
        me._rendered()
      })
    })
  },
  _rendered: function(data) {
    var me = this
    var detailfieldList = me.data.detailfieldList

    $.each(detailfieldList, function(i, v) {
      if (v.fieldType == 0) {
        var editor = new Editor('#' + v.fieldName + '-editor')
        me._customInsertImg(editor)
        editor.create()
        me[v.fieldName + 'Editor'] = editor
      }
    })
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
  // 获取文本编辑器内容
  _getEditorContent: function() {
    var me = this
    var editorContent = {}
    var detailfieldList = me.data.detailfieldList
    $.each(detailfieldList, function(i, v) {
      if (v.fieldType == 0) {
        var editor = me[v.fieldName + 'Editor']
        editorContent[v.fieldName] = editor.txt.html().replace(/[\r\n]/g, "").replace(/<style(([\s\S])*?)<\/style>/g, '').replace(/\<img/gi, '<img style="width:100%;height:auto" ').replace(/<p>/ig, '<p class="p_class">')
      }
    })
    return editorContent
  },
  // 计算sku排列方式
  _parseSku: function() {
    var attributeList = this.data.attributeList
    var attributeValueList = []
    $.each(attributeList, function ( i, v ) {
      attributeValueList.push(v.attributeValueList)
    })
    var skuList = util.calcDescartes(attributeValueList)
    var originSkuList = this.data.skuList
    $.each(skuList, function (i, v) {
      var skuItemString = JSON.stringify(v)
      skuItemString = skuItemString.substr(0, skuItemString.length - 1)

      v.push({
        fieldName: 'price',
        fieldLabel: '价格',
        fieldValue: '',
        input: true
      }, {
        fieldName: 'stock',
        fieldLabel: '库存',
        fieldValue: '',
        input: true
      })

      $.each(originSkuList, function(i2, v2) {
        var originSkuItemString = JSON.stringify(v2)
        if (!v2.input) {
          // 用字符串判断这条数据的属性值是否被改动
          // 如果没有改动则需要保持价格和库存的数据不被清空
          if (originSkuItemString.indexOf(skuItemString) != -1) {
            v[v.length - 2].fieldValue = v2[v2.length - 2].fieldValue
            v[v.length - 1].fieldValue = v2[v2.length - 1].fieldValue
          }
        }
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
        if (!v.attributeValueList) {
          v.attributeValueList = []
        }
        if (v.attributeId == attributeId) {
          attributeObject = v
        }
      })
      var attributeValueList = attributeObject.attributeValueList
      attributeValueList.push({
        attributeId: attributeId,
        value: value
      })
      $.each(attributeValueList, function( i, v ) {
        v.index = i
      })
      attributeObject.attributeValueList = attributeValueList
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
    var attributeValueList = attributeObject.attributeValueList
    attributeValueList.splice(index, 1)
    $.each(attributeValueList, function( i, v ) {
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
  'switchRecommandStatus<click>': function (e) {
    this.data.recommandStatus = e.params.value
    this.setView()
  },
  'switchTicketGenType<click>': function (e) {
    this.data.ticketGenType = e.params.value
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var categoryId = me.param('categoryId')
    var attributeList = me.data.attributeList
    var skuList = me.data.skuList
    var formData = $('#product-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var detail = me._getEditorContent()

    if (formData.location) {
      $.extend(detail, {
        location: formData.location,
        locationPointer: formData.locationPointer
      })
    }

    $.extend(formData, {
      categoryId: categoryId,
      attributeList: attributeList,
      skuList: skuList,
      detail: detail
    })

    me.request().all([{
      name: 'product_create',
      params: formData
    }], function(e, MesModel) {
      me.to('/product/successful?type=publish')
    })
  }
})