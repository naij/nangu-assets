define("app/views/pages/product/publish",["magix","jquery","underscore","app/coms/editor/editor","app/mixins/dialog","app/util/index"],function(i,e,t){var a=i("magix"),l=i("jquery"),s=(i("underscore"),i("app/coms/editor/editor")),c=i("app/mixins/dialog"),n=i("app/util/index");t.exports=a.View.extend({tmpl:'<div class="page-header clearfix"><div class="title-bar"><h2 class="title">\u53d1\u5e03\u5546\u54c1</h2></div></div><div class="page-body product-publish"><form id="product-create-form"><ul class="union-form"><li class="field"><p class="field-label2">\u6807\u9898</p><input type="text" class="input" name="title"></li><li class="field"><p class="field-label2">\u526f\u6807\u9898</p><input type="text" class="input" name="subTitle"></li><li class="field"><p class="field-label2">\u5c01\u9762\u56fe</p><div class="cover clearfix">{{^if(cover)}}<div class="img-placeholder" mx-click="pickCover()"><span class="iconfont iconhao"></span><div>\u6dfb\u52a0\u5c01\u9762</div></div>{{/if}} {{#if(cover)}}<div class="img-container"><div class="mask" mx-click="pickCover()">\u91cd\u65b0\u9009\u62e9\u56fe\u7247</div><img src="{{cover}}" class="img"> <input type="hidden" name="cover" value="{{cover}}"></div>{{/if}}</div></li><li class="field"><p class="field-label2">\u8f6e\u64ad\u56fe</p><div class="slide clearfix">{{#if(slide.length > 0)}} {{#for(item in slide)}}<div class="img-container"><div class="mask" mx-click="pickSlide({index:{{__INDEX__}}})">\u91cd\u65b0\u9009\u62e9\u56fe\u7247</div><img src="{{item}}" class="img"> <input type="hidden" name="slide[{{__INDEX__}}]" value="{{item}}"></div>{{/for}} {{/if}} {{^if(slide.length >= 2)}}<div class="img-placeholder" mx-click="pickSlide()"><span class="iconfont iconhao"></span><div>\u6dfb\u52a0\u8f6e\u64ad\u56fe</div></div>{{/if}}</div></li><li class="field"><p class="field-label2">\u6240\u5c5e\u5546\u6237</p>{{^if(businessId)}}<div class="business-placeholder" mx-click="pickBusiness()"><div>\u6dfb\u52a0\u6240\u5c5e\u5546\u6237</div></div>{{/if}} {{#if(businessId)}}<div class="business-container"><div class="mask" mx-click="pickBusiness()">\u91cd\u65b0\u9009\u62e9\u5546\u6237</div><div><span class="iconfont iconshanghu color-brand mr5"></span>{{businessName}}</div><input type="hidden" name="businessId" value="{{businessId}}"></div>{{/if}}</li><li class="field"><p class="field-label2">\u6807\u7b7e</p><div class="tag-container"><ul class="clearfix">{{#for(item in tagList)}}<li t-class:selected="item.selected" mx-click="makeTag({id:{{item.id}}})"><span>{{item.name}}</span><div class="mask"><span class="iconfont iconduigou"></span></div></li>{{/for}}</ul></div></li><li class="field"><p class="field-label2">\u5546\u54c1\u89c4\u683c</p><div class="attribute-container">{{#for(item in attributeList)}}<div class="attribute-item"><p class="field-label2">{{item.name}}</p><div><input placeholder="\u8bf7\u8f93\u5165\u81ea\u5b9a\u4e49{{item.name}}\u540d\u79f0" class="input mr10" id="J_attr_value_{{item.attributeId}}"><button class="btn btn-brand btn-large" mx-click="addAttributeValue({attributeId:{{item.attributeId}}})">+\u6dfb\u52a0</button><div class="attribute-value-container clearfix" t-if="item.attributeValueList.length>0">{{#for(subitem in item.attributeValueList)}}<div class="attribute-value-item">{{subitem.value}}<span class="iconfont iconguanbi close" mx-click="delAttributeValue({attributeId:{{item.attributeId}},index:{{subitem.index}}})"></span></div>{{/for}}</div></div></div>{{/for}}</div><div class="sku-container table-container" t-if="skuList.length>0"><table class="table"><thead><tr>{{#for(item in attributeList)}}<th class="left" width="150">{{item.name}}</th>{{/for}}<th class="left" width="150">\u4ef7\u683c</th><th class="left" width="150">\u4fc3\u9500\u4ef7\u683c</th><th class="left" width="150">\u5e93\u5b58</th></tr></thead><tbody>{{#for((index,item) in skuList)}}<tr>{{#for(subitem in item)}}<td class="left">{{#if(subitem.input)}} <input placeholder="{{subitem.fieldLabel}}" type="number" class="input input-narrow" value="{{subitem.fieldValue}}" mx-change="skuFieldChange({index:{{index}},field:\'{{subitem.fieldName}}\'})"> {{/if(subitem.input)}} {{^if(subitem.input)}} {{subitem.value}} {{/if(subitem.input)}}</td>{{/for}}</tr>{{/for}}</tbody></table></div></li>{{#for(item in detailfieldList)}} {{#if(item.fieldType == 0)}}<li class="field"><p class="field-label2">{{item.fieldLabel}}</p><div id="{{item.fieldName}}-editor"></div></li>{{/if}} {{#if(item.fieldType == 1)}}<li class="field"><p class="field-label2">\u5730\u7406\u4f4d\u7f6e\u5730\u5740</p><input type="text" class="input" name="location" value="{{location}}"></li><li class="field"><p class="field-label2">\u5730\u7406\u4f4d\u7f6e\u7ecf\u7eac\u5ea6</p><input type="text" class="input" name="locationPointer" value="{{locationPointer}}"></li>{{/if}} {{/for}}<li class="field"><p class="field-label2">\u63a8\u8350\u8bbe\u7f6e</p><label class="mr10" mx-click="switchRecommandStatus({value:0})"><input name="recommandStatus" class="mr10" checked="{{recommandStatus==0}}" type="radio" value="0"/><span>\u4e0d\u8bbe\u7f6e\u6210\u63a8\u8350</span></label><label mx-click="switchRecommandStatus({value:1})"><input name="recommandStatus" class="mr10" checked="{{recommandStatus==1}}" type="radio" value="1"/><span>\u8bbe\u7f6e\u6210\u63a8\u8350</span></label></li><li class="field"><p class="field-label2">\u51fa\u7968\u8bbe\u7f6e</p><label class="mr10" mx-click="switchTicketGenType({value:0})"><input name="ticketGenType" class="mr10" checked="{{ticketGenType==0}}" type="radio" value="0"/><span>\u81ea\u52a8\u51fa\u7968</span></label><label mx-click="switchTicketGenType({value:1})"><input name="ticketGenType" class="mr10" checked="{{ticketGenType==1}}" type="radio" value="1"/><span>\u624b\u52a8\u51fa\u7968</span></label></li><li class="field"><a href="#" class="btn btn-brand btn-large mr10" mx-click="submit()">\u53d1\u5e03</a></li></ul></form></div>',mixins:[c],render:function(){var i=this,e=i.param("categoryId");i.request().all([{name:"attribute_list",params:{categoryId:e,type:0}},{name:"category_tag_relation_list",params:{categoryId:e}},{name:"detailfield_list",params:{categoryId:e}}],function(e,t,a,l){i.data={attributeList:t.get("data").list,tagList:a.get("data").list,detailfieldList:l.get("data").list,slide:[],recommandStatus:0,ticketGenType:0},i.setView().then(function(){i._rendered()})})},_rendered:function(){var i=this,e=i.data.detailfieldList;l.each(e,function(e,t){if(0==t.fieldType){var a=new s("#"+t.fieldName+"-editor");i._customInsertImg(a),a.create(),i[t.fieldName+"Editor"]=a}})},_customInsertImg:function(i){var e=this;i.customConfig.onInsertImg=function(i){e.mxDialog("app/views/pages/common/img_picker",{width:700,limit:1,callback:function(e){i(e[0].picPath)}})}},_getEditorContent:function(){var i=this,e={},t=i.data.detailfieldList;return l.each(t,function(t,a){if(0==a.fieldType){var l=i[a.fieldName+"Editor"];e[a.fieldName]=l.txt.html().replace(/[\r\n]/g,"").replace(/<style(([\s\S])*?)<\/style>/g,"").replace(/\<img/gi,'<img style="width:100%;height:auto" ').replace(/<p>/gi,'<p class="p_class">')}}),e},_parseSku:function(){var i=this.data.attributeList,e=[];l.each(i,function(i,t){e.push(t.attributeValueList)});var t=n.calcDescartes(e),a=this.data.skuList;l.each(t,function(i,e){var t=JSON.stringify(e);t=t.substr(0,t.length-1),e.push({fieldName:"price",fieldLabel:"\u4ef7\u683c",fieldValue:"",input:!0},{fieldName:"promotionPrice",fieldLabel:"\u4fc3\u9500\u4ef7\u683c",fieldValue:"",input:!0},{fieldName:"stock",fieldLabel:"\u5e93\u5b58",fieldValue:"10000",input:!0}),l.each(a,function(i,a){var l=JSON.stringify(a);a.input||-1!=l.indexOf(t)&&(e[e.length-3].fieldValue=a[a.length-3].fieldValue,e[e.length-2].fieldValue=a[a.length-2].fieldValue,e[e.length-1].fieldValue=a[a.length-1].fieldValue)})}),this.data.skuList=t},_checkField:function(i){var e=this,t=[{fieldName:"title",msg:"\u6807\u9898\u4e3a\u5fc5\u586b\u9879"},{fieldName:"cover",msg:"\u8bf7\u9009\u62e9\u5c01\u9762\u56fe"},{fieldName:"slide",msg:"\u8bf7\u9009\u62e9\u8f6e\u64ad\u56fe"},{fieldName:"businessId",msg:"\u8bf7\u9009\u62e9\u6240\u5c5e\u5546\u6237"}],a=!0;return t.some(function(t){return i[t.fieldName]?void 0:(a=!1,e.alert(t.msg),!1)}),a},"makeTag<click>":function(i){var e=this,t=e.data.tagList,a=i.params.id;t.forEach(function(i){i.id==a&&(i.selected=i.selected?!1:!0)}),e.data.tagList=t,e.setView()},"addAttributeValue<click>":function(i){i.preventDefault();var e,t=this,a=i.params.attributeId,s=t.data.attributeList,c=l("#J_attr_value_"+a).val();if(c){l.each(s,function(i,t){t.attributeValueList||(t.attributeValueList=[]),t.attributeId==a&&(e=t)});var n=e.attributeValueList;n.push({attributeId:a,value:c}),l.each(n,function(i,e){e.index=i}),e.attributeValueList=n,t._parseSku(),t.setView()}},"delAttributeValue<click>":function(i){i.preventDefault();var e,t=this,a=i.params.index,s=i.params.attributeId,c=t.data.attributeList;l.each(c,function(i,t){t.attributeId==s&&(e=t)});var n=e.attributeValueList;n.splice(a,1),l.each(n,function(i,e){e.index=i}),t._parseSku(),t.setView()},"skuFieldChange<change>":function(i){var e=this,t=i.params.index,a=i.params.field,s=l(i.eventTarget),c=e.data.skuList[t];l.each(c,function(i,e){e.fieldName==a&&(e.fieldValue=s.val())})},"pickCover<click>":function(i){i.preventDefault();var e=this;e.mxDialog("app/views/pages/common/img_picker",{width:700,limit:1,callback:function(i){e.data.cover=i[0].picPath,e.setView()}})},"pickSlide<click>":function(i){i.preventDefault();var e=this,t=i.params.index;e.mxDialog("app/views/pages/common/img_picker",{width:700,limit:1,callback:function(i){"undefined"!=typeof t?e.data.slide.splice(t,1,i[0].picPath):e.data.slide.push(i[0].picPath),e.setView()}})},"pickBusiness<click>":function(i){i.preventDefault();var e=this;e.mxDialog("app/views/pages/common/business_picker",{width:700,callback:function(i){e.data.businessId=i.id,e.data.businessName=i.name,e.setView()}})},"switchRecommandStatus<click>":function(i){this.data.recommandStatus=i.params.value,this.setView()},"switchTicketGenType<click>":function(i){this.data.ticketGenType=i.params.value,this.setView()},"submit<click>":function(i){i.preventDefault();var e=this,t=e.param("categoryId"),a=e.data.attributeList,s=e.data.skuList,c=e.data.tagList,n=l("#product-create-form").serializeJSON({useIntKeysAsArrayIndex:!0}),d=e._getEditorContent();if(e._checkField(n)){n.location&&l.extend(d,{location:n.location,locationPointer:n.locationPointer});var r=[];c.forEach(function(i){i.selected&&r.push({id:i.id,name:i.name})});var u=[],o=[];s.forEach(function(i){i.forEach(function(i){"price"==i.fieldName&&u.push(i.fieldValue),"promotionPrice"==i.fieldName&&o.push(i.fieldValue)})}),u.sort(function(i,e){return i-e}),o.sort(function(i,e){return i-e});var p=u[0],m=o[0];l.extend(n,{price:p,promotionPrice:m,categoryId:t,attributeList:a,skuList:s,tagList:r,detail:d}),e.request().all([{name:"product_create",params:n}],function(){e.to("/product/successful?type=publish")})}}})});