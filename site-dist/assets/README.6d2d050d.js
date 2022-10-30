import{o as a,a as n,z as t}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},e=t(`<h1>show-week-view</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u662F\u5426\u4EE5\u5468\u89C6\u56FE\u5C55\u793A\u7EC4\u4EF6</p></div><div class="van-doc-card"><h3 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;toggle&quot;</span>&gt;</span>\u70B9\u51FB\u5207\u6362\u89C6\u56FE<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">v-model:show-week-view</span>=<span class="hljs-string">&quot;isShow&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> isShow = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title function_">toggle</span> = (<span class="hljs-params"></span>) =&gt; {
  isShow.<span class="hljs-property">value</span> = !isShow.<span class="hljs-property">value</span>;
};
&lt;/script&gt;
</code></pre></div>`,3),p=[e],d={__name:"README",setup(c,{expose:s}){return s({frontmatter:{}}),(r,h)=>(a(),n("div",l,p))}};export{d as default};
