(this["webpackJsonpqrcode.volt.link"]=this["webpackJsonpqrcode.volt.link"]||[]).push([[0],{14:function(e,t,n){e.exports={qrcodeWrapper:"Generator_qrcodeWrapper__1MUQn",qrcodeContentInput:"Generator_qrcodeContentInput__1C_pN",qrCodeSvgWrapper:"Generator_qrCodeSvgWrapper__1NpDK",downloadButton:"Generator_downloadButton__FFIYG"}},32:function(e,t,n){e.exports={app:"App_app__3hbGO"}},40:function(e,t,n){},49:function(e,t,n){var r={"./de.ftl":[53,3],"./en.ftl":[54,4]};function a(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return n.e(t[1]).then((function(){return n(a)}))}a.keys=function(){return Object.keys(r)},a.id=49,e.exports=a},52:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(2),c=n(0),o=n.n(c),s=n(31),i=n.n(s),l=(n(40),n(32)),u=n.n(l),d=n(5),j=n(18),b=n(24),f=n(11),p=n(1),O=function(e){return Object(p.jsx)(j.b,Object(d.a)(Object(d.a)({},e),{},{elems:Object(d.a)({br:Object(p.jsx)("br",{})},e.elems),children:Object(p.jsx)(o.a.Fragment,{children:e.children})}),e.id)};var h=n(6),v=n.n(h),x=n(9),g=n(14),m=n.n(g);var w=function(e){var t=e.ariaLabel,n=e.items,r=e.defaultValue,o=e.onChange,s=e.style,i=e.className,l=Object(c.useState)(),u=Object(a.a)(l,2),j=u[0],b=u[1];Object(c.useEffect)((function(){return b(r)}),[r,b]);var f=Object(c.useCallback)((function(e){var t=e.target.dataset.value;b(t),o&&o(t)}),[b,o]);return Object(p.jsx)("div",{"aria-label":t,className:"buttonRow "+(i||""),style:Object(d.a)({display:"inline-block"},s),children:n.map((function(e){var t=e.value,n=e.title,r=e.icon||null;return Object(p.jsx)("button",{className:"".concat(j===t?"choosen":""," ").concat(r?"hasIcon":""),onClick:f,"data-value":t,children:Object(p.jsxs)("span",{style:{pointerEvents:"none"},children:[r||null,Object(p.jsx)("span",{style:{verticalAlign:"middle"},children:n})]})},t)}))})},k=n(33),_=1e3,y=new(n.n(k).a)({experimental:!0,width:_,height:_,type:"svg",image:"",dotsOptions:{color:"#502379",type:"square"},backgroundOptions:{color:"#ffffff"},imageOptions:{crossOrigin:"anonymous",margin:0,imageSize:.4},margin:50,qrOptions:{errorCorrectionLevel:"M"}});console.log("qrCode",y);var C,L=(C=function(e){var t=e.getString,n=Object(c.useState)("M"),r=Object(a.a)(n,2),o=r[0],s=r[1],i=Object(c.useState)(""),l=Object(a.a)(i,2),u=l[0],d=l[1],j=Object(c.useState)(null),b=Object(a.a)(j,2),f=b[0],h=b[1],g=Object(c.useCallback)((function(e){var t=e.target.value;t.length>0&&t.length<1e3?d(t):d("")}),[d]);return Object(c.useEffect)((function(){y.update({data:u,qrOptions:{errorCorrectionLevel:o}}),""===u?h(null):y.getRawData("svg").then(function(){var e=Object(x.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:n=(n=e.sent).replace("<svg",'<svg viewBox="0 0 '.concat(_," ").concat(_,'"')),h(n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[u,o,h]),Object(p.jsxs)("div",{className:m.a.qrcodeWrapper,children:[Object(p.jsx)("h1",{children:Object(p.jsx)(O,{id:"website_title"})}),Object(p.jsx)("textarea",{className:m.a.qrcodeContentInput,placeholder:t("text_content_input_placeholder"),onChange:g}),Object(p.jsx)("h2",{children:Object(p.jsx)(O,{id:"error_correction_level_headline"})}),Object(p.jsx)(w,{onChange:s,ariaLabel:t("error_correction_level_headline"),defaultValue:o,items:[{value:"L",title:"Low ~7%"},{value:"M",title:"Medium ~15%"},{value:"Q",title:"Quartile ~25%"},{value:"H",title:"High ~30%"}]}),Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),null===f?Object(p.jsx)("p",{children:"Enter content for the QR-Code to download it."}):Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("span",{className:m.a.qrCodeSvgWrapper,dangerouslySetInnerHTML:{__html:f}}),Object(p.jsx)("h2",{children:"Download"}),Object(p.jsx)("button",{onClick:function(){y.download({name:"volt-qrcode",extension:"svg"}),window.umami.trackEvent("E: svg")},className:"green "+m.a.downloadButton,children:"SVG"}),Object(p.jsx)("button",{onClick:function(){y.download({name:"volt-qrcode",extension:"jpeg"}),window.umami.trackEvent("E: jpeg")},className:"green "+m.a.downloadButton,children:"JPEG"}),Object(p.jsx)("button",{onClick:function(){y.download({name:"volt-qrcode",extension:"png"}),window.umami.trackEvent("E: png")},className:"green "+m.a.downloadButton,children:"PNG"})]})]})},function(e){var t=o.a.useContext(f.a);return o.a.createElement(C,Object(d.a)({fluentByObject:function(e,n){if(n||(n=null),e){var a,c=t.supportedLocales||[],o=Object.keys(e).filter((function(e){return c.includes(e)})),s=Object(b.a)(t.userLocales,o,{defaultLocale:t.defaultLocale}),i=Object(r.a)(s);try{for(i.s();!(a=i.n()).done;){var l=a.value;if(e[l])return e[l]}}catch(u){i.e(u)}finally{i.f()}return n}return n},getString:function(e,n,r){return t.getString(e,n,r||" ")}},e))});var E=function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:u.a.app,children:Object(p.jsx)(L,{})}),Object(p.jsxs)("footer",{children:[Object(p.jsx)("a",{href:"mailto:thomas.rosen@volteuropa.org",children:Object(p.jsx)(O,{id:"contact"})}),"\xa0 \u2022 \xa0",Object(p.jsx)("a",{href:"https://github.com/voltbonn/qrcode.volt.link",target:"_blank",rel:"noreferrer",children:Object(p.jsx)(O,{id:"source_code"})})]})]})},q=n(35),S=(n(45),n(22)),N=n(21),G={de:"Deutsch",en:"English"},B=Object.keys(G),M="en";function I(e){return D.apply(this,arguments)}function D(){return(D=Object(x.a)(v.a.mark((function e(t){var r,a,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(49)("./"+t+".ftl");case 2:return r=e.sent,e.next=5,fetch(r.default);case 5:return a=e.sent,e.next=8,a.text();case 8:return c=e.sent,e.abrupt("return",Object(S.a)({},t,new N.b(c)));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(e){return W.apply(this,arguments)}function W(){return(W=Object(x.a)(v.a.mark((function e(t){var n,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(I));case 2:return n=e.sent,a=n.reduce((function(e,t){return Object.assign(e,t)})),e.abrupt("return",v.a.mark((function e(){var n,c,o,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=Object(r.a)(t),e.prev=1,n.s();case 3:if((c=n.n()).done){e.next=11;break}return o=c.value,(s=new N.a(o)).addResource(a[o]),e.next=9,s;case 9:e.next=3;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),n.e(e.t0);case 16:return e.prev=16,n.f(),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[1,13,16,19]])})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e){var t=e.userLocales,n=e.children,r=e.onLocaleChange,o=Object(c.useState)(function(){var e=new N.a("");return e.addResource(new N.b("")),new j.c([e])}()),s=Object(a.a)(o,2),i=s[0],l=s[1];return Object(c.useEffect)((function(){function e(){return(e=Object(x.a)(v.a.mark((function e(){var n,a,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(b.a)(t,B,{defaultLocale:M}),r&&r(n),e.next=4,F(n);case 4:a=e.sent,(c=new j.c(a())).userLocales=t,c.defaultLocale=M,c.supportedLocales=B,l(c);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t,r]),i?Object(p.jsx)(j.a,{l10n:i,children:n}):Object(p.jsx)("div",{children:"Loading texts\u2026"})}function P(){var e=Object(c.useState)(navigator.languages),t=Object(a.a)(e,2),n=t[0],o=t[1],s=Object(c.useState)(null),i=Object(a.a)(s,2),l=i[0],u=i[1];Object(c.useEffect)((function(){if(window.umami){var e=navigator.languages;if(e||Array.isArray(e)){var t,n=Object(r.a)(e);try{for(n.s();!(t=n.n()).done;){var a=t.value,c=(a=a.toLowerCase()).split("-")[0];c!==a&&window.umami.trackEvent("L: "+c),window.umami.trackEvent("L: "+a)}}catch(o){n.e(o)}finally{n.f()}}}}),[]);var d=Object(c.useCallback)((function(e){o([e.target.dataset.locale])}),[o]),j=Object(c.useCallback)((function(e){u(e.length>0?e[0]:"")}),[u]);return Object(p.jsx)(A,{userLocales:n,onLocaleChange:j,children:Object(p.jsx)(E,{locales:G,currentLocale:l,onLanguageChange:d})},"AppLocalizationProvider")}window.domains={frontend:"http://localhost:3000/",backend:"http://localhost:4000/"},i.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(q.a,{children:Object(p.jsx)(P,{})})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.0242a5f0.chunk.js.map