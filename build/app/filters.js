define("app/filters",["moment","app/util/index"],function(t,n,a){var e=t("moment"),o=t("app/util/index");a.exports={formatDate:function(t){return e(t).format("YYYY-MM-DD HH:mm:ss")},adaptImg100:function(t){return this.adaptImg(t,window.devicePixelRatio>1?"200x200":"100x100")},adaptImg220:function(t){return this.adaptImg(t,window.devicePixelRatio>1?"400x400":"220x220")},formatNumber:function(t){return o.formatNumber(t).join(".")},toInt:function(t){return o.formatNumber(t)[0]},toFloat:function(t){return o.formatFloat(parseFloat(t))},toMoneyYuan:function(t){return t?o.formatFloat(parseFloat(t))+'<span class="yuan">\u5143</span>':'<span class="integer">--</span>'},toMoneySymbol:function(t){return t?'<span class="yuan">\uffe5</span>'+o.formatFloat(parseFloat(t)):'<span class="integer">--</span>'},toPercentage:function(t){return t=parseFloat(t),0===t||t?o.formatFloat(t)+'<span class="percent">%</span>':'<span class="integer">--</span>'}}});