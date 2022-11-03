import{u as _}from"./vue-libs.364b4f7a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const $=(e,t)=>{const n=e.__vccOpts||e;for(const[o,a]of t)n[o]=a;return n},b="modulepreload",k=function(e){return"/calendar/"+e},u={},i=function(t,n,o){return!n||n.length===0?t():Promise.all(n.map(a=>{if(a=k(a),a in u)return;u[a]=!0;const r=a.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":b,r||(s.as="script",s.crossOrigin=""),s.href=a,document.head.appendChild(s),r)return new Promise((y,w)=>{s.addEventListener("load",y),s.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>t())},E=()=>i(()=>import("./api.4dc14592.js"),["assets/api.4dc14592.js","assets/vue-libs.364b4f7a.js"]),L=()=>i(()=>import("./changelog.dc0e1050.js"),["assets/changelog.dc0e1050.js","assets/vue-libs.364b4f7a.js"]),C=()=>i(()=>import("./home.7b35e588.js"),["assets/home.7b35e588.js","assets/vue-libs.364b4f7a.js"]),P=()=>i(()=>import("./question.45a3941b.js"),["assets/question.45a3941b.js","assets/vue-libs.364b4f7a.js"]),T=()=>i(()=>import("./quickstart.86538fd3.js"),["assets/quickstart.86538fd3.js","assets/vue-libs.364b4f7a.js"]),x=()=>i(()=>import("./sponsor.090ec127.js"),["assets/sponsor.090ec127.js","assets/vue-libs.364b4f7a.js"]),A=["calendar","picker-type","model","visible","scroll-change-date","default-datetime","min-date","max-date","format","week-start","mark-date","minute-step","change-year-fast","show-today-button","show-week-view","show-arrow","show-action","show-not-current-month-day","disabled-week-view","disabled-date","disabled-time","disabled-scroll","theme-color","lang","disabled-class-name","not-current-month-day-class-name","checked-day-class-name","today-class-name","first-day-of-month-class-name"],R=A.map(e=>({path:e,title:e==="calendar"?"\u6700\u7B80\u914D\u7F6E":e})),S=["day","week","arrow"],D=S.map(e=>({path:`${e}-slot`,title:e})),h={name:"vue3-hash-calendar",build:{css:{removeSourceFile:!0},namedExport:!0,site:{publicPath:"/calendar/"},srcDir:process.env.BUILD_TARGET==="site"?"./src":"./src/calendar"},site:{title:"vue3-hash-calendar",logo:"http://www.hxkj.vip/calendar/public/logo.png",description:"\u57FA\u4E8E vue3 \u7248\u672C\u7684\u5468 \u6708 \u65F6\u95F4\u9009\u62E9\u5668",baiduAnalytics:{seed:"b0668f30d62e1597bdb36d05edea8960"},headHtml:`<style type="text/css">
    .hash-demo-title {
      padding: 24px;
      font-size: 20px;
      text-align: center;
    }
    .hash-notify {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      color: #fff;
      font-size: 14px;
      background: #1c71fb;
      white-space: pre-wrap;
      text-align: center;
      word-wrap: break-word;
    }
    .van-theme-dark .hash-calendar .calendar_group_li {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_week {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_title_date {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_title {
      background: var(--van-doc-background-2);
      border-bottom: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_content {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_group_ul {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .year-body {
      background: rgb(45, 46, 49);
    }
    </style>`,darkModeClass:"van-theme-dark",lightModeClass:"van-theme-light",links:[{logo:"https://fastly.jsdelivr.net/npm/@vant/assets/weapp.svg",url:"https://gitee.com/HashTang/vue3-hash-calendar"},{logo:"https://fastly.jsdelivr.net/npm/@vant/assets/github.svg",url:"https://github.com/TangSY/vue3-hash-calendar"}],nav:[{title:"\u5F00\u53D1\u6307\u5357",items:[{path:"home",title:"\u4ECB\u7ECD"},{path:"quickstart",title:"\u5FEB\u901F\u4E0A\u624B"},{path:"api",title:"API"},{path:"question",title:"\u5E38\u89C1\u95EE\u9898"},{path:"changelog",title:"\u66F4\u65B0\u65E5\u5FD7"},{path:"sponsor",title:"\u8D5E\u52A9"}]},{title:"Props \u4F7F\u7528\u6307\u5357",items:R},{title:"Method \u4F7F\u7528\u6307\u5357",items:[{title:"\u5207\u6362\u6708\u4EFD",path:"switch-month"},{title:"\u5207\u6362\u661F\u671F",path:"switch-week"},{title:"\u8FD4\u56DE\u4ECA\u65E5",path:"switch-day"}]},{title:"Slot \u4F7F\u7528\u6307\u5357",items:D}]}},q={Api:E,Changelog:L,Home:C,Question:P,Quickstart:T,Sponsor:x},V="1.0.6";let d=[],m=!1;function p(e){m?e():d.push(e)}window.top===window?window.addEventListener("message",e=>{e.data.type==="iframeReady"&&(m=!0,d.forEach(t=>t()),d=[])}):window.top.postMessage({type:"iframeReady"},"*");function f(){var n,o;const e=window.vueRouter,{path:t}=e.currentRoute.value;return(n=h.site.simulator)!=null&&n.routeMapper?(o=h.site.simulator)==null?void 0:o.routeMapper(t):t}function N(){window.top.postMessage({type:"replacePath",value:f()},"*")}function U(){const e=document.querySelector("iframe");e&&p(()=>{e.contentWindow.postMessage({type:"replacePath",value:f()},"*")})}function j(e){const t=document.querySelector("iframe");t&&p(()=>{t.contentWindow.postMessage({type:"updateTheme",value:e},"*")})}function I(){const e=window.localStorage.getItem("vantTheme");return e||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}function H(){const e=_(I());return window.addEventListener("message",t=>{var o,a;if(((o=t.data)==null?void 0:o.type)!=="updateTheme")return;const n=((a=t.data)==null?void 0:a.value)||"";e.value=n}),e}function Z(e){window.addEventListener("message",t=>{var o,a;if(((o=t.data)==null?void 0:o.type)!=="replacePath")return;const n=((a=t.data)==null?void 0:a.value)||"";e.currentRoute.value.path!==n&&e.replace(n).catch(()=>{})})}const O=navigator.userAgent.toLowerCase(),W=/ios|iphone|ipod|ipad|android/.test(O);function F(e,t="-"){return e.replace(/([a-z\d])([A-Z])/g,"$1"+t+"$2").replace(/([A-Z])([A-Z][a-z\d]+)/g,"$1"+t+"$2").toLowerCase()}function K(e){const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const n=document.getSelection();if(!n)return;const o=n.rangeCount>0?n.getRangeAt(0):!1;t.select(),document.execCommand("copy"),document.body.removeChild(t),o&&(n.removeAllRanges(),n.addRange(o))}const g="zh-CN",M="en-US",v="vant-cli-lang";let l=g;function Q(){return l}function Y(e){l=e,localStorage.setItem(v,e)}function B(e){const t=localStorage.getItem(v);if(t){l=t;return}if(navigator.language&&navigator.language.indexOf("zh-")!==-1){l=g;return}l=e||M}export{$ as _,i as a,h as b,K as c,Y as d,B as e,q as f,I as g,U as h,W as i,F as j,Q as k,Z as l,N as m,V as p,j as s,H as u};
