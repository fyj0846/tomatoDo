<template>
  <div class="time-picker">
    <div class="pickerEntry">
      <!--<input id="timePicker" type="text" @click="openModal" v-model="value">-->
      <!--<label for="timePicker">计划完成时间</label>-->
      <div class="pickerLabel">计划完成时间</div>
      <div class="input" tabindex="1" id="timePicker" @click="openModal"> {{ value }}</div>
    </div>
    <div id='modal1' class="modal">
      <!--<div class="date-modal">-->
      <!--<div class="modal-header">-->
        <!--{{ title }}-->
      <!--</div>-->
      <div class="modal-date">
        {{ propDate }}
      </div>
      <div class="modal-content">
        <div class="input-field">
          <input class="" type="number" placeholder="0" :value="timeHour" @input="handleHour($event)">
        </div>
        <div class="timeDivider">:</div>
        <div class="input-field">
          <input class="" type="number" placeholder="0" :value="timeMinute" @input="handleMinute($event)">
        </div>
        <div class="seperator"><i class="material-icons">swap_horiz</i></div>
        <div class="time-picker-quick">
          <span>快捷选择</span>
          <button class="btn " v-on:click.stop.prevent='setTime("11:30")'>午饭前</button>
          <button class="btn " v-on:click.stop.prevent='setTime("17:30")'>晚饭前</button>
          <button class="btn " v-on:click.stop.prevent='setTime("22:30")'>临睡前</button>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect  btn-flat active" @click="setNow">NOW</a>
        <a class="waves-effect  btn-flat" @click="clearTime">CLEAR</a>
        <a class="waves-effect  btn-flat active" @click="closeModal">CLOSE</a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['title', 'propDate', 'propTime'],
    data () {
      return {
        showCancel: false,
//        initTime: {},
        timeHour: -1,
        timeMinute: -1,
      }
    },
    methods: {
      // tools
      // 将数转换为两位
      transTo2Digits (value) {
        if (value != null && (value + "").length == 1) {
          return '0' + value;
        }
        else {
          return value;
        }
      },
      openModal () {
        $('#modal1').modal('open')
      },
      closeModal () {
        $('#modal1').modal('close')
      },

      initTime() {
        var today = new Date();
        this.timeHour = this.transTo2Digits(today.getHours())
        this.timeMinute = this.transTo2Digits(today.getMinutes())
      },

      setTime (time) {
        if (time && time.indexOf(":") > -1) {
          this.timeHour = time.split(":")[0];
          this.timeMinute = time.split(":")[1];
        }
      },
      clearTime () {
        this.timeHour = '23';
        this.timeMinute = '59';
      },
      setNow() {
        var initTime = new Date()
        this.timeHour = this.transTo2Digits(initTime.getHours())
        this.timeMinute = this.transTo2Digits(initTime.getMinutes())
      },
      handleHour (event) {
        var e = event.target.value.slice(0, 2)
        if (e < 0) {
          e = 0
        } else if (e > 23) {
          e = 23
        }
        this.timeHour = e
        event.target.value = e  // 不得不手动刷新dom元素
      },
      handleMinute (event) {
        var e = event.target.value.slice(0, 2)
        if (e < 0) {
          e = 0
        } else if (e > 59) {
          e = 59
        }
        this.timeMinute = e
        event.target.value = e  // 不得不刷新dom元素
      }
    },
    computed: {
      value() {
        return this.transTo2Digits(this.timeHour) + ":" + this.transTo2Digits(this.timeMinute)
      }
    },
    watch: {
      // 监视选择事件的变动，随意同步到父组件上
      value: function (newValue) {
        this.$emit('updateSelectedTime', newValue)
      },

      propTime (newValue) {
        // 初始化，
        // 设置默认时钟
        this.timeHour = this.transTo2Digits(newValue.split(":")[0])
        this.timeMinute = this.transTo2Digits(newValue.split(":")[1])
      },
    },
    mounted () {
      $('select').material_select()
      $('.modal').modal()
      this.initTime()
    }
  }
</script>

<style scoped type='text/scss'>
</style>