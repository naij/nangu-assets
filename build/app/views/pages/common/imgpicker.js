define('app/views/pages/common/imgpicker',['magix','jquery','app/mixins/dialog'],function(require,exports,module){
/*Magix ,$ ,Dialog */
var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"image-picker\"><div class=\"dialog-hd\"><h2 class=\"dialog-title\">选择图片</h2></div><div class=\"dialog-bd\"><div class=\"upload\"><a href=\"#\" class=\"btn btn-large btn-green\" mx-click=\"\u001f\u001eupload()\">本地上传</a></div><ul class=\"image-container clearfix\">{{#for(item in list)}}<li t-class:selected=\"item.selected\" mx-click=\"\u001f\u001epick({index:{{__INDEX__}}})\"><div class=\"img-block\"><img src=\"{{item.picPath}}?x-oss-process=style/p_30\" class=\"img\"/></div><div class=\"name\">{{item.picName}}</div><div class=\"mask\"><span class=\"iconfont iconduigou\"></span></div></li>{{/for}}</ul></div><div class=\"dialog-ft\"><a href=\"javascript:;\" class=\"btn btn-brand btn-large mr10\" mx-click=\"\u001f\u001esubmit()\" t-if=\"selectedList.length > 0\">确定</a><a href=\"javascript:;\" class=\"btn btn-disabled btn-large mr10\" t-if=\"selectedList.length == 0\">确定</a><a href=\"javascript:;\" class=\"btn btn-normal btn-large\" mx-click=\"\u001f\u001ecancel()\">取消</a></div></div>","subs":[]},
  mixins: [Dialog],
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    me.request().all([{
      name: 'picture_list'
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data.list,
        selectedList: []
      }
      me.setView()
    })
  },
  'pick<click>': function(e) {
    var me = this
    var limit = me.extraData.limit
    var index = e.params.index
    var list = me.data.list
    var selectedList = me.data.selectedList
    var selectedIndex

    $.each(selectedList, function(i, v) {
      if (v.id == list[index].id) {
        selectedIndex = i
      }
    })

    if (typeof(selectedIndex) != "undefined") {
      selectedList.splice(selectedIndex, 1)
    } else if (selectedList.length < limit) {
      selectedList.push(list[index])
    } else {
      selectedList.shift()
      selectedList.push(list[index])
    }

    $.each(list, function(i, v) {
      v.selected = false
      $.each(selectedList, function(subi, subv) {
        if (v.id == subv.id) {
          v.selected = true
        }
      })
    })

    me.data = {
      list: list,
      selectedList: selectedList
    }
    me.setView()
  },
  'upload<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/picture/upload', {
      width: 700, 
      callback: function() {
        me.render()
      }
    })
  },
  'submit<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
    this.extraData.callback(this.data.selectedList)
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})
});