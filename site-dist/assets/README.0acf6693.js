import{o as a,a as n,z as l}from"./vue-libs.14c21b5b.js";const t={class:"van-doc-markdown-body"},p=l(`<h1>visible</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u63A7\u5236\u65E5\u5386\u7EC4\u4EF6\u7684\u663E\u793A\u6216\u9690\u85CF</p></div><div class="van-doc-card"><h3 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showCalendar&quot;</span>&gt;</span>\u70B9\u51FB\u6253\u5F00\u65E5\u5386\u5F39\u7A97<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">model</span>=<span class="hljs-string">&quot;dialog&quot;</span> <span class="hljs-attr">v-model:visible</span>=<span class="hljs-string">&quot;isShow&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> isShow = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title function_">showCalendar</span> = (<span class="hljs-params"></span>) =&gt; {
  isShow.<span class="hljs-property">value</span> = <span class="hljs-literal">true</span>;
};
&lt;/script&gt;
</code></pre></div>`,3),c=[p],d={__name:"README",setup(e,{expose:s}){return s({frontmatter:{}}),(r,h)=>(a(),n("div",t,c))}};export{d as default};
