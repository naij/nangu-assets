define('app/views/pages/assets/list',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">发布列表</h2></div></div><div class=\"page-body table-container\"><table class=\"table pic-list\"><thead><tr t-class:no-data=\"list.length == 0\"><th class=\"left\" width=\"180\">发布时间</th><th class=\"left\" width=\"120\">应用名</th><th class=\"left\" width=\"120\">版本号</th><th class=\"left\" width=\"120\">发布类型</th><th class=\"left\" width=\"80\">状态</th><th class=\"center\">操作</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class=\"left\">{{item.createdAt|formatDate}}</td><td class=\"left\">{{item.appName}}</td><td class=\"left\">{{item.refName}}</td><td class=\"left\">{{item.refName|formatType}}</td><td class=\"left\">{{{item.status|formatStatus}}}</td><td class=\"center\"><a href=\"/assets/detail?id={{item.id}}\" class=\"color-blue\">查看详情</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class=\"none\"><td class=\"center\" colspan=\"6\">暂无数据</td></tr>{{/if}}</tbody></table><div class=\"tfoot\"><div class=\"pager-container\" mx-view=\"app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}\" mx-change=\"\u001f\u001epageChange()\"></div></div></div>","subs":[]},
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'assets_list',
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
  'pageChange<change>': function(e) {
    this.to({pageNo: e.state.page})
  },
  filters: {
    formatType: function(value) {
      if (/daily/.test(value)) {
        return '日常'
      } else {
        return '正式'
      }
    },
    formatStatus: function(value) {
      switch(value) {
        case 0:
          return '<span class="color-red">发布失败</span>'
          break
        case 1:
          return '<span class="color-yellow">发布中</span>'
          break
        case 2:
          return '<span class="color-green">发布成功</span>'
          break
      }
    }
  }
})
});