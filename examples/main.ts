import Vue, { createApp } from "vue";
import App from "./App.vue";
// 导入组件库
import vueHashCalendar from "../packages/index";
// 引入百度统计插件
import ba from "vue-ba";

const app = createApp(App);

// 注册组件库
app.use(vueHashCalendar);

// app.use(ba, "b0668f30d62e1597bdb36d05edea8960");

app.mount("#app");
