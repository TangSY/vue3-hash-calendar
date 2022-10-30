import{o as n,a,z as l}from"./vue-libs.14c21b5b.js";const t={class:"van-doc-markdown-body"},c=l(`<h1>theme-color</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u7528\u4E8E\u4FEE\u6539\u65E5\u5386\u4E3B\u9898\u8272\uFF0C\u76EE\u524D\u652F\u6301\u4EE5\u4E0B\u51E0\u4E2A\u5C5E\u6027\uFF1A</p><pre><code class="language-js">{
    <span class="hljs-string">&#39;main-color&#39;</span>: string;
    <span class="hljs-string">&#39;bg-color&#39;</span>: string;
    <span class="hljs-string">&#39;main-font-color&#39;</span>: string;
    <span class="hljs-string">&#39;vice-font-color&#39;</span>: string;
    <span class="hljs-string">&#39;disabled-bg-color&#39;</span>: string;
    <span class="hljs-string">&#39;disabled-font-color&#39;</span>: string;
}
</code></pre></div><div class="van-doc-card"><h3 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;change&quot;</span>&gt;</span>\u5207\u6362\u4E3B\u9898\u8272<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">:theme-color</span>=<span class="hljs-string">&quot;themeColor&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> themeColor = <span class="hljs-title function_">ref</span>({});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">change</span> = (<span class="hljs-params"></span>) =&gt; {
  themeColor.<span class="hljs-property">value</span> = {
    <span class="hljs-string">&#39;main-color&#39;</span>: <span class="hljs-string">&#39;red&#39;</span>,
    <span class="hljs-string">&#39;bg-color&#39;</span>: <span class="hljs-string">&#39;grey&#39;</span>,
    <span class="hljs-string">&#39;main-font-color&#39;</span>: <span class="hljs-string">&#39;blue&#39;</span>,
    <span class="hljs-string">&#39;vice-font-color&#39;</span>: <span class="hljs-string">&#39;green&#39;</span>,
    <span class="hljs-string">&#39;disabled-bg-color&#39;</span>: <span class="hljs-string">&#39;black&#39;</span>,
    <span class="hljs-string">&#39;disabled-font-color&#39;</span>: <span class="hljs-string">&#39;yellow&#39;</span>,
  };
};
&lt;/script&gt;
</code></pre></div>`,3),p=[c],g={__name:"README",setup(o,{expose:s}){return s({frontmatter:{}}),(e,i)=>(n(),a("div",t,p))}};export{g as default};
