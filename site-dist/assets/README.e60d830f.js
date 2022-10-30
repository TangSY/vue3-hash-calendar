import{o as a,a as n,z as t}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},p=t(`<h1>\u5207\u6362\u6708\u4EFD</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>lastMonth(): \u4E0A\u4E00\u6708</p><p>nextMonth(): \u4E0B\u4E00\u6708</p></div><div class="van-doc-card"><h3 id="lastmonth" tabindex="-1">lastMonth</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;lastMonth&quot;</span>&gt;</span>\u4E0A\u4E00\u6708<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;nextMonth&quot;</span>&gt;</span>\u4E0B\u4E00\u6708<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;calendar&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> calendar = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">lastMonth</span> = (<span class="hljs-params"></span>) =&gt; {
  calendar.<span class="hljs-property">value</span>.<span class="hljs-title function_">lastMonth</span>();
};
<span class="hljs-keyword">const</span> <span class="hljs-title function_">nextMonth</span> = (<span class="hljs-params"></span>) =&gt; {
  calendar.<span class="hljs-property">value</span>.<span class="hljs-title function_">nextMonth</span>();
};
&lt;/script&gt;
</code></pre></div>`,3),c=[p],d={__name:"README",setup(e,{expose:s}){return s({frontmatter:{}}),(h,r)=>(a(),n("div",l,c))}};export{d as default};
