import{o as a,a as n,z as e}from"./vue-libs.14c21b5b.js";const t={class:"van-doc-markdown-body"},l=e(`<h1>disabled-time</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u8BBE\u7F6E\u65F6\u95F4\u7684\u7981\u7528\u72B6\u6001\uFF0C\u53C2\u6570\u4E3A\u5F53\u524D\u65F6\u95F4\uFF0C\u8981\u6C42\u8FD4\u56DE Boolean \uFF08\u7981\u7528\u8BE5\u65F6\u95F4\u9700\u8FD4\u56DE true\uFF09</p></div><div class="van-doc-card"><h3 id="jin-yong-xian-zai-zhi-qian-de-shi-jian" tabindex="-1">\u7981\u7528\u73B0\u5728\u4E4B\u524D\u7684\u65F6\u95F4</h3><p>\u4EE5 <code>picker-type=&quot;time&quot;</code> \u4E3A\u4F8B</p><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span> <span class="hljs-attr">picker-type</span>=<span class="hljs-string">&quot;time&quot;</span> <span class="hljs-attr">:disabled-time</span>=<span class="hljs-string">&quot;disabledBeforeTime&quot;</span> /&gt;</span>
</code></pre><pre><code class="language-js"><span class="hljs-keyword">const</span> <span class="hljs-title function_">disabledBeforeTime</span> = (<span class="hljs-params">date</span>) =&gt; {
  <span class="hljs-keyword">const</span> hours = date.<span class="hljs-title function_">getHours</span>();
  <span class="hljs-keyword">const</span> minute = date.<span class="hljs-title function_">getMinutes</span>();
  <span class="hljs-keyword">const</span> hoursNow = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getHours</span>();
  <span class="hljs-keyword">const</span> minuteNow = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getMinutes</span>();

  <span class="hljs-keyword">if</span> (hours &lt; hoursNow || (hours === hoursNow &amp;&amp; minute &lt; minuteNow)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
};
</code></pre></div>`,3),o=[l],h={__name:"README",setup(p,{expose:s}){return s({frontmatter:{}}),(i,r)=>(a(),n("div",t,o))}};export{h as default};
