import{o as a,a as n,z as l}from"./vue-libs.14c21b5b.js";const t={class:"van-doc-markdown-body"},p=l(`<h1>model</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u65E5\u5386\u7EC4\u4EF6\u4EE5\u54EA\u79CD\u5F62\u5F0F\u5C55\u793A\u3002inline\uFF1A\u5185\u8054\u7684\u65B9\u5F0F\u3002dialog\uFF1A\u5F39\u7A97\u7684\u65B9\u5F0F</p></div><div class="van-doc-card"><h3 id="inline" tabindex="-1">inline</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">model</span>=<span class="hljs-string">&quot;inline&quot;</span> /&gt;</span>
</code></pre></div><div class="van-doc-card"><h3 id="dialog" tabindex="-1">dialog</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showCalendar&quot;</span>&gt;</span>\u70B9\u51FB\u6253\u5F00\u65E5\u5386\u5F39\u7A97<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">model</span>=<span class="hljs-string">&quot;dialog&quot;</span> <span class="hljs-attr">v-model:visible</span>=<span class="hljs-string">&quot;isShow&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> isShow = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title function_">showCalendar</span> = (<span class="hljs-params"></span>) =&gt; {
  isShow.<span class="hljs-property">value</span> = <span class="hljs-literal">true</span>;
};
&lt;/script&gt;
</code></pre></div>`,4),e=[p],d={__name:"README",setup(c,{expose:s}){return s({frontmatter:{}}),(r,i)=>(a(),n("div",t,e))}};export{d as default};
