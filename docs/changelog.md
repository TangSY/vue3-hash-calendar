### [v1.0.7](https://github.com/TangSY/vue3-hash-calendar/compare/v1.0.6...v1.0.7)

`2022-11-05`

**Bug Fixes**

- 修复一些 bug

**Document**

- 更新 v1.0.6 版本日志 [db7ef1](https://github.com/TangSY/vue3-hash-calendar/commit/db7ef1ae95b0a0054e4c96e5e586618b89e79bb3)
- 更新 css 引入文档 [123498](https://github.com/TangSY/vue3-hash-calendar/commit/123498e5fcda9d88ac199c0f5db3cc7ad32f14c6)

- 1.0.7 [318c95](https://github.com/TangSY/vue3-hash-calendar/commit/318c95ed74cd4a020684374785a27c8f01eff409)

### [v1.0.6](https://github.com/TangSY/vue3-hash-calendar/compare/v1.0.5...v1.0.6)

`2022-11-03`

**Bug Fixes**

- 修复默认日期引起星期切换错误的问题 [54bc1e](https://github.com/TangSY/vue3-hash-calendar/commit/54bc1e65abaf987e84f0e306d2fca90e8d1b2a66)

**Document**

- 1.0.6 [f0e97e](https://github.com/TangSY/vue3-hash-calendar/commit/f0e97e973ceb9d87ebc2a1c84a104123ee8d04e8)

**Feature**

- 更新部分测试用例 [63f73f](https://github.com/TangSY/vue3-hash-calendar/commit/63f73fe05c27c02a4a30540229e7989834324b14)

### [v1.0.5](https://github.com/TangSY/vue3-hash-calendar/compare/v1.0.4...v1.0.5)

`2022-11-02`

**Document**

- 1.0.5 [b93887](https://github.com/TangSY/vue3-hash-calendar/commit/b9388729b42d7fbea1783a3615d4e56dbad9fdfc)

**Feature**

- 为每个 demo 加上测试用例快照 [a7b7d2](https://github.com/TangSY/vue3-hash-calendar/commit/a7b7d23a04b95ea0e9317cf643d557b8594e3e86)

### [v1.0.4](https://github.com/TangSY/vue3-hash-calendar/compare/f7cc6f9b92fb2176262c0badbf878736be779159...v1.0.4)

`2022-11-02`

**Bug Fixes**

- 农历 demo 显示问题修复 [2de606](https://github.com/TangSY/vue3-hash-calendar/commit/2de606bf02b38e9df280b30fc3f293cd46b179ca)
- 设置了滑动不修改日期，但是使用事件 lastMonth nextMonth 也会改变当前日期( #14) [#14](https://github.com/TangSY/vue3-hash-calendar/issues/14)
- 修复 globEager 类型错误 [4533c8](https://github.com/TangSY/vue3-hash-calendar/commit/4533c89851447b9b2bf91e7b778181d2c5e2aa5c)
- 修复 import_meta.glob is not a function [70f581](https://github.com/TangSY/vue3-hash-calendar/commit/70f58111fe024d097c5e403fea98f6364939bd0b)
- 修复当 change-year-fast 等于 true 时，切换日历报错 invalid node 的问题 [a44a7e](https://github.com/TangSY/vue3-hash-calendar/commit/a44a7eb1f32bba28cd00bd33c082a523fd158bd9)
- 修复当 pick-type 等于 time 时，日期无法显示的问题 [f00cdf](https://github.com/TangSY/vue3-hash-calendar/commit/f00cdf60cc9e50582b298f7ec0bd5fb631677986)
- 修复当 pick-type 等于 time 时，日期显示错位的问题 [c69306](https://github.com/TangSY/vue3-hash-calendar/commit/c69306e63604e272dbc66c0a04d7ae1e5f4d2123)
- 修复一些 bug [a1f291](https://github.com/TangSY/vue3-hash-calendar/commit/a1f29164283a2ddafe63e96c307c1afbe677d5c1)
- 修复周视图无法返回今天的 bug [b3c4da](https://github.com/TangSY/vue3-hash-calendar/commit/b3c4da7658835f3b4dbfd5b7779128eaf76aad3c)
- 修复 isShowWeekView 属性无效的问题（#1、#6） [#1](https://github.com/TangSY/vue3-hash-calendar/issues/1) [#6](https://github.com/TangSY/vue3-hash-calendar/issues/6)
- 修复 mark-date 属性失效的问题 [3c7fcb](https://github.com/TangSY/vue3-hash-calendar/commit/3c7fcb25cf8533003cdb155dbc1c3e1a5c718358)

**core**

- 修改打包配置 [350396](https://github.com/TangSY/vue3-hash-calendar/commit/35039677e1d8e45f7808c657938334553468e802)

**Document**

- 初始化所有 API 配置 [6619f3](https://github.com/TangSY/vue3-hash-calendar/commit/6619f3d2d78118fa6667aa36579d9a7bb3d1e613)
- 添加 default-datetime 属性文档 [444e59](https://github.com/TangSY/vue3-hash-calendar/commit/444e594fe88c8bb6167f8ec70130a2d57a262575)
- 添加 min-date、max-date 属性文档 [3678ad](https://github.com/TangSY/vue3-hash-calendar/commit/3678adf31f374ea5000d0e6b36cc3d1bc9aa287e)
- 完善 change-year-fast 属性文档 [b76072](https://github.com/TangSY/vue3-hash-calendar/commit/b76072e751487f3f91773c35f64ee561ff383b75)
- 完善 mark-datet 属性文档 [e78378](https://github.com/TangSY/vue3-hash-calendar/commit/e7837824c5d1feb0ecd117c294bd5c352b8efd9a)
- 完善 mark-datet 属性文档 [f4c3ef](https://github.com/TangSY/vue3-hash-calendar/commit/f4c3efa2e11dfdfbff4cf7ef35c722ee5bb81a86)
- 完善 minute-step 属性文档 [f66250](https://github.com/TangSY/vue3-hash-calendar/commit/f662508b65d8420bee636e78c9a8129a031388be)
- 完善 pick-type、visible 属性文档 [c211db](https://github.com/TangSY/vue3-hash-calendar/commit/c211db4b71f84955409519ca5e4c040d83950315)
- 完善 week-start 属性文档 [8d83ee](https://github.com/TangSY/vue3-hash-calendar/commit/8d83ee924d41a6d6a44d418f667cece6a097bf88)

**dosc**

- 1.0.4 [c11129](https://github.com/TangSY/vue3-hash-calendar/commit/c11129ac59c274bfb43412d1796d83765bc769a5)

**Feature**

- 调整暗黑模式样式 [9a12d9](https://github.com/TangSY/vue3-hash-calendar/commit/9a12d999b9c868eb0df2d081bbafb8dc5b158309)
- 去除 isShowWeekView & disabledWeekView 校验 [2e191a](https://github.com/TangSY/vue3-hash-calendar/commit/2e191ad292a95d572f5e810011712ff1f4784116)
- 添加文档 logo [449c43](https://github.com/TangSY/vue3-hash-calendar/commit/449c43e361b8fc649460609e293e6cec046b85c8)
- 添加 postcss-px-to-viewport 插件 [ad03ad](https://github.com/TangSY/vue3-hash-calendar/commit/ad03ad3b88435955bd2808788d48dfb2d0647886)

**refactor**

- 去除无效文件 [41c4c4](https://github.com/TangSY/vue3-hash-calendar/commit/41c4c429d3b51e4c4113dc3f49b3d55332363c5b)
- 完善整体组件引用 [24aa52](https://github.com/TangSY/vue3-hash-calendar/commit/24aa52e944e2172a86526dc078238499e20bc74b)
- 完善 calendar 布局和样式 [bc458a](https://github.com/TangSY/vue3-hash-calendar/commit/bc458adf38f9c7f0ffb91867b5f480fdf52e6d25)
- 重构 calendar [274d22](https://github.com/TangSY/vue3-hash-calendar/commit/274d2260245e72223cd4c8ffb4068729a396f167)
- 重构 calendarDate [90fc70](https://github.com/TangSY/vue3-hash-calendar/commit/90fc70ea515beece39150e2d6e33ff7d54d18288)
- CalendarScrollContainer: 添加 js 逻辑 [f68d97](https://github.com/TangSY/vue3-hash-calendar/commit/f68d97ea9ecdfd8efeca4bb46693b1c0215dc13e)
- CalendarScrollContainer: 添加样式 [3f3ff2](https://github.com/TangSY/vue3-hash-calendar/commit/3f3ff2698bf1c77de8b7a2f57262cbadec32bd2e)
- CalendarScrollContainer: 添加 props [fd479d](https://github.com/TangSY/vue3-hash-calendar/commit/fd479dbb91bdc1a7b7ef739287e5be0abab5cb93)
- CalendarTime: 添加 CalendarTime 界面布局 [5170ae](https://github.com/TangSY/vue3-hash-calendar/commit/5170aebb38290b259b76ed73b8713755cd543328)
- CalendarTime: 添加 CalendarTime 组件样式 [f7ac14](https://github.com/TangSY/vue3-hash-calendar/commit/f7ac14685d17a9ee0f57c6145d23d49afba2e33a)
- CalendarTime: 添加 CalendarTime js 逻辑 [65c9e9](https://github.com/TangSY/vue3-hash-calendar/commit/65c9e9ddd047c0d37a4f599565cee9e31c0974f3)
- CalendarTime: 添加 CalendarTime Props [ea9f4c](https://github.com/TangSY/vue3-hash-calendar/commit/ea9f4cca43ead1e55fca19a07043aa5e20dea527)
- YearMonthPicker: 添加 props 声明 [8d65bd](https://github.com/TangSY/vue3-hash-calendar/commit/8d65bd682445da7d106fcdbce91da406128e7a20)
- YearMonthPicker: 添加界面布局 [6bd8a8](https://github.com/TangSY/vue3-hash-calendar/commit/6bd8a81953921ced97e87dc3f2148048c5525985)
- YearMonthPicker: 添加样式 [4e3ee6](https://github.com/TangSY/vue3-hash-calendar/commit/4e3ee692dd8e4b2954335c984bcbb19d8a37aef2)
- YearMonthPicker: 添加 js 逻辑 [a910d0](https://github.com/TangSY/vue3-hash-calendar/commit/a910d0fa9614e615117fa07ca8262d4e7653390f)
