import{o as a,a as n,z as t}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},c=t(`<h1>today()</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u8FD4\u56DE\u4ECA\u65E5\u3002\u5F53\u4ECA\u65E5\u88AB\u7981\u7528\u65F6\uFF0C\u4E0D\u751F\u6548</p></div><div class="van-doc-card"><h3 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;today&quot;</span>&gt;</span>\u8FD4\u56DE\u4ECA\u65E5<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;calendar&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> calendar = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">today</span> = (<span class="hljs-params"></span>) =&gt; {
  calendar.<span class="hljs-property">value</span>.<span class="hljs-title function_">today</span>();
};
&lt;/script&gt;
</code></pre></div>`,3),p=[c],i={__name:"README",setup(e,{expose:s}){return s({frontmatter:{}}),(r,d)=>(a(),n("div",l,p))}};export{i as default};
