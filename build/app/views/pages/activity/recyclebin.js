define('app/views/pages/activity/recyclebin',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">活动回收站</h2></div></div><div class=\"page-body table-container\"><div class=\"toolbar clearfix\"><a href=\"/activity/list\" class=\"btn btn-brand btn-large\">返回活动管理</a></div><table class=\"table\"><thead><tr t-class:no-data=\"list.length == 0\"><th class=\"left\" width=\"150\">活动封面</th><th class=\"left\">活动标题</th><th class=\"left\" width=\"100\">活动类型</th><th class=\"left\" width=\"150\">操作时间</th><th class=\"left\" width=\"100\">发布状态</th><th class=\"center\" width=\"150\">操作</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class=\"left\"><img mx-guid=\"g12\u001f\" src=\"{{item.cover}}\"></td><td class=\"left\">{{item.title}}</td><td class=\"left\">{{item.type|formatType}}</td><td class=\"left\">{{item.updatedAt|formatDate}}</td><td class=\"left\">回收站存储</td><td class=\"center\"><a href=\"#\" mx-click=\"\u001f\u001erestore({id:{{item.id}}})\" class=\"color-blue mr10\">还原</a><a href=\"#\" mx-click=\"\u001f\u001eremoveComplete({id:{{item.id}}})\" class=\"color-blue\">彻底删除</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class=\"none\"><td class=\"center\" colspan=\"6\">暂无数据</td></tr>{{/if}}</tbody></table><div class=\"tfoot\"><div class=\"pager-container\" mx-view=\"app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}\" mx-change=\"\u001f\u001epageChange()\"></div></div></div>","subs":[]},
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'activity_list',
      params: {
        status: [0],
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
  'restore<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_offline',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'removeComplete<click>': function(e) {
    e.preventDefault()
    var id = e.params.id
    var me = this
    me.request().all([{
      name: 'activity_remove_complete',
      params: {
        id: id
      }
    }], function(e, MesModel) {
      me.render()
    })
  },
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  filters: {
    formatType: function(value) {
      var type
      switch(value) {
        case 1 :
          type = '合作活动'
          break
        case 2 :
          type = '自营活动'
          break
      }
      return type
    }
  }
})
});