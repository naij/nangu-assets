define("app/views/pages/product/tag/list",["magix","jquery","app/mixins/dialog"],function(t,a,e){var i=t("magix"),s=(t("jquery"),t("app/mixins/dialog"));e.exports=i.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title">\u6807\u7b7e\u5217\u8868</h2></div></div><div class="page-body table-container"><div class="toolbar clearfix"><a href="/product/tag/create" class="btn btn-brand btn-large">\u65b0\u589e\u6807\u7b7e</a></div><table class="table"><thead><tr t-class:no-data="list.length == 0"><th class="left" width="100">\u5b57\u6bb5\u7f16\u53f7</th><th class="left">\u6807\u7b7e\u540d</th><th class="left" width="100">\u6807\u7b7e\u7c7b\u578b</th><th class="center" width="150">\u64cd\u4f5c</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class="left">{{item.id}}</td><td class="left"><span class="iconfont {{item.icon}} mr10" t-if="item.icon"></span>{{item.name}}</td><td class="left">{{item.type|formatType}}</td><td class="center"><a href="/product/tag/create?id={{item.id}}" class="color-blue mr10">\u7f16\u8f91</a><a href="#" mx-click="remove({id:{{item.id}}})" class="color-blue">\u5220\u9664</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class="none"><td class="center" colspan="4">\u6682\u65e0\u6570\u636e</td></tr>{{/if}}</tbody></table><div class="tfoot"><div class="pager-container" mx-view="app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}" mx-change="pageChange()"></div></div></div>',mixins:[s],ctor:function(){this.observe(["pageNo"])},render:function(){var t=this,a=t.param("pageNo")||1,e=10;t.request().all([{name:"tag_list",params:{pageNo:a,pageSize:e}}],function(i,s){var l=s.get("data");t.data={list:l.list,pageNo:a,pageSize:e,totalCount:l.totalCount},t.setView()})},"remove<click>":function(t){t.preventDefault();var a=t.params.id,e=this;e.confirm("\u786e\u5b9a\u8981\u5220\u9664\u6b64\u6570\u636e\uff1f\u5f7b\u5e95\u5220\u9664\u540e\u4e0d\u53ef\u590d\u539f\uff01",function(){e.request().all([{name:"tag_remove",params:{id:a}}],function(){e.render()})})},"pageChange<change>":function(t){this.to({pageNo:t.state.page})},filters:{formatType:function(t){var a;switch(t){case 1:a="\u6587\u672c\u6807\u7b7e";break;case 2:a="\u5e26\u56fe\u6807\u6807\u7b7e"}return a}}})});