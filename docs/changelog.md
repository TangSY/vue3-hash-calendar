### [v1.0.6](https://github.com/TangSY/vue3-hash-calendar/compare/v1.0.5...v1.0.6)

`2022-11-03`

**Bug Fixes**

- 修复默认日期引起星期切换错误的问题 [54bc1e](https://github.com/TangSY/vue3-hash-calendar/commit/54bc1e65abaf987e84f0e306d2fca90e8d1b2a66)

**Document**

- 更新 v1.0.5 版本日志 [e828c7](https://github.com/TangSY/vue3-hash-calendar/commit/e828c7c4ed9b5ea148baac914b96434e2273234e)

- 1.0.6 [f0e97e](https://github.com/TangSY/vue3-hash-calendar/commit/f0e97e973ceb9d87ebc2a1c84a104123ee8d04e8)

**Feature**

- 更新部分测试用例 [63f73f](https://github.com/TangSY/vue3-hash-calendar/commit/63f73fe05c27c02a4a30540229e7989834324b14)

### [v1.0.5](https://github.com/TangSY/vue3-hash-calendar/compare/v1.0.4...v1.0.5)

`2022-11-02`

**Document**

- 更新 changelog [9dd75f](https://github.com/TangSY/vue3-hash-calendar/commit/9dd75f216b9ab6c0362b1c2f3893b6c23a7d1df5)

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
- 更新文档 [f4d639](https://github.com/TangSY/vue3-hash-calendar/commit/f4d639da41c942d47acc5689b3266baf60caf789)
- 更新文档 [757e94](https://github.com/TangSY/vue3-hash-calendar/commit/757e94d2542ea86745e4e8bb6f90b10e364d5997)
- 更新文档链接 [361400](https://github.com/TangSY/vue3-hash-calendar/commit/361400e006bb5ed4077b990203da4b4c263828ea)
- 更新 changelog [a0ebc7](https://github.com/TangSY/vue3-hash-calendar/commit/a0ebc73226ebdb357457bb5bc651e53f2392e8df)
- 添加 default-datetime 属性文档 [444e59](https://github.com/TangSY/vue3-hash-calendar/commit/444e594fe88c8bb6167f8ec70130a2d57a262575)
- 添加 min-date、max-date 属性文档 [3678ad](https://github.com/TangSY/vue3-hash-calendar/commit/3678adf31f374ea5000d0e6b36cc3d1bc9aa287e)
- 添加部分文档 [509342](https://github.com/TangSY/vue3-hash-calendar/commit/50934256576995e0d1594b3516add2c854baf4e0)
- 完善 组件 属性文档 [466f92](https://github.com/TangSY/vue3-hash-calendar/commit/466f92bb847842dfd932e5a0d3fb887491c0fede)
- 完善 组件 属性文档 [2e167e](https://github.com/TangSY/vue3-hash-calendar/commit/2e167ec612777ead1c5eae972bfbb8aabc361571)
- 完善 change-year-fast 属性文档 [b76072](https://github.com/TangSY/vue3-hash-calendar/commit/b76072e751487f3f91773c35f64ee561ff383b75)
- 完善 mark-datet 属性文档 [e78378](https://github.com/TangSY/vue3-hash-calendar/commit/e7837824c5d1feb0ecd117c294bd5c352b8efd9a)
- 完善 mark-datet 属性文档 [f4c3ef](https://github.com/TangSY/vue3-hash-calendar/commit/f4c3efa2e11dfdfbff4cf7ef35c722ee5bb81a86)
- 完善 minute-step 属性文档 [f66250](https://github.com/TangSY/vue3-hash-calendar/commit/f662508b65d8420bee636e78c9a8129a031388be)
- 完善 pick-type、visible 属性文档 [c211db](https://github.com/TangSY/vue3-hash-calendar/commit/c211db4b71f84955409519ca5e4c040d83950315)
- 完善 week-start 属性文档 [8d83ee](https://github.com/TangSY/vue3-hash-calendar/commit/8d83ee924d41a6d6a44d418f667cece6a097bf88)
- 完善文档 [46f540](https://github.com/TangSY/vue3-hash-calendar/commit/46f5400260a598e81a2b3d42dde8703cca32b678)
- 完善组件插槽文档 [9bd11f](https://github.com/TangSY/vue3-hash-calendar/commit/9bd11fa881191bf0b48aa32a4cf59997c0de89c9)
- 完善组件事件文档 [e6879f](https://github.com/TangSY/vue3-hash-calendar/commit/e6879f2f4ffbea38f7335213e483712d5fc95fd2)
- 修改文档 [51e05e](https://github.com/TangSY/vue3-hash-calendar/commit/51e05e78fbdc1be22464c1df397de5425591310f)
- 修改文档样式 [706abb](https://github.com/TangSY/vue3-hash-calendar/commit/706abbd45862cbe046917132e599a4511035cd29)
- 优化文档结构 [72f5bb](https://github.com/TangSY/vue3-hash-calendar/commit/72f5bb374a35de9a000fffa82a50657511ee271a)
- 优化文档属性 [121d18](https://github.com/TangSY/vue3-hash-calendar/commit/121d18916efdb67b6a275cbaa498d779269134c3)

**dosc**

- 优化文档 [5f1a97](https://github.com/TangSY/vue3-hash-calendar/commit/5f1a9790886c3c1c296ca7f9ef6bd8424ff8a44a)

- 1.0.4 [c11129](https://github.com/TangSY/vue3-hash-calendar/commit/c11129ac59c274bfb43412d1796d83765bc769a5)

**Feature**

- 调整暗黑模式样式 [9a12d9](https://github.com/TangSY/vue3-hash-calendar/commit/9a12d999b9c868eb0df2d081bbafb8dc5b158309)
- 发布 1.0.1 版本 [a344c1](https://github.com/TangSY/vue3-hash-calendar/commit/a344c1ad15e0e843113af71639a9f14fbde1f87c)
- 更新文档 [b3195c](https://github.com/TangSY/vue3-hash-calendar/commit/b3195c91a87990d4f710c4685f449251292c8446)
- 去除 isShowWeekView & disabledWeekView 校验 [2e191a](https://github.com/TangSY/vue3-hash-calendar/commit/2e191ad292a95d572f5e810011712ff1f4784116)
- 去除 vue-ba [b95846](https://github.com/TangSY/vue3-hash-calendar/commit/b958465e26857b0de4bc68d62cb5836efc368d9a)
- 全部改造完成 [1bf105](https://github.com/TangSY/vue3-hash-calendar/commit/1bf105d8f45a82caf35584c2c54f27cd75aa4eac)
- 升级至 0.1.1 版本 [e47f67](https://github.com/TangSY/vue3-hash-calendar/commit/e47f677461d1cc5595ff9e086636fc86071ba003)
- 使用 vant-cli 创建文档库 [609663](https://github.com/TangSY/vue3-hash-calendar/commit/60966353ece58a6d4a3ca37cd66a243f69c86612)
- 添加农历示例代码 [ec369d](https://github.com/TangSY/vue3-hash-calendar/commit/ec369d6096e4517eca52bb8ca9b8fedd08e77dda)
- 添加 logo [449c43](https://github.com/TangSY/vue3-hash-calendar/commit/449c43e361b8fc649460609e293e6cec046b85c8)
- 添加 postcss-px-to-viewport 插件 [ad03ad](https://github.com/TangSY/vue3-hash-calendar/commit/ad03ad3b88435955bd2808788d48dfb2d0647886)
- 整理 props [7efeb1](https://github.com/TangSY/vue3-hash-calendar/commit/7efeb1c0333b4359c0efb138433e721da2abf362)
- add ts [c29d2a](https://github.com/TangSY/vue3-hash-calendar/commit/c29d2ae317e9c4559cd823cd850df01adc2c1f87)
- Calendar 组件改造完成 [4ceae6](https://github.com/TangSY/vue3-hash-calendar/commit/4ceae69ce9d8bb33d93960c7f0c98cf91d7cd904)
- DatetimePicker 组件改造完成 [7c4b95](https://github.com/TangSY/vue3-hash-calendar/commit/7c4b9544319a0ebb69468d4a1f2d479db8792506)
- docs 更新文档 [822dc2](https://github.com/TangSY/vue3-hash-calendar/commit/822dc20b3d0692cb93876830eb9dcec395340cc0)
- init commit [f7cc6f](https://github.com/TangSY/vue3-hash-calendar/commit/f7cc6f9b92fb2176262c0badbf878736be779159)
- ScrollContainer 组件改造完成 [4bb477](https://github.com/TangSY/vue3-hash-calendar/commit/4bb4779a8942bc4c1109b03dd01af359a22a0884)
- update version [ce7553](https://github.com/TangSY/vue3-hash-calendar/commit/ce7553fb90cde79b6ade66e7c4887262615d2f0e)
- YearMonthPicker 组件改造完成 [dce3d6](https://github.com/TangSY/vue3-hash-calendar/commit/dce3d68107d37192fffe5fd69926bb08a32c7783)

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
