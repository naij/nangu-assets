define("app/views/pages/user/member/list",["magix","jquery","app/mixins/dialog"],function(e,t,a){var i=e("magix"),s=e("jquery"),n=e("app/mixins/dialog");a.exports=i.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title">\u6ce8\u518c\u7528\u6237\u5217\u8868</h2></div></div><div class="page-body table-container"><div class="toolbar clearfix"><input type="text" class="input fr" value="{{q}}" placeholder="\u8f93\u5165\u6635\u79f0\u641c\u7d22" mx-keydown="search()"></div><table class="table member-list"><thead><tr t-class:no-data="list.length == 0"><th class="left" width="120">\u7528\u6237\u5934\u50cf</th><th class="left">\u6635\u79f0</th><th class="left" width="150">\u7528\u6237\u7c7b\u578b</th><th class="left" width="150">\u521b\u5efa\u65f6\u95f4</th><th class="left" width="150">\u64cd\u4f5c</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class="left"><div class="pic-cnt"><a href="{{item.avatarUrl}}" target="_blank"><img src="{{item.avatarUrl}}"/></a></div></td><td class="left">{{item.nickName}}</td><td class="left"><p>{{{item.businessId|formatType}}}</p><p t-if="item.businessId" class="color-l f12">[{{item.businessName}}]</p></td><td class="left">{{item.createdAt}}</td><td class="left"><a href="#" class="color-blue" mx-click="bind({unionId:\'{{item.unionId}}\'})" t-if="!item.businessId">\u7ed1\u5b9a\u5546\u6237</a><a href="#" class="color-blue" mx-click="unbind({unionId:\'{{item.unionId}}\'})" t-if="item.businessId">\u89e3\u7ed1\u5546\u6237</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class="none"><td class="center" colspan="5">\u6682\u65e0\u6570\u636e</td></tr>{{/if}}</tbody></table><div class="tfoot"><div class="pager-container" mx-view="app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}" mx-change="pageChange()"></div></div></div>',mixins:[n],ctor:function(){this.observe(["pageNo","q"])},render:function(){var e=this,t=e.param("pageNo")||1,a=10,i=e.param("q");e.request().all([{name:"member_list",params:{pageNo:t,pageSize:a,q:i}}],function(s,n){var l=n.get("data");e.data={list:l.list,q:i,pageNo:t,pageSize:a,totalCount:l.totalCount},e.setView()})},"search<keydown>":function(e){"13"==e.keyCode&&this.to({q:s(e.eventTarget).val(),pageNo:1})},"pageChange<change>":function(e){this.to({pageNo:e.state.page})},"bind<click>":function(e){e.preventDefault();var t=this,a=e.params.unionId;t.mxDialog("app/views/pages/common/business_picker",{width:700,callback:function(e){t.alert("\u5546\u6237\u7ed1\u5b9a\u6210\u529f\uff01"),t.request().all([{name:"member_update",params:{unionId:a,businessId:e.businessId}}],function(){t.render()})}})},"unbind<click>":function(e){e.preventDefault();var t=this,a=e.params.unionId;t.confirm("\u786e\u5b9a\u8981\u89e3\u7ed1\u6b64\u5546\u6237\uff1f",function(){t.request().all([{name:"member_update",params:{unionId:a,businessId:""}}],function(){t.alert("\u5546\u6237\u89e3\u7ed1\u6210\u529f\uff01"),t.render()})})},filters:{formatType:function(e){return e?'<span class="color-green">\u5546\u6237</span>':'<span class="color-m">\u666e\u901a\u7528\u6237</span>'}}})});