import{o as t,a as n,z as a}from"./vue-libs.14c21b5b.js";const l={class:"van-doc-markdown-body"},s=a('<h1>mark-date</h1><div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3><p>\u9700\u8981\u88AB\u6807\u8BB0\u7684\u65E5\u671F\uFF0C\u53EF\u6309\u4E0D\u540C\u989C\u8272\u4E0D\u540C\u6807\u8BB0\u7C7B\u578B\u5206\u7EC4\u6807\u8BB0\uFF08\u9ED8\u8BA4\u84DD\u8272\u5C0F\u70B9\uFF09</p><p>color: \u6807\u8BB0\u989C\u8272</p><p>type: \u6807\u8BB0\u7C7B\u578B\uFF0C\u53EF\u9009\uFF1A<code>dot | circle | dot+circle</code></p><p>date: \u9700\u8981\u88AB\u6807\u8BB0\u7684\u65E5\u671F</p></div><div class="van-doc-card"><h3 id="mo-ren-biao-ji-fang-shi" tabindex="-1">\u9ED8\u8BA4\u6807\u8BB0\u65B9\u5F0F</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>\n  <span class="hljs-attr">:mark-date</span>=<span class="hljs-string">&quot;[\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,\n    ]&quot;</span>\n/&gt;</span>\n</code></pre></div><div class="van-doc-card"><h3 id="zi-ding-yi-yan-se" tabindex="-1">\u81EA\u5B9A\u4E49\u989C\u8272</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>\n  <span class="hljs-attr">:mark-date</span>=<span class="hljs-string">&quot;[\n      {\n        color: &#39;#f00&#39;,\n        date: [\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,\n        ],\n      },\n    ]&quot;</span>\n/&gt;</span>\n</code></pre></div><div class="van-doc-card"><h3 id="zi-ding-yi-biao-ji-lei-xing" tabindex="-1">\u81EA\u5B9A\u4E49\u6807\u8BB0\u7C7B\u578B</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>\n  <span class="hljs-attr">:mark-date</span>=<span class="hljs-string">&quot;[\n      {\n        type: &#39;circle&#39;,\n        date: [\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,\n        ],\n      },\n    ]&quot;</span>\n/&gt;</span>\n</code></pre></div><div class="van-doc-card"><h3 id="jiao-cha-shi-yong" tabindex="-1">\u4EA4\u53C9\u4F7F\u7528</h3><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">vue-hash-calendar</span>\n  <span class="hljs-attr">:mark-date</span>=<span class="hljs-string">&quot;[\n      {\n        color: &#39;#f00&#39;,\n        type: &#39;dot+circle&#39;,\n        date: [\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,\n        ],\n      },\n      {\n        color: &#39;#0f0&#39;,\n        type: &#39;circle&#39;,\n        date: [\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,\n          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,\n        ],\n      },\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,\n      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,\n    ]&quot;</span>\n/&gt;</span>\n</code></pre></div>',6),o=[s],D={__name:"README",setup(g,{expose:e}){return e({frontmatter:{}}),(h,c)=>(t(),n("div",l,o))}};export{D as default};
