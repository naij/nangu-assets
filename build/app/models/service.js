define("app/models/service",["magix","jquery"],function(e,o,t){var r=e("magix"),a=e("jquery"),n=r.Service.extend(function(e,o){var t={method:"GET",dataType:"json"},n=e.get("params")||e.get("formParams")||e.get("urlParams")||{},p=e.get("url"),s=e.get("method")||t.method,d=e.get("dataType")||t.dataType,c=[];if("POST"==s.toUpperCase()&&(n._csrf=r.config("csrf")),a.extend(n,{t:+new Date}),"object"==typeof n){for(var i in n)n.hasOwnProperty(i)&&c.push("object"==typeof n[i]?i+"="+encodeURIComponent(JSON.stringify(n[i])):i+"="+encodeURIComponent(n[i]));n=c.join("&")}a.ajax({url:r.toUrl(p),dataType:d,data:n,type:s,complete:function(t,r){if("error"===r)console.log("error....");else{var n=a.parseJSON(t.responseText);n.code&&200===n.code?(e.set("data",n.data),o()):console.log("error....")}}})});t.exports=n});