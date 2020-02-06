define("app/views/pages/assets/list",["magix","jquery"],function(t,a,e){{var s=t("magix");t("jquery")}e.exports=s.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title">\u53d1\u5e03\u5217\u8868</h2></div></div><div class="page-body table-container"><table class="table pic-list"><thead><tr t-class:no-data="list.length == 0"><th class="left" width="180">\u53d1\u5e03\u65f6\u95f4</th><th class="left" width="120">\u5e94\u7528\u540d</th><th class="left" width="120">\u7248\u672c\u53f7</th><th class="left" width="120">\u53d1\u5e03\u7c7b\u578b</th><th class="left" width="80">\u72b6\u6001</th><th class="center">\u64cd\u4f5c</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class="left">{{item.createdAt}}</td><td class="left">{{item.appName}}</td><td class="left">{{item.refName}}</td><td class="left">{{item.refName|formatType}}</td><td class="left">{{{item.status|formatStatus}}}</td><td class="center"><a href="/assets/detail?id={{item.id}}" class="color-blue">\u67e5\u770b\u8be6\u60c5</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class="none"><td class="center" colspan="6">\u6682\u65e0\u6570\u636e</td></tr>{{/if}}</tbody></table><div class="tfoot"><div class="pager-container" mx-view="app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}" mx-change="pageChange()"></div></div></div>',ctor:function(){this.observe(["pageNo"])},render:function(){var t=this,a=t.param("pageNo")||1,e=10;t.request().all([{name:"assets_list",params:{pageNo:a,pageSize:e}}],function(s,l){var i=l.get("data");t.data={list:i.list,pageNo:a,pageSize:e,totalCount:i.totalCount},t.setView()})},"pageChange<change>":function(t){this.to({pageNo:t.state.page})},filters:{formatType:function(t){return/daily/.test(t)?"\u65e5\u5e38":"\u6b63\u5f0f"},formatStatus:function(t){switch(t){case 0:return'<span class="color-red">\u53d1\u5e03\u5931\u8d25</span>';case 1:return'<span class="color-yellow">\u53d1\u5e03\u4e2d</span>';case 2:return'<span class="color-green">\u53d1\u5e03\u6210\u529f</span>'}}}})});