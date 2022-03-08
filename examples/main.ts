import Vue, { createApp } from "vue";
import App from "./App.vue";
// import App from "./SlotDemo.vue";
// import App from "./lunar/LunarDemo.vue";
// 导入组件库
import vueHashCalendar from "../packages/index";

const app = createApp(App);

// 注册组件库
app.use(vueHashCalendar);

app.mount("#app");
