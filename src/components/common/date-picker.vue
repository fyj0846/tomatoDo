<template>
  <div class="date-picker">
    <div class="pickerEntry">
      <!--<input id="datePicker" type="text" @click="openModal" v-model="selectedDate">-->
      <!--<label for="datePicker">计划完成日期</label>-->
      <div class="pickerLabel">计划完成日期</div>
      <div id="datePicker" tabindex="0" class="input" @click="openModal" v-model="selectedDate"> {{ selectedDate }}
      </div>
    </div>
    <div id='modal2' class="modal">
      <!--<div class="modal-header">-->
        <!--{{ title }}-->
      <!--</div>-->
      <div class="modal-date">
        <i class="material-icons" @click="moveToPreMonth()">chevron_left</i>
        <span>{{selectedDate}}</span>
        <i class="material-icons" @click="moveToNextMonth()">chevron_right</i>
      </div>
      <div class="modal-content">
        <div class="week-header">
          <ul class="day-view">
            <li v-for="header in weekNames_CN">{{ header }}</li>
          </ul>
        </div>
        <div class="week-content">
          <ul class="day-view">
            <li v-for="item in dateList"
                :class="{preMonth: item.preMonth, nextMonth: item.nextMonth} " @click="selectDate(item)">
              <div class="message" :class="{selected: selectedDay==item.day && item.currentMonth}">
                <span v-text="item.day"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect  btn-flat active" @click="setToday">Today</a>
        <a class="waves-effect  btn-flat active" @click="setWeekend">Weekend</a>
        <a class="waves-effect  btn-flat active" @click="closeModal">CLOSE</a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: [
      "title",
      "propDate"
    ],
    data () {
      return {
        showCancel: false,
        selectedYear: '',
        selectedMonth: '',
        selectedDay: '',
        weekNames_CN: ['周日', "周一", '周二', "周三", '周四', "周五", "周六"],
        weekNames_EN: ['SUN', "MON", "TUE", 'WED', "THU", "FRI", "SAT"]
      }
    },
    methods: {
      openModal () {
        $('#modal2').modal('open')
      },
      closeModal () {
        $('#modal2').modal('close')
      },

      // 返回指定年月的当月天数，month：1-12
      getMonthLength (year, month) {
        return new Date(year, month, 0).getDate()
      },

      // 将分钟数转换为两位
      transTo2Digits (value) {
        if (value != null && (value + "").length == 1) {
          return '0' + value;
        }
        else {
          return value;
        }
      },

      initDate() {
        var newDay = new Date()
        this.selectedDay = this.transTo2Digits(newDay.getDate())
        this.selectedMonth = this.transTo2Digits(newDay.getMonth() + 1)
        this.selectedYear = newDay.getFullYear()
      },

      // 月份跳转
      moveToNextMonth () {
        var tmp = this.selectedMonth - 0 + 1  //处理跨年问题
        if (tmp > 12) {
          this.selectedMonth = this.transTo2Digits(1)
          this.selectedYear++
        } else {
          this.selectedMonth = this.transTo2Digits(tmp)
        }
      },

      // 月份跳转
      moveToPreMonth () {
        var tmp = this.selectedMonth - 1  // 处理跨年问题
        if (tmp < 1) {
          this.selectedMonth = this.transTo2Digits(12)
          this.selectedYear--
        } else {
          this.selectedMonth = this.transTo2Digits(tmp)
        }
      },

      // 用户选择日期
      selectDate (item) {
        if (item.preMonth) {
          this.moveToPreMonth()
        }
        else if (item.nextMonth) {
          this.moveToNextMonth()
        }
        this.selectedDay = this.transTo2Digits(item.day)
      },

      // 设置目标日期为今天
      setToday () {
        var today = new Date()
        this.selectedDay = this.transTo2Digits(today.getDate())
        this.selectedMonth = this.transTo2Digits(today.getMonth() + 1)
        this.selectedYear = today.getFullYear()
      },

      // 设置目标日期为周末
      setWeekend () {
        var today = new Date()
        var dayInWeek = today.getDay()
        var weekend = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - dayInWeek));
        this.selectedDay = this.transTo2Digits(weekend.getDate())   //推至当前日所在的周六
        this.selectedMonth = this.transTo2Digits(weekend.getMonth() + 1)
        this.selectedYear = weekend.getFullYear()
      }
    },
    computed: {
      // 当前选择日期：yyyy-mm-dd
      // 设置初始化默认日期
      selectedDate() {
        return this.selectedYear + "-" + this.selectedMonth + "-" + this.selectedDay
      },
      // 月份视图渲染的日期列表
      dateList() {
        var list = []
        var today = new Date(this.selectedDate)  //根据最新选择的日期， 计算月视图日期列表
        var firstDayOffset = new Date(today.getFullYear(), today.getMonth(), 1).getDay()  //取本月第一天偏移日数
        var curMonthLength = this.getMonthLength(today.getFullYear(), today.getMonth() + 1)  //取本月天数, 1-12
        var preMonthLength = this.getMonthLength(today.getFullYear(), today.getMonth())  //取上月天数
        for (var i = 0; i < firstDayOffset; i++) {
          list[i] = {
            preMonth: true,
            currentMonth: false,
            nextMonth: false,
            day: preMonthLength - firstDayOffset + 1 + i,
          };  //补充上月末日期
        }
        for (var j = firstDayOffset; j < firstDayOffset + curMonthLength; j++) {
          list[j] = {
            preMonth: false,
            currentMonth: true,
            nextMonth: false,
            day: j - firstDayOffset + 1
          };  //补充本月日期
        }
        for (var k = firstDayOffset + curMonthLength; k < 42; k++) {
          list[k] = {
            preMonth: false,
            currentMonth: false,
            nextMonth: true,
            day: k - firstDayOffset - curMonthLength + 1
          }; //补充下月初日期
        }
        return list
      }
    },
    watch: {
      propDate (newValue) {
        console.log("date-picker: init date " + this.propDate);
        var newDay = new Date(newValue)
        this.selectedDay = this.transTo2Digits(newDay.getDate())
        this.selectedMonth = this.transTo2Digits(newDay.getMonth() + 1)
        this.selectedYear = newDay.getFullYear()
      },

      selectedDate(newValue) {
        this.$emit('updateSelectedDate', newValue)
      }
    },
    mounted () {
      $('select').material_select()
      $('.modal').modal()
      this.initDate()
    },
    beforeDestroy () {
    }
  }
</script>

<style scoped type="text/scss">
</style>
