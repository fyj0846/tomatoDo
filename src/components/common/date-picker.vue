<template>
  <div class="date-picker">
    <div class="input-field col s12">
      <input id="datePicker" type="text" @click="openModal" v-model="selectedDate">
      <label for="datePicker">计划完成日期</label>
    </div>
    <div id='modal2' class="modal">
      <div class="date-panel">
        <div class="panel-header">
          {{ title }}
        </div>
        <div class="panel-date">
          <i class="material-icons" @click="moveToPreMonth()">chevron_left</i>
          <span>{{selectedDate}}</span>
          <i class="material-icons" @click="moveToNextMonth()">chevron_right</i>
        </div>
        <div class="panel-content">
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
        <div class="panel-footer">
          <a class="waves-effect  btn-flat active" @click="setToday">Today</a>
          <a class="waves-effect  btn-flat active" @click="setWeekend">Weekend</a>
          <a class="waves-effect  btn-flat active" @click="closeModal">CLOSE</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: [
      "title"
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
        if(value != null  && (value + "").length == 1) {
          return '0' + value;
        }
        else {
          return value;
        }
      },

      // 月份跳转
      moveToNextMonth () {
        var tmp = this.selectedMonth - 0 + 1  //处理跨年问题
        if(tmp > 12) {
          this.selectedMonth = this.transTo2Digits(1)
          this.selectedYear++
        } else {
          this.selectedMonth = this.transTo2Digits(tmp)
        }
      },

      // 月份跳转
      moveToPreMonth () {
        var tmp = this.selectedMonth - 1  // 处理跨年问题
        if(tmp < 1) {
          this.selectedMonth = this.transTo2Digits(12)
          this.selectedYear--
        } else {
          this.selectedMonth = this.transTo2Digits(tmp)
        }
      },

      // 用户选择日期
      selectDate (item) {
        if(item.preMonth) {
          this.moveToPreMonth()
        }
        else if(item.nextMonth) {
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
        var weekend = new Date()
        var offset = weekend.getDay()
        this.selectedDay = this.transTo2Digits(weekend.getDate() + ( 6 - offset))   //推至当前日所在的周六
        this.selectedMonth = this.transTo2Digits(weekend.getMonth() + 1)
        this.selectedYear = weekend.getFullYear()
      }
    },
    computed: {
      // 当前选择日期：yyyy-mm-dd
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
      selectedDate(newValue) {
          this.$emit('updateSelectedDate', newValue)
      }
    },
    mounted () {
      $('select').material_select()
      $('.modal').modal()
      this.setToday()
    },
    beforeDestroy () {
    }
  }
</script>

<style scoped lang='less'>
  .date-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .panel-header {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1rem;
    background-color: #25776f;
  }

  .panel-date {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 100%;
    background-color: #2e9787;
    color: white;
    font-size: 1.6rem;
    padding: 8% 0;
  }

  .panel-date i {
    padding-top: 3px;
    margin: 0 15px;
  }

  .panel-content {
    background-color: white;
    width: 100%;
    padding: 2% 0 5%;
  }

  .week-header, .week-content {
    display: flex;
    justify-content: center;
  }

  .panel-content .day-view {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 90%;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .panel-content .week-header li {
    font-weight: bolder;
  }

  .panel-content .day-view li {
    flex: 0 0 14.2%;
    text-align: center;
    height: 34px;
    font-family: Roboto, sans-serif;
    line-height: 34px;
  }

  .panel-content .day-view li .message{
    height: 32px;
    margin: 1px 10.5px;
    border-radius: 100%;
  }

  .panel-content .day-view li .message:hover {
    background-color: #2e9787;
    opacity: 0.6;
    color: white;
    transition: all .65s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  .panel-content .day-view .preMonth, .panel-content .day-view .nextMonth {
    color: #ccc;
  }

  .panel-content .day-view .selected {
    background-color: #25776f;
    color: white;
  }

  .panel-footer {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  .panel-footer .active {
    color: #26a69a;
  }

  .Date-picker .modal {
    width: 298px;
  }
</style>