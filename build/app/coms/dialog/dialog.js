define("app/coms/dialog/dialog",["magix","jquery"],function(i,o,a){var d=i("magix"),e=i("jquery"),n=10040,t=[],s=function(i){for(var o,a=t.length-1;a>=0;a--)if(o=t[a],o.id==i.id){t.splice(a,1);break}};a.exports=d.View.extend({tmpl:{html:'<div class="dialog-backdrop dialog-anim-mask" style="display: block;z-index:{{zIndex-1}}" id="dialog_mask_{{viewId}}"></div><div class="dialog-scroll-cnt" style="z-index:{{zIndex}}"><div class="dialog dialog-anim-body" id="dialog_body_{{viewId}}" style="left:{{left}}px;top:{{top}}px;width:{{width}}px"><input id="focus_{{viewId}}" class="dialog-focus"/><button type="button" mx-click="close()" class="dialog-close {{ closable ? \'\' : \'none\' }}"><span class="iconfont iconguanbi"></span></button><div class="dialog-content dialog-content-ext" id="cnt_{{viewId}}"><div class="loading loading-ext"><span></span></div></div></div></div>',subs:[]},init:function(i){var o=this;o.on("destroy",function(){s(o),n-=2,e("#"+o.id).trigger("close").remove()}),d.has(i,"closable")||(i.closable=!0),o.data=i,o.setView(),n+=2,t.push(o)},render:function(){var i=this;i.data.zIndex=n,i.data.viewId=i.id,i.setView(),e("#"+i.id).show(),e("#focus_"+i.id).focus(),i.owner.mountVframe("cnt_"+i.id,i.data.view,i.data),setTimeout(i.wrapAsync(function(){e("#dialog_body_"+i.id).removeClass("dialog-anim-body"),e("#dialog_mask_"+i.id).removeClass("dialog-anim-mask")}),300)},fireLeave:function(i){var o=d.Vframe.get("cnt_"+this.id);o.invoke("fire",["unload",i])},"close<click>":function(){e("#"+this.id).trigger("dlg_close")},"$doc<keyup>":function(i){if(27==i.keyCode){var o=t[t.length-1];if(o==this&&o.updater.get("closable")){var a=e("#"+o.id);a.trigger("dlg_close")}}}},{show:function(i,o){var a=d.guid("dlg_");e(document.body).append('<div id="'+a+'" style="display:none" />');var n,t=i.owner.mountVframe(a,"app/coms/dialog/dialog",o),s=e("#"+a);return s.on("dlg_close",function(){if(!s.data("closing")&&!n){var o=function(){s.data("closing",1),e("#dialog_body_"+a).addClass("dialog-anim-body-out"),e("#dialog_mask_"+a).addClass("dialog-anim-mask-out"),setTimeout(function(){i.owner.unmountVframe(a)},200)},d={prevent:function(){n=1},resolve:function(){d.p=1,n=0,o()},reject:function(){d.p=1,n=0}};t.invoke("fireLeave",d),n||d.p||o()}})}})});