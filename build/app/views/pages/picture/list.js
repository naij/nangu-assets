define('app/views/pages/picture/list',['magix','jquery','app/mixins/dialog'],function(require,exports,module){
/*Magix ,$ ,Dialog */
var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">图片列表</h2></div></div><div class=\"page-body table-container\"><div class=\"toolbar clearfix\"><a href=\"#\" class=\"btn btn-brand btn-large\" mx-click=\"\u001f\u001eupload()\">上传图片</a></div><table class=\"table pic-list\"><thead><tr t-class:no-data=\"list.length == 0\"><th class=\"left\" width=\"120\">图片预览</th><th class=\"left\" width=\"150\">图片名称</th><th class=\"left\">图片地址</th><th class=\"left\" width=\"150\">上传时间</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class=\"left\"><div class=\"pic-cnt\"><a href=\"{{item.picPath}}\" target=\"_blank\"><img src=\"{{item.picPath}}?x-oss-process=style/p_30\"/></a></div></td><td class=\"left\">{{item.picName}}</td><td class=\"left\"><textarea class=\"textarea\" onclick=\"select()\">{{item.picPath}}</textarea></td><td class=\"left\">{{item.createdAt|formatDate}}</td></tr>{{/for}} {{#if(list.length == 0)}}<tr class=\"none\"><td class=\"center\" colspan=\"4\">暂无数据</td></tr>{{/if}}</tbody></table><div class=\"tfoot\"><div class=\"pager-container\" mx-view=\"app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}\" mx-change=\"\u001f\u001epageChange()\"></div></div></div>","subs":[]},
  mixins: [Dialog],
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'picture_list',
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
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  }
})
});