/**
 * Skylake
 *
 * Version   →  6.0.0
 * Github    →  https://github.com/ariiiman/skylake
 * License   →  http://opensource.org/licenses/MIT
 * Author    →  Copyright © 2018 Aristide Benoist
 * Website   →  www.aristidebenoist.com
 * Date      →  Jan 7, 2018
 */
var S={};module.exports=S,S.Merom=function(t){S.BindMaker(this,["getRaf","loop","updSvg","updLine","updProp"]),this.v=this.varsInit(t)},S.Merom.prototype={varsInit:function(t){var e={el:S.Selector.el(t.el),e:{value:t.e||"linear"},d:{origin:t.d||0,curr:0},delay:t.delay||0,cb:t.cb||!1,cbDelay:t.cbDelay||0,reverse:t.reverse||!1,round:t.round,progress:0,time:{elapsed:0}};e.elL=e.el.length,S.Has(t,"update")?e.update=function(){t.update(e)}:S.Has(t,"svg")?e.update=this.updSvg:S.Has(t,"line")?e.update=this.updLine:e.update=this.updProp;var i=t.p||!1,r=t.svg||!1,s=t.line||!1;if(i){e.prop={},e.propPos=[];var n=Object.keys(i);e.propL=n.length;for(var o=0;o<e.propL;o++){var a=n[o];e.prop[o]={name:a,origin:{start:i[a][0],end:i[a][1]},curr:i[a][0],start:i[a][0],end:i[a][1],unit:i[a][2]||"%"},e.propPos[a.charAt(0)]=o}}else if(r)e.svg={type:r.type,attr:"polygon"===r.type?"points":"d",end:r.end,originArr:{},arr:{},val:[]},e.svg.start=r.start||e.el[0].getAttribute(e.svg.attr),e.svg.curr=e.svg.start,e.svg.originArr.start=this.svgSplit(e.svg.start),e.svg.originArr.end=this.svgSplit(e.svg.end),e.svg.arr.start=e.svg.originArr.start,e.svg.arr.end=e.svg.originArr.end,e.svg.arrL=e.svg.arr.start.length;else if(s){e.line={elWL:s.elWithLength,dashed:s.dashed,coeff:{start:void 0!==s.start?(100-s.start)/100:1,end:void 0!==s.end?(100-s.end)/100:0},shapeL:[],cb:[],origin:{start:[],end:[]}};for(o=0;o<e.elL;o++){e.line.shapeL[o]=d(e.el[o]),e.line.cb[o]=o===e.elL-1&&e.cb;var h;if(e.line.dashed){for(var u=0,c=dashed.split(/[\s,]/),l=c.length,v=0;v<l;v++)u+=parseFloat(c[v])||0;var f="",p=Math.ceil(e.line.shapeL[o]/u);for(v=0;v<p;v++)f+=dashed+" ";h=f+"0 "+e.line.shapeL[o]}else h=e.line.shapeL[o];e.el[o].style.strokeDasharray=h,e.line.origin.start[o]=e.line.coeff.start*e.line.shapeL[o],e.line.origin.end[o]=e.line.coeff.end*e.line.shapeL[o]}e.line.curr=e.line.origin.start.slice(0);function d(t){if("circle"===t.tagName){return 2*t.getAttribute("r")*Math.PI}if("line"===t.tagName){var i=t.getAttribute("x1"),r=t.getAttribute("x2"),s=t.getAttribute("y1"),n=t.getAttribute("y2");return Math.sqrt((r-=i)*r+(n-=s)*n)}return(t=e.line.elWL||t).getTotalLength()}}return e},play:function(t){this.pause(),this.varsUpd(t),setTimeout(this.getRaf,this.v.delay)},pause:function(){cancelAnimationFrame(this.raf),this.needEnd=!0},varsUpd:function(t){var e=t||{},i=S.Has(e,"reverse")&&e.reverse?"start":"end";if(S.Has(this.v,"prop"))for(var r=0;r<this.v.propL;r++)this.v.prop[r].end=this.v.prop[r].origin[i],this.v.prop[r].start=this.v.prop[r].curr,S.Has(e,"p")&&S.Has(e.p,this.v.prop[r].name)&&(S.Has(e.p[this.v.prop[r].name],"newEnd")&&(this.v.prop[r].end=e.p[this.v.prop[r].name].newEnd),S.Has(e.p[this.v.prop[r].name],"newStart")&&(this.v.prop[r].start=e.p[this.v.prop[r].name].newStart));else S.Has(this.v,"svg")?(S.Has(e,"svg")&&S.Has(e.svg,"start")?this.v.svg.arr.start=e.svg.start:this.v.svg.arr.start=this.svgSplit(this.v.svg.curr),S.Has(e,"svg")&&S.Has(e.svg,"end")?this.v.svg.arr.end=e.svg.end:this.v.svg.arr.end=this.v.svg.originArr[i]):S.Has(this.v,"line")&&(this.v.line.end=this.v.line.origin[i].slice(0),this.v.line.start=this.v.line.curr.slice(0));this.v.d.curr=S.Has(e,"d")?e.d:this.v.d.origin-this.v.d.curr+this.v.time.elapsed,this.v.e.value=e.e||this.v.e.value,this.v.e.calc=S.Is.string(this.v.e.value)?S.EasePack[this.v.e.value]:S.EaseCSS(this.v.e.value[0],this.v.e.value[1],this.v.e.value[2],this.v.e.value[3]),this.v.delay=S.Has(e,"delay")?e.delay:this.v.delay,this.v.cbDelay=S.Has(e,"cbDelay")?e.cbDelay:this.v.cbDelay,this.v.cb=S.Has(e,"cb")?e.cb:this.v.cb},getRaf:function(){this.v.time.start=0,this.raf=requestAnimationFrame(this.loop)},loop:function(t){this.v.time.start||(this.v.time.start=t),this.v.time.elapsed=t-this.v.time.start,this.v.progress=this.v.d.curr>0?this.v.e.calc(Math.min(this.v.time.elapsed/this.v.d.curr,1)):1,this.v.update(),this.v.progress<1?this.raf=requestAnimationFrame(this.loop):this.needEnd&&(this.needEnd=!1,this.v.update(),this.v.cb&&setTimeout(this.v.cb,this.v.cbDelay))},updProp:function(){for(var t=0;t<this.v.propL;t++)this.v.prop[t].curr=this.lerp(this.v.prop[t].start,this.v.prop[t].end);var e=S.Has(this.v.propPos,"x")?this.v.prop[this.v.propPos.x].curr+this.v.prop[this.v.propPos.x].unit:0,i=S.Has(this.v.propPos,"y")?this.v.prop[this.v.propPos.y].curr+this.v.prop[this.v.propPos.y].unit:0,r=e+i===0?0:"translate3d("+e+","+i+",0)",s=S.Has(this.v.propPos,"r")?this.v.prop[this.v.propPos.r].name+"("+this.v.prop[this.v.propPos.r].curr+"deg)":0,n=S.Has(this.v.propPos,"s")?this.v.prop[this.v.propPos.s].name+"("+this.v.prop[this.v.propPos.s].curr+")":0,o=r+s+n===0?0:[r,s,n].filter(function(t){return 0!==t}).join(" "),a=S.Has(this.v.propPos,"o")?this.v.prop[this.v.propPos.o].curr:-1;for(t=0;t<this.v.elL&&void 0!==this.v.el[t];t++)0!==o&&(this.v.el[t].style.transform=o),a>=0&&(this.v.el[t].style.opacity=a)},updSvg:function(){this.v.svg.currTemp="";for(var t=0;t<this.v.svg.arrL;t++)this.v.svg.val[t]=this.isSvgLetter(this.v.svg.arr.start[t])?this.v.svg.arr.start[t]:this.lerp(+this.v.svg.arr.start[t],+this.v.svg.arr.end[t]),this.v.svg.currTemp+=this.v.svg.val[t]+" ",this.v.svg.curr=this.v.svg.currTemp.trim();for(t=0;t<this.v.elL&&void 0!==this.v.el[t];t++)this.v.el[t].setAttribute(this.v.svg.attr,this.v.svg.curr)},updLine:function(){for(var t=0;t<this.v.elL;t++){var e=this.v.el[t].style;this.v.line.curr[t]=this.lerp(this.v.line.start[t],this.v.line.end[t]),e.strokeDashoffset=this.v.line.curr[t],0===this.v.progress&&(e.opacity=1)}},lerp:function(t,e){return S.Round(S.Lerp.init(t,e,this.v.progress),this.v.round)},svgSplit:function(t){for(var e=t.split(" "),i=e.length,r=[],s=0;s<i;s++)for(var n=e[s].split(","),o=n.length,a=0;a<o;a++)r.push(+n[a]);return r},isSvgLetter:function(t){return"M"===t||"L"===t||"C"===t||"Z"===t}},S.Timeline=function(){this.arr=[],this.delay=0},S.Timeline.prototype={from:function(t){this.delay+=S.Has(t,"delay")?t.delay:0,t.delay=this.delay,this.arr.push(new S.Merom(t))},play:function(t){this.run("play",t)},pause:function(){this.run("pause")},run:function(t,e){for(var i=this.arr.length,r=e||void 0,s=0;s<i;s++)this.arr[s][t](r)}},S.BindMaker=function(t,e){for(var i=e.length,r=0;r<i;r++)t[e[r]]=t[e[r]].bind(t)};var e={s:1.70158,q:2.25,r:1.525,u:.984375,v:7.5625,w:.9375,x:2.75,y:2.625,z:.75};S.EasePack={linear:function(t){return t},Power1In:function(t){return 1-Math.cos(t*(Math.PI/2))},Power1Out:function(t){return Math.sin(t*(Math.PI/2))},Power1InOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},Power2In:function(t){return t*t},Power2Out:function(t){return t*(2-t)},Power2InOut:function(t){return t<.5?2*t*t:(4-2*t)*t-1},Power3In:function(t){return t*t*t},Power3Out:function(t){return--t*t*t+1},Power3InOut:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},Power4In:function(t){return t*t*t*t},Power4Out:function(t){return 1- --t*t*t*t},Power4InOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Power5In:function(t){return t*t*t*t*t},Power5Out:function(t){return 1+--t*t*t*t*t},Power5InOut:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},ExpoIn:function(t){return 0===t?0:Math.pow(2,10*(t-1))},ExpoOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExpoInOut:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},CircIn:function(t){return-(Math.sqrt(1-t*t)-1)},CircOut:function(t){return Math.sqrt(1-Math.pow(t-1,2))},CircInOut:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*((e.s+1)*t-e.s)},BackOut:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},BackInOut:function(t){return(t/=.5)<1?t*t*((1+(e.s*=e.r))*t-e.s)*.5:.5*((t-=2)*t*((1+(e.s*=e.r))*t+e.s)+2)},Elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},SwingFromTo:function(t){return(t/=.5)<1?t*t*((1+(e.s*=e.r))*t-e.s)*.5:.5*((t-=2)*t*((1+(e.s*=e.r))*t+e.s)+2)},SwingFrom:function(t){return t*t*((e.s+1)*t-e.s)},SwingTo:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},Bounce:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BouncePast:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?2-(e.v*(t-=1.5/e.x)*t+e.z):t<2.5/e.x?2-(e.v*(t-=e.q/e.x)*t+e.w):2-(e.v*(t-=e.y/e.x)*t+e.u)}};var ni=4,nms=.001,sp=1e-7,smi=10,ksts=11,kSSS=1/(ksts-1);function A(t,e){return 1-3*e+3*t}function B(t,e){return 3*e-6*t}function C(t){return 3*t}function calcBezier(t,e,i){return((A(e,i)*t+B(e,i))*t+C(e))*t}function getS(t,e,i){return 3*A(e,i)*t*t+2*B(e,i)*t+C(e)}function binarySubdivide(t,e,i,r,s){var n,o,a=0;do{(n=calcBezier(o=e+(i-e)/2,r,s)-t)>0?i=o:e=o}while(Math.abs(n)>sp&&++a<smi);return o}function nRI(t,e,i,r){for(var s=0;s<ni;++s){var n=getS(e,i,r);if(0===n)return e;e-=(calcBezier(e,i,r)-t)/n}return e}S.EaseCSS=function(t,e,i,r){var s=new Float32Array(ksts);if(t!==e||i!==r)for(var n=0;n<ksts;++n)s[n]=calcBezier(n*kSSS,t,i);return function(n){return t===e&&i===r?n:0===n?0:1===n?1:calcBezier(function(e){for(var r=0,n=ksts-1,o=1;o!==n&&s[o]<=e;++o)r+=kSSS;var a=r+(e-s[--o])/(s[o+1]-s[o])*kSSS;return(r=getS(a,t,i))>=nms?nRI(e,a,t,i):0===r?a:binarySubdivide(e,r,r+kSSS,t,i)}(n),e,r)}},S.Has=function(t,e){return!!t&&hasOwnProperty.call(t,e)},S.Is={string:function(t){return"string"==typeof t},object:function(t){return t===Object(t)},array:function(t){return t.constructor===Array}},S.Lerp={init:function(t,e,i){return t+(e-t)*i},extend:function(t,e,i,r,s){return r+(s-r)/(i-e)*(t-1)}},S.Round=function(t,e){e=void 0!==e?Math.pow(10,e):1e3;return Math.round(t*e)/e},S.Sniffer={uA:navigator.userAgent.toLowerCase(),get isMobileIE(){return/iemobile/i.test(this.uA)},get isMobileOpera(){return/opera mini/i.test(this.uA)},get isIOS(){return/iphone|ipad|ipod/i.test(this.uA)},get isBlackberry(){return/blackberry/i.test(this.uA)},get isMobileAndroid(){return/android.*mobile/.test(this.uA)},get isAndroid(){return this.isMobileAndroid||!this.isMobileAndroid&&/android/i.test(this.uA)},get isFirefox(){return this.uA.indexOf("firefox")>-1},get safari(){return this.uA.match(/version\/[\d\.]+.*safari/)},get isSafari(){return!!this.safari&&!this.isAndroid},get isSafariOlderThan8(){var t=8;if(this.isSafari){var e=this.safari[0].match(/version\/\d{1,2}/);t=+e[0].split("/")[1]}return t<8},get isIEolderThan11(){return this.uA.indexOf("msie")>-1},get isIE11(){return navigator.appVersion.indexOf("Trident/")>0},get isIE(){return this.isIEolderThan11||this.isIE11},get isMac(){return navigator.platform.toLowerCase().indexOf("mac")>-1},get isMobile(){return this.isMobileAndroid||this.isBlackberry||this.isIOS||this.isMobileOpera||this.isMobileIE},get isTouch(){return"ontouchstart"in window}},S.Throttle=function(t){this.delay=t.delay,this.cb=t.callback,this.onlyAtEnd=t.onlyAtEnd,this.last,this.timer},S.Throttle.prototype={init:function(){var t=this,e=!0,i=Date.now();this.last&&i<this.last+this.delay||e?(e=!1,clearTimeout(this.timer),this.timer=setTimeout(function(){t.last=i,t.cb()},this.delay)):(this.last=i,this.onlyAtEnd||(e=!1,this.cb()))}},S.Geb={parent:function(t){return t||document},id:function(t,e){return this.parent(e).getElementById(t)},class:function(t,e){return this.parent(e).getElementsByClassName(t)},tag:function(t,e){return this.parent(e).getElementsByTagName(t)}},S.Dom={html:document.documentElement,body:document.body},S.Selector={el:function(t){var e=[];if(S.Is.string(t)){var i=t.substring(1);"#"===t.charAt(0)?e[0]=S.Geb.id(i):e=S.Geb.class(i)}else e[0]=t;return e},type:function(t){return"#"===t.charAt(0)?"id":"class"},name:function(t){return t.substring(1)}},S.Index={index:function(t,e){for(var i=e.length,r=0;r<i;r++)if(t===e[r])return r;return-1},list:function(t){var e=t.parentNode.children;return this.index(t,e)},class:function(t,e){var i=S.Geb.class(e);return this.index(t,i)}},S.MM=function(t){this.el=S.Selector.el(t.element)[0]||document,this.cb=t.callback,this.iM=S.Sniffer.isMobile,this.tick=!1,S.BindMaker(this,["getRaf","run"])},S.MM.prototype={on:function(){this.listener("add")},off:function(){this.listener("remove")},listener:function(t){var e=this.iM?"touch":"mouse";S.Listen(this.el,t,e+"move",this.getRaf)},getRaf:function(t){this.e=t,this.tick||(this.raf=requestAnimationFrame(this.run),this.tick=!0)},run:function(){var t=this.iM?this.e.changedTouches[0]:this.e;this.cb(t.pageX,t.pageY,this.e),this.tick=!1}},S.RO=function(t){this.cb=t.callback,this.iM=S.Sniffer.isMobile,this.tick=!1,S.BindMaker(this,["getThrottle","getRaf","run"]),this.throttle=new S.Throttle({callback:this.getRaf,delay:t.throttle.delay,onlyAtEnd:t.throttle.onlyAtEnd})},S.RO.prototype={on:function(){this.listener("add")},off:function(){this.listener("remove")},listener:function(t){this.iM?S.Listen(window,t,"orientationchange",this.getThrottle):S.Listen(window,t,"resize",this.getThrottle)},getThrottle:function(t){this.e=t,this.throttle.init()},getRaf:function(){this.tick||(this.raf=requestAnimationFrame(this.run),this.tick=!0)},run:function(){this.cb(this.e),this.tick=!1}},S.Scroll=function(t){this.cb=t,this.tick=!1,S.BindMaker(this,["getRaf","run"])},S.Scroll.prototype={on:function(){this.startScrollY=pageYOffset,this.listener("add")},off:function(){this.listener("remove")},listener:function(t){S.Listen(window,t,"scroll",this.getRaf)},getRaf:function(t){this.e=t,this.tick||(this.raf=requestAnimationFrame(this.run),this.tick=!0)},run:function(){var t=pageYOffset,e=-(t-this.startScrollY);this.startScrollY=t,this.cb(t,e,this.e),this.tick=!1}},S.WTDisable={prevent:function(t){t.preventDefault()},listener:function(t){var e;if(S.Sniffer.isMobile){var i="add"===t?"none":"";S.Dom.body.style.touchAction=i,e="touchmove"}else e="mouseWheel";S.Listen(document,t,e,this.prevent)},on:function(){this.listener("add")},off:function(){this.listener("remove")}},S.WT=function(t){this.cb=t,this.iM=S.Sniffer.isMobile,this.tick=!1,S.BindMaker(this,["touchStart","getRaf","run"])},S.WT.prototype={on:function(){this.listener("add")},off:function(){this.listener("remove")},listener:function(t){var e=document;this.iM?(S.Listen(e,t,"touchstart",this.touchStart),S.Listen(e,t,"touchmove",this.getRaf)):S.Listen(e,t,"mouseWheel",this.getRaf)},getRaf:function(t){this.e=t,this.e.preventDefault(),this.tick||(this.raf=requestAnimationFrame(this.run),this.tick=!0)},run:function(){var t=this.e.type;"wheel"===t?this.onWheel():"mousewheel"===t?this.onMouseWheel():"touchmove"===t&&this.touchMove()},onWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY||-1*this.e.deltaY,S.Sniffer.isFirefox&&1===this.e.deltaMode&&(this.delta*=40),this.getCb()},onMouseWheel:function(){this.type="scroll",this.delta=this.e.wheelDeltaY?this.e.wheelDeltaY:this.e.wheelDelta,this.getCb()},touchStart:function(t){this.start=t.targetTouches[0].pageY},touchMove:function(){this.type="touch",this.delta=this.e.targetTouches[0].pageY-this.start,this.getCb()},getCb:function(){this.cb(this.delta,this.type,this.e),this.tick=!1}},S.Listen=function(t,e,i,r){var s,n=document,o=(t=S.Selector.el(t)).length;s="mouseWheel"===i?"onwheel"in n?"wheel":void 0!==n.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===i?S.Sniffer.isFirefox?"blur":"focusout":i;for(var a=0;a<o;a++)t[a][e+"EventListener"](s,r)},S.ScrollToTop=function(t){var e=pageYOffset,i={dest:0,d:function(){var i=S.Lerp.init(300,1500,e/t.totalH);return 0===e?0:i}(),e:e<=2500?"Power"+Math.ceil(e/500)+"InOut":"ExpoInOut",cb:t.cb};S.ScrollTo(i)},S.ScrollTo=function(t){var e=document,i=e.scrollingElement?e.scrollingElement:S.Dom.body,r=S.Sniffer.isFirefox||S.Sniffer.isIE?e.documentElement:i,s=pageYOffset,n=t.dest,o=1e3,a=new S.Merom({d:t.d,e:t.e,update:function(t){r.scrollTop=Math.round(S.Lerp.init(s,n,t.progress)*o)/o},cb:h});s===n?h():(S.WTDisable.on(),a.play());function h(){S.WTDisable.off(),t.cb&&t.cb()}},S.ScrollZero=function(){window.scrollTo(0,0)},S.TopWhenRefresh=function(){window.onbeforeunload=function(){window.scrollTo(0,0)}};var perf=performance;S.Win={get w(){return innerWidth},get h(){return innerHeight},get path(){return location.pathname},get hostname(){return location.hostname},get href(){return location.href}};