/**
* @Description:    年月选择组件（年范围/年/月）
* @Author:         TSY
* @Email:          t@tsy6.com
* @CreateDate:     2021/5/26 22:53
*/
<template>
  <div
    class="year-body"
    :style="{ top: calendarTitleHeight + 'px', height: itemHeight * 4 + 'px' }"
    v-show="['year', 'yearRange', 'month'].includes(type)"
  >
    <ScrollContainer
      :calendarData="yearMonthShow"
      :disabledScroll="disabledScrollDirec"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @slidechange="slideChange"
    >
      <template v-slot="scope">
        <div
          class="year-body-item"
          :style="{ height: itemHeight + 'px' }"
          v-for="(item, index) in scope.currArr"
          :key="index"
          :class="[
            isDisabled(item, index) && (disabledClassName || 'is_disabled'),
          ]"
          @click="dateClick(item, index)"
        >
          <p
            class="year-body-item-content"
            :style="{ width: type === 'yearRange' ? '92px' : '60px' }"
            :class="[
              isChecked(item, index) && (checkedDayClassName || 'is_checked'),
              isNotCurrent(index) &&
                (notCurrentMonthDayClassName || 'is_not_current'),
            ]"
          >
            {{
              type === "yearRange"
                ? `${item.s}-${item.e}`
                : type === "month"
                ? language.MONTH[index]
                : item
            }}
          </p>
        </div>
      </template>
    </ScrollContainer>
  </div>
</template>

<script lang="ts" setup>
import ScrollContainer from "../components/ScrollContainer.vue";
import { isDateInRange } from "../utils/util";
import languageUtil from "../language";
import { YearMonthPickerProps } from "./YearMonthPicker";
import { computed, reactive, ref, watch } from "vue";

defineOptions({
  name: "YearMonthPicker",
});

const props = defineProps(YearMonthPickerProps);

const emit = defineEmits([
  "click",
  "slidechange",
  "touchstart",
  "touchmove",
  "touchend",
]);

let language = reactive({});
const yearRange = ref(10);
const disabledScrollDirec = ref(false);
let yearMonthShow = reactive([]);
let selectType = reactive(["single", "mutiple", "range"]);
let calendarType = reactive([
  "week",
  "date",
  "month",
  "year",
  "yearRange",
  "datetime",
]);

language = languageUtil[props.lang.toUpperCase()];

const itemHeight = computed(
  () => (props.calendarContentHeight - props.calendarTitleHeight) / 4
);

const initYear = (year) => {
  const yearArr = [];
  const currYear = `${year || props.calendarDate.year}`;
  const yearStart = parseInt(currYear.substring(0, 3) + "0");
  for (let i = 0; i <= yearRange.value; i++) {
    yearArr.push(yearStart + i);
  }
  yearArr.unshift(yearStart - 1);

  return yearArr;
};

const initYearRange = (year) => {
  const yearRangeArr = [];
  const currYear = `${year || props.calendarDate.year}`;
  const yearStart = parseInt(currYear.substring(0, 2) + "00");
  for (let i = 0; i <= yearRange.value; i++) {
    yearRangeArr.push({ s: yearStart + i * 10, e: yearStart + i * 10 + 9 });
  }
  yearRangeArr.unshift({ s: yearStart - 10, e: yearStart - 1 });

  return yearRangeArr;
};

const slideChange = (direc) => {
  if (direc === "left") {
    getNextOpitonData();
  } else if (direc === "right") {
    getLastOptionData();
  }

  emit("slidechange", direc);
};

const getNextOpitonData = () => {
  if (props.type === "year") {
    const year = yearMonthShow[2][1];
    yearMonthShow = getThreeYearArr(year);
  } else if (props.type === "yearRange") {
    const year = yearMonthShow[2][1].s;
    yearMonthShow = getThreeYearRangeArr(year);
  }
};

const getLastOptionData = () => {
  if (props.type === "year") {
    const year = yearMonthShow[0][1];
    yearMonthShow = getThreeYearArr(year);
  } else if (props.type === "yearRange") {
    const year = yearMonthShow[0][1].s;
    yearMonthShow = getThreeYearRangeArr(year);
  }
};

const getThreeYearArr = (year = props.calendarDate.year) => {
  year = year + "";
  const yearStartLast = parseInt(parseInt(year.substring(0, 3)) - 1 + "0");
  const yearStartCurr = parseInt(year.substring(0, 3) + "0");
  const yearStartNext = parseInt(parseInt(year.substring(0, 3)) + 1 + "0");

  return [
    initYear(yearStartLast),
    initYear(yearStartCurr),
    initYear(yearStartNext),
  ];
};

const getThreeYearRangeArr = (year = props.calendarDate.year) => {
  year = year + "";
  const yearStartLast = parseInt(parseInt(year.substring(0, 2)) - 1 + "00");
  const yearStartCurr = parseInt(year.substring(0, 2) + "00");
  const yearStartNext = parseInt(parseInt(year.substring(0, 2)) + 1 + "00");

  return [
    initYearRange(yearStartLast),
    initYearRange(yearStartCurr),
    initYearRange(yearStartNext),
  ];
};

const dateClick = (date, index) => {
  if (!date) return; // fix:1月无法选中
  if (isDisabled(date, index)) return;

  let checkedDate = { ...props.calendarDate, type: props.type };
  if (props.type === "month") {
    checkedDate = {
      ...checkedDate,
      month: index,
    };
  }
  if (props.type === "year") {
    checkedDate = {
      ...checkedDate,
      year: date,
    };
  }
  if (props.type === "yearRange") {
    const yearArr = getRangeYear(date);
    checkedDate = {
      ...checkedDate,
      year: yearArr.includes(checkedDate.year) ? checkedDate.year : date.s,
    };
  }

  emit("click", checkedDate);
};

const isChecked = (date, index) => {
  if (props.type === "month") {
    return index === props.calendarDate.month;
  }
  if (props.type === "year") {
    return date === props.calendarDate.year;
  }
  if (props.type === "yearRange") {
    return (
      date.s <= props.calendarDate.year && date.e >= props.calendarDate.year
    );
  }
};

const isNotCurrent = (index) => {
  return (
    (index === 0 || index === 11) &&
    (props.type === "year" || props.type === "yearRange")
  );
};

const isDisabled = (date, index) => {
  let fDate = new Date();

  if (props.type === "month") {
    fDate = new Date(
      `${props.calendarDate.year}/${parseInt(index) + 1}/${
        props.calendarDate.day
      }`
    );
  } else if (props.type === "year") {
    fDate = new Date(
      `${date}/${parseInt(props.calendarDate.month) + 1}/${
        props.calendarDate.day
      }`
    );
  } else if (props.type === "yearRange") {
    const yearArr = getRangeYear(date);
    return yearArr.every((year) => {
      fDate = new Date(
        `${year}/${parseInt(props.calendarDate.month) + 1}/${
          props.calendarDate.day
        }`
      );
      return (
        props.disabledDate(fDate) ||
        !isDateInRange(fDate, props.minDate, props.maxDate)
      );
    });
  }

  return (
    props.disabledDate(fDate) ||
    !isDateInRange(fDate, props.minDate, props.maxDate)
  );
};

const getRangeYear = (date) => {
  const yearStart = date.s;
  const yearEnd = date.e;
  const yearArr = [];

  for (let i = yearStart; i <= yearEnd; i++) {
    yearArr.push(i);
  }

  return yearArr;
};

// 监听手指开始滑动事件
const touchStart = (event) => {
  emit("touchstart", event);
};

// 监听手指开始滑动事件
const touchMove = (event) => {
  emit("touchmove", event);
};

// 监听手指开始滑动事件
const touchEnd = (event) => {
  emit("touchend", event);
};

watch(
  () => props.type,
  (val) => {
    disabledScrollDirec.value = props.disabledScroll;
    if (val === "month") {
      disabledScrollDirec.value = true;
      yearMonthShow = [language.MONTH, language.MONTH, language.MONTH];
    } else if (val === "year") {
      yearMonthShow = getThreeYearArr();
    } else if (val === "yearRange") {
      yearMonthShow = getThreeYearRangeArr();
    }
  }
);
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.year-body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;

  &-item {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.is_disabled {
      disabledBgColor(background-color);
      opacity: 1;
      cursor: not-allowed;
      disabledFontColor(color);
    }

    &-content {
      width: 60px;
      padding: 3px 0;
      border-radius: 3px;
      text-align: center;

      &.is_checked {
        mainColor(background);
        color: white;
      }

      &.is_not_current {
        disabledFontColor(color);
      }
    }
  }
}
</style>