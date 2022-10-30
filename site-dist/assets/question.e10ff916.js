import{o as a,a as n,z as e}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},t=e(`<h1>\u5E38\u89C1\u95EE\u9898</h1><div class="van-doc-card"><h3 id="ru-he-tian-jia-nong-li" tabindex="-1">\u5982\u4F55\u6DFB\u52A0\u519C\u5386\uFF1F</h3><p><a href="#day-slot" target="_blank">day \u63D2\u69FD</a></p><pre><code class="language-js"><span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/TangSY/vue3-hash-calendar/blob/main/examples/lunar/LunarDemo.vue</span>
</code></pre></div><div class="van-doc-card"><h3 id="zai-dialog-mo-shi-zhong-ru-he-xian-shi-ri-li-zu-jian" tabindex="-1">\u5728 dialog \u6A21\u5F0F\u4E2D\uFF0C\u5982\u4F55\u663E\u793A\u65E5\u5386\u7EC4\u4EF6</h3><pre><code class="language-js">&lt;vue-hash-calendar v-<span class="hljs-attr">model</span>:visible=<span class="hljs-string">&quot;isShowCalendar&quot;</span>&gt;&lt;/vue-hash-calendar&gt;;

<span class="hljs-comment">//\u8BBE\u7F6E\u4E3Atrue</span>
<span class="hljs-variable language_">this</span>.<span class="hljs-property">isShowCalendar</span> = <span class="hljs-literal">true</span>;
</code></pre></div><div class="van-doc-card"><h3 id="cdn-fang-shi-yin-ru-de-zu-jian-wei-shi-me-you-xie-shu-xing-bu-qi-zuo-yong" tabindex="-1">cdn \u65B9\u5F0F\u5F15\u5165\u7684\u7EC4\u4EF6\uFF0C\u4E3A\u4EC0\u4E48\u6709\u4E9B\u5C5E\u6027\u4E0D\u8D77\u4F5C\u7528\uFF1F</h3><pre><code class="language-js">\u5728\u975E webpack \u5F00\u53D1\u6A21\u5F0F\u4E0B\uFF0C\u5C5E\u6027\u540D\u79F0\u4E0D\u80FD\u4F7F\u7528\u9A7C\u5CF0\u547D\u540D\u3002\u4F8B\u5982\uFF1AisShowAction \u9700\u8981\u5199\u6210 is-show-action.
</code></pre></div><div class="van-doc-card"><h3 id="xiang-yao-fan-hui-biao-zhun-de-ying-wen-ge-shi-ri-qi-format-shu-xing-ying-gai-zen-yang-xie" tabindex="-1">\u60F3\u8981\u8FD4\u56DE\u6807\u51C6\u7684\u82F1\u6587\u683C\u5F0F\u65E5\u671F\uFF0Cformat \u5C5E\u6027\u5E94\u8BE5\u600E\u6837\u5199</h3><pre><code class="language-js">&lt;vue-hash-calendar format=<span class="hljs-string">&quot;MM DD,YY at hh:mm F&quot;</span> /&gt;
</code></pre></div><div class="van-doc-card"><h3 id="xiang-yao-fan-hui-12-xiao-shi-zhi-de-ri-qi-format-shu-xing-ying-gai-zen-yang-xie" tabindex="-1">\u60F3\u8981\u8FD4\u56DE 12 \u5C0F\u65F6\u5236\u7684\u65E5\u671F\uFF0Cformat \u5C5E\u6027\u5E94\u8BE5\u600E\u6837\u5199\uFF1F</h3><pre><code class="language-js">&lt;vue-hash-calendar format=<span class="hljs-string">&quot;YY/MM/DD hh:mm F&quot;</span> /&gt;
</code></pre></div><div class="van-doc-card"><h3 id="day-slot-de-ji-ben-yong-fa" tabindex="-1">day slot \u7684\u57FA\u672C\u7528\u6CD5</h3><pre><code class="language-js"><span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/TangSY/vue3-hash-calendar/blob/main/examples/SlotDemo.vue</span>
</code></pre></div><div class="van-doc-card"><h3 id="neng-fou-tong-guo-wai-bu-de-mou-ge-an-niu-lai-chu-fa-ri-li-de-zhan-kai-he-shou-qi" tabindex="-1">\u80FD\u5426\u901A\u8FC7\u5916\u90E8\u7684\u67D0\u4E2A\u6309\u94AE\u6765\u89E6\u53D1\u65E5\u5386\u7684\u5C55\u5F00\u548C\u6536\u8D77</h3><pre><code class="language-js">\u53EF\u4EE5\u5728\u5916\u90E8\u901A\u8FC7\u4FEE\u6539 showWeekView \u7684\u503C\u6765\u63A7\u5236\u65E5\u5386\u7684\u6536\u8D77\u4E0E\u5C55\u5F00
</code></pre></div><div class="van-doc-card"><h3 id="ru-he-she-zhi-jin-yong-ri-qi" tabindex="-1">\u5982\u4F55\u8BBE\u7F6E\u7981\u7528\u65E5\u671F</h3><pre><code class="language-js"><span class="hljs-comment">// \u4F8B\u5982\u7981\u7528\u4ECA\u65E5\u4E4B\u524D\u7684\u6240\u6709\u65E5\u671F</span>

<span class="hljs-comment">/** vue\u6A21\u677F\u6587\u4EF6 **/</span>
&lt;vue-hash-calendar :disabled-date=<span class="hljs-string">&quot;disabledDate&quot;</span>&gt;&lt;/vue-hash-calendar&gt;

<span class="hljs-comment">/** vue methods \u4E2D\u7684\u65B9\u6CD5 **/</span>
<span class="hljs-title function_">disabledDate</span>(<span class="hljs-params">date</span>) {
    <span class="hljs-keyword">let</span> timestamp = date.<span class="hljs-title function_">getTime</span>();
    <span class="hljs-keyword">if</span> (timestamp &gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getTime</span>()) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
</code></pre></div><div class="van-doc-card"><h3 id="ru-he-she-zhi-jin-yong-shi-jian" tabindex="-1">\u5982\u4F55\u8BBE\u7F6E\u7981\u7528\u65F6\u95F4</h3><pre><code class="language-js"><span class="hljs-comment">// \u4F8B\u5982\u7981\u7528\u73B0\u5728\u4E4B\u524D\u7684\u65F6\u95F4</span>

<span class="hljs-comment">/** vue\u6A21\u677F\u6587\u4EF6 **/</span>
&lt;vue-hash-calendar :disabled-time=<span class="hljs-string">&quot;disabledTime&quot;</span>&gt;&lt;/vue-hash-calendar&gt;

<span class="hljs-comment">/** vue methods \u4E2D\u7684\u65B9\u6CD5 **/</span>
<span class="hljs-title function_">disabledTime</span>(<span class="hljs-params">date</span>) { <span class="hljs-comment">// \u7981\u7528\u7684\u65F6\u95F4</span>
  <span class="hljs-keyword">let</span> hours = date.<span class="hljs-title function_">getHours</span>()
  <span class="hljs-keyword">let</span> minute = date.<span class="hljs-title function_">getMinutes</span>()
  <span class="hljs-keyword">let</span> hoursNow = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getHours</span>()
  <span class="hljs-keyword">let</span> minuteNow = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getMinutes</span>()

  <span class="hljs-keyword">if</span> (hours &lt; hoursNow || (hours === hoursNow &amp;&amp; minute &lt; minuteNow)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
</code></pre></div><div class="van-doc-card"><h3 id="ru-guo-you-qi-ta-wen-ti-huo-zhe-gong-neng-shang-bu-jian-rong-de.-ke-yi-you-jian-gou-tong-t-tsy6.com-huo-zhe-github-ti-jiao-issue." tabindex="-1">\u5982\u679C\u6709\u5176\u4ED6\u95EE\u9898\uFF0C \u6216\u8005\u529F\u80FD\u4E0A\u4E0D\u517C\u5BB9\u7684\u3002\u53EF\u4EE5\u90AE\u4EF6\u6C9F\u901A <a href="mailto:t@tsy6.com" target="_blank">t@tsy6.com</a>\uFF0C\u6216\u8005 github \u63D0\u4EA4 issue\u3002</h3></div>`,11),i=[t],r={__name:"question",setup(c,{expose:s}){return s({frontmatter:{}}),(h,d)=>(a(),n("div",l,i))}};export{r as default};
