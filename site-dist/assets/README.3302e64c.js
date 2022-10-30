import{o as a,a as n,z as e}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},t=e(`<h1>disabled-class-name</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u65E5\u671F\u88AB\u7981\u7528\u65F6\u7684 className\u3002\u7528\u4E8E\u4FEE\u6539\u65E5\u671F\u88AB\u7981\u7528\u65F6\u7684\u9ED8\u8BA4\u6837\u5F0F</p></div><div class="van-doc-card"><h3 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>
  <span class="hljs-attr">disabled-class-name</span>=<span class="hljs-string">&quot;disabled-class-name&quot;</span>
  <span class="hljs-attr">:disabled-date</span>=<span class="hljs-string">&quot;disabledAfterCurrentDate&quot;</span>
/&gt;</span>
</code></pre><pre><code class="language-js"><span class="hljs-keyword">const</span> <span class="hljs-title function_">disabledAfterCurrentDate</span> = (<span class="hljs-params">date</span>) =&gt; {
  <span class="hljs-keyword">const</span> timestamp = date.<span class="hljs-title function_">getTime</span>();
  <span class="hljs-keyword">if</span> (timestamp &gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getTime</span>()) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};
</code></pre><pre><code class="language-css"><span class="hljs-selector-class">.disabled-class-name</span> {
  <span class="hljs-attribute">color</span>: blue;
  <span class="hljs-attribute">background</span>: red;
}
</code></pre></div>`,3),c=[t],h={__name:"README",setup(p,{expose:s}){return s({frontmatter:{}}),(r,o)=>(a(),n("div",l,c))}};export{h as default};
