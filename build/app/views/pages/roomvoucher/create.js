define("app/views/pages/roomvoucher/create",["magix","jquery","app/coms/editor/editor","app/mixins/dialog"],function(e,i,t){var a=e("magix"),s=e("jquery"),c=e("app/coms/editor/editor"),l=e("app/mixins/dialog");t.exports=a.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title" t-if="id">\u7f16\u8f91\u623f\u5238</h2><h2 class="title" t-if="!id">\u65b0\u589e\u623f\u5238</h2></div></div><div class="page-body spu-create"><div class="draft-tip" t-if="hasDraft">\b<p class="bd">\u7cfb\u7edf\u68c0\u6d4b\u5230\u4f60\u6709\u4e00\u4efd\u7f16\u8f91\u4e2d\u7684\u8349\u7a3f\uff0c\u662f\u5426\u9700\u8981\u8986\u76d6\u5f53\u524d\u5185\u5bb9\uff1f</p><div><a href="#" class="btn btn-green btn-large mr10" mx-click="loaddraft()">\u8986\u76d6</a><a href="#" class="btn btn-normal btn-large" mx-click="canceldraft()">\u4e0d\u7528</a></div></div><form id="spu-create-form"><input type="hidden" name="category" value="4"><ul class="union-form"><li class="field"><p class="field-label2">\u6807\u9898</p><input type="text" class="input" name="title" value="{{title}}"></li><li class="field"><p class="field-label2">\u5957\u9910</p><div class="spac-add"><input placeholder="\u8bf7\u8f93\u5165\u81ea\u5b9a\u4e49\u5957\u9910\u6807\u9898" class="input mr10" id="J_spec_value"><a href="#" class="btn btn-brand btn-large" mx-click="addSpuSpec()">+\u6dfb\u52a0</a></div><div class="spac-container clearfix" t-if="spuSpec.length>0">{{#for(item in spuSpec)}}<div class="spac-item">{{item}}<span class="iconfont iconguanbi close" mx-click="delSpuSpec({index:{{__INDEX__}}})"></span></div>{{/for}}</div></li><li class="field table-container" t-if="spuSpec.length>0"><p class="field-label2">\u9500\u552e\u89c4\u5219</p><table class="table"><thead><tr><th class="left" width="150">\u5957\u9910</th><th class="left" width="150">\u4ef7\u683c</th><th class="left" width="150">\u6570\u91cf</th></tr></thead><tbody>{{#for(item in skuSpec)}}<tr><td class="left">{{item.specValue}}</td><td class="left"><input placeholder="\u5957\u9910\u4ef7\u683c" type="number" class="input input-narrow" value="{{item.price}}" mx-change="bindSkuSpecChange({index:{{__INDEX__}},field:\'price\'})"></td><td class="left"><input placeholder="\u6570\u91cf" type="number" class="input input-narrow" value="{{item.stock}}" mx-change="bindSkuSpecChange({index:{{__INDEX__}},field:\'stock\'})"></td></tr>{{/for}}</tbody></table></li><li class="field"><p class="field-label2">\u5c01\u9762\u56fe</p><div class="cover clearfix">{{^if(cover)}}<div class="img-placeholder" mx-click="pickCover()"><span class="iconfont iconhao"></span><div>\u6dfb\u52a0\u5c01\u9762</div></div>{{/if}} {{#if(cover)}}<div class="img-container"><div class="mask" mx-click="pickCover()">\u91cd\u65b0\u9009\u62e9\u56fe\u7247</div><img src="{{cover}}" class="img"> <input type="hidden" name="cover" value="{{cover}}"></div>{{/if}}</div></li><li class="field"><p class="field-label2">\u8f6e\u64ad\u56fe</p><div class="slide clearfix">{{#if(slide.length > 0)}} {{#for(item in slide)}}<div class="img-container"><div class="mask" mx-click="pickSlide({index:{{__INDEX__}}})">\u91cd\u65b0\u9009\u62e9\u56fe\u7247</div><img src="{{item}}" class="img"> <input type="hidden" name="slide[{{__INDEX__}}]" value="{{item}}"></div>{{/for}} {{/if}} {{^if(slide.length >= 2)}}<div class="img-placeholder" mx-click="pickSlide()"><span class="iconfont iconhao"></span><div>\u6dfb\u52a0\u8f6e\u64ad\u56fe</div></div>{{/if}}</div></li><li class="field"><p class="field-label2">\u4ea7\u54c1\u8bf4\u660e</p><div id="description-editor"></div></li><li class="field"><p class="field-label2">\u4f7f\u7528\u89c4\u5219</p><div id="usage-editor"></div></li><li class="field"><a href="#" class="btn btn-brand btn-large mr10" mx-click="submit()">\u53d1\u5e03</a></li></ul></form></div>',mixins:[l],render:function(){var e=this,i=e.param("id");""!==i?e.request().all([{name:"roomvoucher_detail",params:{id:i}}],function(t,a){var s=a.get("data");e.data=s,e.data.id=i,e.data.spuSpec=e._parseSpuSpec(s.spuSpec),e.data.skuSpec=e._parseSkuSpec(s.spuSpec,s.sku),e.data.deletedSkuSpec=[],s.draft&&1==s.status&&(e.data.hasDraft=!0),e.setView().then(function(){e._rendered(s)})}):(e.data={type:1,title:"",price:"",cover:"",slide:[],detail:{},spuSpec:e._parseSpuSpec({}),skuSpec:e._parseSkuSpec({}),deletedSkuSpec:[]},e.setView().then(function(){e._rendered()}))},_rendered:function(e){var i=new c("#usage-editor");this._customInsertImg(i),i.create();var t=new c("#description-editor");this._customInsertImg(t),t.create(),this.usageEditor=i,this.descriptionEditor=t,e&&this._setEditorContent(e)},_setEditorContent:function(e){this.usageEditor.txt.html(e.detail.usage),this.descriptionEditor.txt.html(e.detail.description)},_parseSpuSpec:function(e){return s.isEmptyObject(e)?[]:e["\u5957\u9910"]},_parseSkuSpec:function(e,i){if(s.isEmptyObject(e))return[];var t=[];return e.forEach(function(e,a){i.forEach(function(i){i.indexes==a&&t.push({skuId:i.skuSn,specValue:e,price:i.price,stock:i.stock,indexes:a,spec:{"\u5957\u9910":e}})})}),t},_customInsertImg:function(e){var i=this;e.customConfig.onInsertImg=function(e){i.mxDialog("app/views/pages/common/imgpicker",{width:700,limit:1,callback:function(i){e(i[0].picPath)}})}},_getEditorContent:function(){var e=this,i={};return i.usage=e.usageEditor.txt.html().replace(/[\r\n]/g,"").replace(/<style(([\s\S])*?)<\/style>/g,"").replace(/\<img/gi,'<img style="width:100%;height:auto" ').replace(/<p>/gi,'<p class="p_class">'),i.description=e.descriptionEditor.txt.html().replace(/[\r\n]/g,"").replace(/<style(([\s\S])*?)<\/style>/g,"").replace(/\<img/gi,'<img style="width:100%;height:auto" ').replace(/<p>/gi,'<p class="p_class">'),i},_updateIndexes:function(){var e=this;e.data.spuSpec.forEach(function(i,t){e.data.skuSpec[t].indexes=t})},"addSpuSpec<click>":function(e){e.preventDefault();var i=this,t=s("#J_spec_value").val();t&&(i.data.spuSpec.push(t),i.data.skuSpec.push({specValue:t,price:"",stock:"",spec:{"\u5957\u9910":t}}),i._updateIndexes(),i.setView())},"delSpuSpec<click>":function(e){e.preventDefault();var i=this,t=e.params.index;i.data.spuSpec.splice(t,1),i.data.deletedSkuSpec.push(i.data.skuSpec.splice(t,1)[0]),i._updateIndexes(),i.setView()},"bindSkuSpecChange<change>":function(e){var i=this,t=e.params.index,a=e.params.field,c=s(e.eventTarget);i.data.skuSpec[t][a]=c.val()},"pickCover<click>":function(e){e.preventDefault();var i=this;i.mxDialog("app/views/pages/common/imgpicker",{width:700,limit:1,callback:function(e){i.data.cover=e[0].picPath,i.setView()}})},"pickSlide<click>":function(e){e.preventDefault();var i=this,t=e.params.index;i.mxDialog("app/views/pages/common/imgpicker",{width:700,limit:1,callback:function(e){"undefined"!=typeof t?i.data.slide.splice(t,1,e[0].picPath):i.data.slide.push(e[0].picPath),i.setView()}})},"submit<click>":function(e){e.preventDefault();var i=this,t=i.data.id,a=s("#spu-create-form").serializeJSON({useIntKeysAsArrayIndex:!0}),c=i._getEditorContent(),l={"\u5957\u9910":i.data.spuSpec},d=i.data.skuSpec,r=i.data.deletedSkuSpec;if(!a.title)return this.alert("\u8bf7\u586b\u5199\u6807\u9898\uff01");if(0==i.data.spuSpec.length)return this.alert("\u8bf7\u586b\u5199\u5957\u9910\u5185\u5bb9\uff01");if(!a.cover)return this.alert("\u8bf7\u9009\u62e9\u5c01\u9762\u56fe\uff01");if(0==a.slide.length)return this.alert("\u8bf7\u9009\u62e9\u8f6e\u64ad\u56fe\uff01");a.spuSpec=JSON.stringify(l),a.skuSpec=JSON.stringify(d),a.deletedSkuSpec=JSON.stringify(r),a.detail=JSON.stringify(c),d.sort(function(e,i){return e.price-i.price}),a.price=d[0].price,a.draft="",a.status=1;var n;"undefined"==typeof t?n="roomvoucher_create":(a.id=t,n="roomvoucher_update"),i.request().all([{name:n,params:a}],function(){i.to("/roomvoucher/list")})},"draft<click>":function(e){e.preventDefault();var i=this,t=i.data.id,c=i.data.status||2,l={},d=s("#spu-create-form").serializeJSON({useIntKeysAsArrayIndex:!0}),r=i._getEditorContent();1==c?l=i.data:(l.status=c,d.detail=r,a.mix(l,d)),l.draft=JSON.stringify(l);var n;"undefined"==typeof t?n="roomvoucher_create":(l.id=t,n="roomvoucher_update"),i.request().all([{name:n,params:l}],function(e,t){i.alert("\u8349\u7a3f\u4fdd\u5b58\u6210\u529f\uff01"),i.data.id=t.get("data").id})},"loaddraft<click>":function(e){e.preventDefault();var i=this.data;this.data=a.mix(i,JSON.parse(i.draft)),this.data.hasDraft=!1,this.setView(),this._setEditorContent(this.data),this.alert("\u5df2\u7528\u8349\u7a3f\u5185\u5bb9\u8986\u76d6\u5f53\u524d\u5185\u5bb9\uff01")},"canceldraft<click>":function(e){e.preventDefault(),this.data.hasDraft=!1,this.setView()}})});