import{o as a,a as n,z as t}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},e=t(`<h1>\u5207\u6362\u661F\u671F</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>lastWeek(): \u4E0A\u4E00\u661F\u671F</p><p>nextWeek(): \u4E0B\u4E00\u661F\u671F</p></div><div class="van-doc-card"><h3 id="lastweek" tabindex="-1">lastWeek</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;lastWeek&quot;</span>&gt;</span>\u4E0A\u4E00\u661F\u671F<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;nextWeek&quot;</span>&gt;</span>\u4E0B\u4E00\u661F\u671F<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;calendar&quot;</span> <span class="hljs-attr">:show-week-view</span>=<span class="hljs-string">&quot;true&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> calendar = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">lastWeek</span> = (<span class="hljs-params"></span>) =&gt; {
  calendar.<span class="hljs-property">value</span>.<span class="hljs-title function_">lastWeek</span>();
};
<span class="hljs-keyword">const</span> <span class="hljs-title function_">nextWeek</span> = (<span class="hljs-params"></span>) =&gt; {
  calendar.<span class="hljs-property">value</span>.<span class="hljs-title function_">nextWeek</span>();
};
&lt;/script&gt;
</code></pre></div>`,3),p=[e],j={__name:"README",setup(c,{expose:s}){return s({frontmatter:{}}),(r,h)=>(a(),n("div",l,p))}};export{j as default};
