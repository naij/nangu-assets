define('app/views/pages/member/list',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: {"html":"<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">注册用户列表</h2></div></div><div class=\"page-body table-container\"><table class=\"table member-list\"><thead><tr t-class:no-data=\"list.length == 0\"><th class=\"left\" width=\"120\">用户头像</th><th class=\"left\">昵称</th><th class=\"left\" width=\"150\">创建时间</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class=\"left\"><div class=\"pic-cnt\"><a href=\"{{item.avatarUrl}}\" target=\"_blank\"><img src=\"{{item.avatarUrl}}\"/></a></div></td><td class=\"left\">{{item.nickName}}</td><td class=\"left\">{{item.createdAt|formatDate}}</td></tr>{{/for}} {{#if(list.length == 0)}}<tr class=\"none\"><td colspan=\"3\">暂无数据</td></tr>{{/if}}</tbody></table><div class=\"tfoot\"><div class=\"pager-container\" mx-view=\"app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}\" mx-change=\"\u001f\u001epageChange()\"></div></div></div>","subs":[]},
  ctor: function() {
    this.observe(['pageNo'])
  },
  render: function() {
    var me = this
    var pageNo = me.param('pageNo') || 1
    var pageSize = 10

    me.request().all([{
      name: 'member_list',
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
  }
})
});