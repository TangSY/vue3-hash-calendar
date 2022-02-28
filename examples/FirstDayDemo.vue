<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar
      ref="picker"
      model="dialog"
      v-model:visible="isShowCalendar"
      picker-type="date"
    >
      <template v-slot:day="scope">
        <div v-if="scope.extendAttr.isToday">今</div>
        <div v-else>{{ scope.date.day }}</div>
      </template>
    </vue-hash-calendar>
    <!--github入口-->
    <github></github>
  </div>
</template>

<script>
import Github from "./Github.vue";

export default {
  name: "demo",
  components: { Github },
  data() {
    return {
      isShowCalendar: true, // 是否显示弹窗
      isShowTips: false, // 是否显示下载提示
      defaultDatetime: new Date(),
    };
  },
  mounted() {},
  methods: {
    showCalendarDialog() {
      // 显示日历
      this.isShowCalendar = true;
    },
  },
};
</script>
<style lang="stylus">
.hhhh {
  background: red;
}
</style>