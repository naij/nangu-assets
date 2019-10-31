define("app/views/pages/setting/admin/create",["magix","jquery","app/mixins/dialog"],function(e,a,i){var t=e("magix"),s=e("jquery"),l=e("app/mixins/dialog");i.exports=t.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title" t-if="id">\u7f16\u8f91\u6210\u5458</h2><h2 class="title" t-if="!id">\u65b0\u589e\u6210\u5458</h2></div></div><div class="page-body"><form id="admin-create-form"><ul class="union-form"><li class="field"><p class="field-label2">\u7528\u6237\u540d</p><input type="text" class="input" name="username" value="{{username}}"></li><li class="field"><p class="field-label2">\u89d2\u8272</p><select class="select" name="role">{{#for(item in roleList)}}<option value="{{item.id}}" selected="{{item.selected}}">{{item.name}}</option>{{/for}}</select></li><li class="field"><p class="field-label2">\u72b6\u6001</p><label class="mr10" mx-click="switchStatus({value:1})"><input name="status" class="mr10" checked="{{status==1}}" type="radio" value="1"/><span>\u6b63\u5e38</span></label><label mx-click="switchStatus({value:2})"><input name="status" class="mr10" checked="{{status==2}}" type="radio" value="2"/><span>\u7981\u7528</span></label></li><li class="field"><a href="#" class="btn btn-brand btn-large" mx-click="submit()">\u63d0\u4ea4</a></li></ul></form></div>',mixins:[l],render:function(){var e=this,a=e.param("id");a?e.request().all([{name:"setting_admin_detail",params:{id:a}},{name:"setting_role_list"}],function(i,t,l){var n=t.get("data"),d=l.get("data"),c=d.list;0!==a&&s.each(c,function(e,i){i.selected=!1,i.id==a&&(i.selected=!0)}),e.data=s.extend(n,{roleList:c}),e.setView()}):e.request().all([{name:"setting_role_list"}],function(a,i){var t=i.get("data"),s=t.list;e.data={roleList:s},e.setView()})},"submit<click>":function(e){e.preventDefault();var a,i=this,t=i.data.id,l=s("#admin-create-form").serializeJSON({useIntKeysAsArrayIndex:!0});t?(l.id=t,a="setting_admin_update"):a="setting_admin_create",i.request().all([{name:a,params:l}],function(){window.history.go(-1)})}})});