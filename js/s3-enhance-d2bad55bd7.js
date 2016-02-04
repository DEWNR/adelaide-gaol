window.Modernizr=function(e,t,n){function r(e){y.cssText=e}function o(e,t){return r(x.join(e+";")+(t||""))}function i(e,t){return typeof e===t}function s(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var o=e[r];if(!s(o,"-")&&y[o]!==n)return"pfx"==t?o:!0}return!1}function c(e,t,r){for(var o in e){var s=t[e[o]];if(s!==n)return r===!1?e[o]:i(s,"function")?s.bind(r||t):s}return!1}function d(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+M.join(r+" ")+r).split(" ");return i(t,"string")||i(t,"undefined")?a(o,t):(o=(e+" "+k.join(r+" ")+r).split(" "),c(o,t,n))}var l,u,f,p="2.8.3",g={},h=!0,v=t.documentElement,m="modernizr",b=t.createElement(m),y=b.style,w=":)",x=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),z="Webkit Moz O ms",M=z.split(" "),k=z.toLowerCase().split(" "),C={svg:"http://www.w3.org/2000/svg"},_={},j=[],T=j.slice,$=function(e,n,r,o){var i,s,a,c,d=t.createElement("div"),l=t.body,u=l||t.createElement("body");if(parseInt(r,10))for(;r--;)a=t.createElement("div"),a.id=o?o[r]:m+(r+1),d.appendChild(a);return i=["&#173;",'<style id="s',m,'">',e,"</style>"].join(""),d.id=m,(l?d:u).innerHTML+=i,u.appendChild(d),l||(u.style.background="",u.style.overflow="hidden",c=v.style.overflow,v.style.overflow="hidden",v.appendChild(u)),s=n(d,e),l?d.parentNode.removeChild(d):(u.parentNode.removeChild(u),v.style.overflow=c),!!s},S=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return $("@media "+t+" { #"+m+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},E={}.hasOwnProperty;f=i(E,"undefined")||i(E.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(e,t){return E.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=T.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,s=t.apply(i,n.concat(T.call(arguments)));return Object(s)===s?s:i}return t.apply(e,n.concat(T.call(arguments)))};return r}),_.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:$(["@media (",x.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},_.rgba=function(){return r("background-color:rgba(150,255,150,.5)"),s(y.backgroundColor,"rgba")},_.backgroundsize=function(){return d("backgroundSize")},_.borderradius=function(){return d("borderRadius")},_.boxshadow=function(){return d("boxShadow")},_.opacity=function(){return o("opacity:.55"),/^0.55$/.test(y.opacity)},_.cssanimations=function(){return d("animationName")},_.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+x.join(n+e)).slice(0,-e.length)),s(y.backgroundImage,"gradient")},_.csstransitions=function(){return d("transition")},_.fontface=function(){var e;return $('@font-face {font-family:"font";src:url("https://")}',function(n,r){var o=t.getElementById("smodernizr"),i=o.sheet||o.styleSheet,s=i?i.cssRules&&i.cssRules[0]?i.cssRules[0].cssText:i.cssText||"":"";e=/src/i.test(s)&&0===s.indexOf(r.split(" ")[0])}),e},_.generatedcontent=function(){var e;return $(["#",m,"{font:0/0 a}#",m,':after{content:"',w,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},_.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==C.svg};for(var O in _)f(_,O)&&(u=O.toLowerCase(),g[u]=_[O](),j.push((g[u]?"":"no-")+u));return g.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&g.addTest(r,e[r]);else{if(e=e.toLowerCase(),g[e]!==n)return g;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(v.className+=" "+(t?"":"no-")+e),g[e]=t}return g},r(""),b=l=null,g._version=p,g._prefixes=x,g._domPrefixes=k,g._cssomPrefixes=M,g.mq=S,g.testProp=function(e){return a([e])},g.testAllProps=d,g.testStyles=$,v.className=v.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+j.join(" "):""),g}(this,this.document),Modernizr.addTest("boxsizing",function(){return Modernizr.testAllProps("boxSizing")&&(void 0===document.documentMode||document.documentMode>7)}),function(){"use strict";var e,t,n,r,o="body";e=!(Modernizr.backgroundsize&&Modernizr.inlinesvg&&Modernizr.generatedcontent&&Modernizr.boxsizing),t=!(Modernizr.rgba&&Modernizr.opacity&&Modernizr.cssgradients&&Modernizr.fontface&&Modernizr.csstransitions),n='<div class="box  box--small  color-scheme--danger"><div class="wrapper"><strong class="color-scheme__highlight">Warning!</strong> The browser you&rsquo;re using is not able display this site correctly. <a href="http://whatbrowser.org/">Upgrade your browser</a> for a better experience.</div></div>',r='<div class="box  box--small  color-scheme--warning"><div class="wrapper"><strong class="color-scheme__highlight">Warning!</strong> The browser you&rsquo;re using does not support all the features of this site. <a href="http://whatbrowser.org/">Upgrade your browser</a> for a better experience.</div></div>',e?$(o).prepend(n):t&&$(o).prepend(r)}(),function(){"use strict";function e(e){var t=location.pathname,n=location.search,r=location.hash;return n.indexOf("?")>=0?0===n.indexOf("?responsive="+!e)?n=n.replace("?responsive="+!e,"?responsive="+e):n.indexOf("&responsive="+!e)>0?n=n.replace("&responsive="+!e,"&responsive="+e):n+="&responsive="+e:n="?responsive="+e,t+n+r}var t,n=".js-site-footer";Modernizr.touch&&(t="false"!==cookieManager.read("responsive")?'<div class="site-footer__switch  is-mobile"><span class="delimited  delimited--pipe"><strong>Mobile</strong></span> <span class="delimited  delimited--pipe"><a class="site-footer__link" href="'+e(!1)+'">Desktop</a></span></div>':'<div class="site-footer__switch  is-desktop"><span class="delimited  delimited--pipe"><a class="site-footer__link" href="'+e(!0)+'">Mobile</a></span> <span class="delimited  delimited--pipe"><strong>Desktop</strong></span></div>',$(n).append(t))}(),$("[data-toggle]").each(function(){"use strict";var e=$(this).attr("data-toggle"),t=null;$(this).is("[data-toggle-target]")&&(t=$(this).attr("data-toggle-target")),e.length>0&&null!==t&&$(this).on("click",function(){var n="is-"+e;return $(this).toggleClass(n),$(t).toggleClass(n),!1})});