define("app/views/pages/picture/list",["magix","jquery","app/mixins/dialog"],function(t,a,e){var i=t("magix"),s=(t("jquery"),t("app/mixins/dialog"));e.exports=i.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title">\u56fe\u7247\u5217\u8868</h2></div></div><div class="page-body table-container"><div class="toolbar clearfix"><a href="#" class="btn btn-brand btn-large" mx-click="upload()">\u4e0a\u4f20\u56fe\u7247</a></div><table class="table pic-list"><thead><tr t-class:no-data="list.length == 0"><th class="left" width="120">\u56fe\u7247\u9884\u89c8</th><th class="left" width="150">\u56fe\u7247\u540d\u79f0</th><th class="left">\u56fe\u7247\u5730\u5740</th><th class="left" width="150">\u4e0a\u4f20\u65f6\u95f4</th><th class="center" width="100">\u64cd\u4f5c</th></tr></thead><tbody>{{#for(item in list)}}<tr><td class="left"><div class="pic-cnt"><a href="{{item.picPath}}" target="_blank"><img src="{{item.picPath}}?x-oss-process=style/p_30"/></a></div></td><td class="left">{{item.picName}}</td><td class="left"><textarea class="textarea" onclick="select()">{{item.picPath}}</textarea></td><td class="left">{{item.createdAt}}</td><td class="center"><a href="#" mx-click="remove({id:{{item.id}}})" class="color-blue">\u5220\u9664</a></td></tr>{{/for}} {{#if(list.length == 0)}}<tr class="none"><td class="center" colspan="5">\u6682\u65e0\u6570\u636e</td></tr>{{/if}}</tbody></table><div class="tfoot"><div class="pager-container" mx-view="app/coms/pagination/pagination?total={{totalCount}}&size={{pageSize}}&page={{pageNo}}" mx-change="pageChange()"></div></div></div>',mixins:[s],ctor:function(){this.observe(["pageNo"])},render:function(){var t=this,a=t.param("pageNo")||1,e=10;t.request().all([{name:"picture_list",params:{status:1,pageNo:a,pageSize:e}}],function(i,s){var l=s.get("data");t.data={list:l.list,pageNo:a,pageSize:e,totalCount:l.totalCount},t.setView()})},"upload<click>":function(t){t.preventDefault();var a=this;a.mxDialog("app/views/pages/picture/upload",{width:700,callback:function(){a.render()}})},"remove<click>":function(t){t.preventDefault();var a=this,e=t.params.id;a.confirm("\u786e\u5b9a\u8981\u5220\u8fd9\u6761\u6570\u636e\uff1f",function(){a.request().all([{name:"picture_remove",params:{id:e}}],function(){a.render()})})},"pageChange<change>":function(t){this.to({pageNo:t.state.page})}})});