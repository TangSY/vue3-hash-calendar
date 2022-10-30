import{o as a,a as n,z as l}from"./vue-libs.14c21b5b.js";const t={class:"van-doc-markdown-body"},p=l(`<h1>day \u63D2\u69FD</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u81EA\u5B9A\u4E49\u65E5\u671F\u5185\u5BB9\uFF0C\u53EF\u7528\u4E8E\u6DFB\u52A0\u519C\u5386\u4E4B\u7C7B\u7684\uFF0C\u914D\u5408\u81EA\u5B9A\u4E49 className \u4F7F\u7528\uFF0C\u6548\u679C\u66F4\u4F73\uFF01</p><p>\u53C2\u6570\u4E3A { date, extendAttr }\uFF0C\u5176\u4E2D extendAttr \u53C2\u6570\u5305\u542B <code>isMarked</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u88AB\u6807\u8BB0\uFF09\u3001<code>isDisabledDate</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u88AB\u7981\u7528\uFF09\u3001<code>isToday</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u4E3A\u4ECA\u5929\uFF09\u3001<code>isChecked</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u88AB\u9009\u4E2D\uFF09\u3001<code>isCurrentMonthDay</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u4E3A\u672C\u6708\u65E5\u671F\uFF09\u3001<code>isFirstDayOfMonth</code>\uFF08\u8BE5\u65E5\u671F\u662F\u5426\u4E3A\u5F53\u6708\u7B2C\u4E00\u5929\uFF09\uFF0C\u53EF\u7528\u4E8E\u4E00\u4E9B\u7279\u6B8A\u9700\u6C42</p></div><div class="van-doc-card"><h3 id="xiu-gai-dang-tian-de-ri-qi-wei-jin" tabindex="-1">\u4FEE\u6539\u5F53\u5929\u7684\u65E5\u671F\u4E3A \u4ECA</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-slot:day</span>=<span class="hljs-string">&quot;scope&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;scope?.extendAttr?.isToday&quot;</span>&gt;</span>\u4ECA<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-else</span>&gt;</span>{{ scope?.date?.day }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">vue-hash-calendar</span>&gt;</span>
</code></pre></div><div class="van-doc-card"><h3 id="nong-li" tabindex="-1">\u519C\u5386</h3><p>\u6848\u4F8B\u4E2D\u4F7F\u7528\u7684 <code>lunar.js</code> \u6587\u4EF6\u83B7\u53D6\u5730\u5740\uFF1A<a href="https://github.com/TangSY/vue3-hash-calendar/blob/main/examples/lunar/lunar.js" target="_blank">lunar.js</a></p><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-slot:day</span>=<span class="hljs-string">&quot;scope&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;lunar-content&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{{ scope?.date.day }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;lunar&quot;</span>&gt;</span>{{ showLunar(scope?.date) }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">vue-hash-calendar</span>&gt;</span>
</code></pre><pre><code class="language-js">&lt;script setup&gt;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">VueHashCalendar</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;../../calendar&#39;</span>;
<span class="hljs-keyword">import</span> { lunar } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;./lunar.js&#39;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">showLunar</span> = (<span class="hljs-params">date</span>) =&gt; {
  <span class="hljs-keyword">if</span> (!date || !date.<span class="hljs-property">day</span>) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> lunarObj = lunar.<span class="hljs-title function_">solar2lunar</span>(date.<span class="hljs-property">year</span>, date.<span class="hljs-property">month</span> + <span class="hljs-number">1</span>, date.<span class="hljs-property">day</span>);

  <span class="hljs-keyword">return</span> lunarObj.<span class="hljs-property">festival</span> || lunarObj.<span class="hljs-property">lunarFestival</span> || lunarObj.<span class="hljs-property">IDayCn</span>;
};
&lt;/script&gt;
</code></pre><pre><code class="language-css">&lt;style&gt;
<span class="hljs-selector-class">.lunar-content</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">flex-direction</span>: column;
}
<span class="hljs-selector-class">.lunar</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(<span class="hljs-number">0.8</span>);
  <span class="hljs-attribute">width</span>: <span class="hljs-number">10vw</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
&lt;/style&gt;
</code></pre></div>`,4),e=[p],j={__name:"README",setup(c,{expose:s}){return s({frontmatter:{}}),(h,o)=>(a(),n("div",t,e))}};export{j as default};
