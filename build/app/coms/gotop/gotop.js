define("app/coms/gotop/gotop",["magix","jquery"],function(o,i,t){var n=o("magix"),c=o("jquery");t.exports=n.View.extend({tmpl:{html:'<div class="gotop quanfont icon-fanhuidingbu" mx-click="gotop()" title="\u8fd4\u56de\u9876\u90e8"></div>',subs:[]},ctor:function(o){this.opt=o},render:function(){var o=this;o.setView().then(function(){o.scroll()})},scroll:function(){var o=this,i=c("#"+o.id),t=c(window).height(),n=c(window).scrollTop(),l=i.find(".gotop");n>t?l.show():l.hide()},"gotop<click>":function(){c("body,html").animate({scrollTop:0},250)},"$win<scroll>":function(){this.scroll()}})});