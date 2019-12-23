var Magix = require('magix')
var $ = require('jquery')
var _ = require('underscore')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')
var util = require('app/util/index')

module.exports = Magix.View.extend({
  tmpl: '@update.html',
  mixins: [Dialog],
  render: function() {
    var me = this
    var productSn = me.param('productSn')

    me.request().all([{
      name: 'product_detail',
      params: {
        productSn: productSn
      }
    }], function(e, ProductModel) {
      var productData = ProductModel.get('data')
      productData.originSkuList = productData.skuList
      productData.skuList = me._preparseSku(productData)
      productData.deletedAttributeValueList = []
      productData.deletedSkuList = []
      me.data = productData
      me.setView().then(function() {
        me._rendered()
      })
    })
  },
  _rendered: function(data) {
    var me = this
    var detailfieldList = me.data.detailfieldList
    var detail = me.data.detail

    $.each(detailfieldList, function(i, v) {
      if (v.fieldType == 0) {
        var editor = new Editor('#' + v.fieldName + '-editor')
        me._customInsertImg(editor)
        editor.create()
        editor.txt.html(detail[v.fieldName])
        me[v.fieldName + 'Editor'] = editor
      }
    })
  },
  // 自定义图片插入
  _customInsertImg: function(editorInstance) {
    var me = this
    editorInstance.customConfig.onInsertImg = function (cb) {
      me.mxDialog('app/views/pages/common/img_picker', {
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
  // 处理返回的sku数据
  _preparseSku: function (data) {
    var originSkuList = data.originSkuList
    var attributeList = data.attributeList
    var skuList = []
    originSkuList.forEach(function(v, i) {
      var properties = v.properties.split(';')
      properties.shift()
      var skuItem = []
      properties.forEach(function(v2, i2) {
        var propertie = v2.split(':')
        attributeList.forEach(function(v3, i3) {
          if (v3.attributeId == propertie[0]) {
            var attributeValueList = v3.attributeValueList
            attributeValueList.forEach(function (v4, i4) {
              if (v4.attributeValueId == propertie[1]) {
                // guid 用来判断数据是否被修改过
                v4.guid = Magix.guid('attr')
                skuItem.push(v4)
              }
            })
          }
        })
      })
      skuItem.push({
        fieldName: 'price',
        fieldLabel: '价格',
        fieldValue: v.price,
        input: true
      }, {
        fieldName: 'promotionPrice',
        fieldLabel: '促销价格',
        fieldValue: v.promotionPrice,
        input: true
      }, {
        fieldName: 'stock',
        fieldLabel: '库存',
        fieldValue: v.stock,
        input: true
      }, {
        skuSn: v.skuSn
      })
      skuList.push(skuItem)
    })
    return skuList
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
      v.push({
        fieldName: 'price',
        fieldLabel: '价格',
        fieldValue: '',
        input: true
      }, {
        fieldName: 'promotionPrice',
        fieldLabel: '促销价格',
        fieldValue: '',
        input: true
      }, {
        fieldName: 'stock',
        fieldLabel: '库存',
        fieldValue: '10000',
        input: true
      }, {
        skuSn: ''
      })
      
      $.each(originSkuList, function(i2, v2) {
        var unModitied = true
        $.each(v2, function(i3, v3) {
          if ((i3 < v2.length - 4) && (v3.guid != v[i3].guid)) {
            unModitied = false
          }
        })
        // 如果没有改动则需要保持价格和库存的数据不被清空
        if (unModitied) {
          v[v.length - 4].fieldValue = v2[v2.length - 4].fieldValue
          v[v.length - 3].fieldValue = v2[v2.length - 3].fieldValue
          v[v.length - 2].fieldValue = v2[v2.length - 2].fieldValue
          v[v.length - 1].skuSn = v2[v2.length - 1].skuSn
        }
      })
    })
    this.data.skuList = skuList
  },
  // 检查所有必填字段
  _checkField: function(formData) {
    var me = this
    var rule = [
      {fieldName: 'title', msg: '标题为必填项'},
      {fieldName: 'cover', msg: '请选择封面图'},
      {fieldName: 'slide', msg: '请选择轮播图'},
      {fieldName: 'businessId', msg: '请选择所属商户'}
    ]

    var flag = true
    rule.some(function(v, i) {
      if (!formData[v.fieldName]) {
        flag = false
        me.alert(v.msg)
        return false
      }
    })

    return flag
  },
  'makeTag<click>': function(e) {
    var me = this
    var tagList = me.data.tagList
    var id = e.params.id
    tagList.forEach(function(v) {
      if (v.id == id) {
        if (v.selected) {
          v.selected = false
        } else {
          v.selected = true
        }
      }
    })
    me.data.tagList = tagList
    me.setView()
  },
  'addAttributeValue<click>': function(e) {
    e.preventDefault()
    var me = this
    var attributeId = e.params.attributeId
    var attributeList = me.data.attributeList
    var value = $('#J_attr_value_' + attributeId).val()
    var attributeValueList

    if (value) {
      $.each(attributeList, function( i, v ) {
        if (!v.attributeValueList) {
          v.attributeValueList = []
        }
        if (v.attributeId == attributeId) {
          attributeValueList = v.attributeValueList
        }
      })
      attributeValueList.push({
        guid: Magix.guid('attr'),
        attributeId: attributeId,
        value: value
      })
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
    var originSkuList = me.data.originSkuList
    var attributeValueList 
    
    $.each(attributeList, function( i, v ) {
      if (v.attributeId == attributeId) {
        attributeValueList = v.attributeValueList
      }
    })

    var deletedAttributeValue = attributeValueList.splice(index, 1)[0]
    var deletedAttributeValueList = []
    if (deletedAttributeValue.attributeValueId) {
      deletedAttributeValueList.push(deletedAttributeValue.attributeValueId)
    }
    me.data.deletedAttributeValueList = deletedAttributeValueList

    var deletedSkuList = []
    $.each(originSkuList, function( i, v ) {
      if (v.properties.indexOf(deletedAttributeValue.attributeValueId) != -1) {
        deletedSkuList.push(v.skuSn)
      }
    })
    me.data.deletedSkuList = deletedSkuList

    me._parseSku()
    me.setView()
  },
  'editAttributeValue<click>': function(e) {
    e.preventDefault()
    var me = this
    var curNode = $(e.eventTarget)
    var input = curNode.parent().find('.input')
    var value = input.val()

    if (value) {
      var index = e.params.index
      var attributeId = e.params.attributeId
      var attributeList = me.data.attributeList
      var attributeValueList 
      
      $.each(attributeList, function( i, v ) {
        if (v.attributeId == attributeId) {
          attributeValueList = v.attributeValueList
        }
      })

      attributeValueList[index].value = value
      me._parseSku()
      me.setView()
      curNode.parent().hide()
    }
  },
  'showAttributeValueEdit<click>': function(e) {
    e.preventDefault()
    var curNode = $(e.eventTarget)
    curNode.parent().find('.edit-wrapper').show()
  },
  'hideAttributeValueEdit<click>': function(e) {
    e.preventDefault()
    var curNode = $(e.eventTarget)
    curNode.parent().hide()
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
    me.mxDialog('app/views/pages/common/img_picker', {
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
    me.mxDialog('app/views/pages/common/img_picker', {
      width: 700,
      limit: 20,
      callback: function(data) {
        data.forEach(function(v, i) {
          me.data.slide.push(v.picPath)
        })
        me.setView()
      }
    })
  },
  'updateSlide<click>': function(e) {
    e.preventDefault()
    var me = this
    var index = e.params.index
    me.mxDialog('app/views/pages/common/img_picker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.slide.splice(index, 1, data[0].picPath)
        me.setView()
      }
    })
  },
  'removeSlide<click>': function(e) {
    e.preventDefault()
    var me = this
    var index = e.params.index
    me.data.slide.splice(index, 1)
    me.setView()
  },
  'pickBusiness<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/common/business_picker', {
      width: 700,
      callback: function(data) {
        me.data.businessId = data.id
        me.data.businessName = data.name
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
    var productSn = me.param('productSn')
    var attributeList = me.data.attributeList
    var deletedAttributeValueList = me.data.deletedAttributeValueList
    var deletedSkuList = me.data.deletedSkuList
    var skuList = me.data.skuList
    var originTagList = me.data.tagList
    var formData = $('#product-create-form').serializeJSON({useIntKeysAsArrayIndex: true})
    var detail = me._getEditorContent()

    if (me._checkField(formData)) {
      if (formData.location) {
        $.extend(detail, {
          location: formData.location,
          locationPointer: formData.locationPointer
        })
      }

      var tagList = []
      originTagList.forEach(function(v) {
        if (v.selected) {
          tagList.push({
            id: v.id,
            name: v.name
          })
        }
      })

      var priceArray = []
      var promotionPriceArray = []
      skuList.forEach(function(v) {
        v.forEach(function(v2) {
          if (v2.fieldName == 'price') {
            priceArray.push(v2.fieldValue)
          }
          if (v2.fieldName == 'promotionPrice') {
            promotionPriceArray.push(v2.fieldValue)
          }
        })
      })

      priceArray.sort(function(a, b) {return a - b})
      promotionPriceArray.sort(function(a, b) {return a - b})
      var price = priceArray[0]
      var promotionPrice = promotionPriceArray[0]

      $.extend(formData, {
        price: price,
        promotionPrice: promotionPrice,
        productSn: productSn,
        attributeList: attributeList,
        deletedAttributeValueList: deletedAttributeValueList,
        deletedSkuList: deletedSkuList,
        skuList: skuList,
        tagList: tagList,
        detail: detail
      })

      me.request().all([{
        name: 'product_update',
        params: formData
      }], function(e, MesModel) {
        me.to('/product/successful?type=update')
      })
    }
  }
})