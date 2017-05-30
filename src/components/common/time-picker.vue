<template>
  <div class="time-picker">
    <div class=" col s12">
      <!--<input id="timePicker" type="text" @click="openModal" v-model="value">-->
      <!--<label for="timePicker">计划完成时间</label>-->
      <div class="pickerLabel">计划完成时间</div>
      <div class="input" tabindex="1" id="timePicker"  @click="openModal"> {{ value }}</div>
    </div>
    <div id='modal1' class="modal">
      <div class="date-panel">
        <div class="panel-header">
          {{ title }}
        </div>
        <div class="panel-date">
          {{ date }}
        </div>
        <div class="panel-content">
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
        <div class="panel-footer">
          <a class="waves-effect  btn-flat active" @click="defaultInitTime">NOW</a>
          <a class="waves-effect  btn-flat" @click="clearTime">CLEAR</a>
          <a class="waves-effect  btn-flat active" @click="closeModal">CLOSE</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['title', 'date'],
    data () {
      return {
        showCancel: false,
        initTime: {},
        timeHour: 0,
        timeMinute: 0,
      }
    },
    methods: {
      // tools
      // 将数转换为两位
      transTo2Digits (value) {
        if(value != null  && (value + "").length == 1) {
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
      setTime (time) {
        if(time && time.indexOf(":") > -1) {
          this.timeHour = time.split(":")[0];
          this.timeMinute = time.split(":")[1];
        }
      },
      clearTime () {
        this.timeHour = '23';
        this.timeMinute = '59';
      },
      defaultInitTime () {
        // 初始化， 设置默认时钟
        this.initTime = new Date()
        this.timeHour = this.initTime.getHours()
        var tmp = this.initTime.getMinutes() + ''
        this.timeMinute = (tmp.length == 1 ? '0'+tmp : tmp)
      },
      handleHour (event) {
        var e = event.target.value.slice(0, 2)
        if(e < 0) {
          e = 0
        } else if( e > 23) {
          e = 23
        }
        this.timeHour = e
        event.target.value = e  // 不得不手动刷新dom元素
      },
      handleMinute (event) {
        var e = event.target.value.slice(0, 2)
        if(e < 0) {
          e = 0
        } else if( e > 59) {
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
      }
    },
    mounted () {
      $('select').material_select()
      $('.modal').modal()
      this.defaultInitTime()
    }
  }
</script>

<style scoped lang='less'>
  .time-picker{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pickerLabel {
    font-size: 0.8rem;
    left: 0.75rem;
    color: #9e9e9e;
  }

  .time-picker .input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    height: 3rem;
    line-height: 2.5rem;
    width: 100%;
  }

  /* 为了使div拥有onfous效果，需要给div增加"tabindex"属性并且赋值 */
  .time-picker .input:focus {
    outline: none;
    border-bottom:  2px solid #25776f;
  }

  .panel-header{
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
    padding: 10% 0;
  }
  .panel-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 100%;
    padding: 15% 0 20%;
  }
  .panel-content .time-picker-quick {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 0 0 25%;
  }

  .panel-content .time-picker-quick button {
    padding: 0px 8px;
    line-height: 28px;
    height: 28px;
    margin: 4px 0 4px 5px;
  }

  .panel-content .timeDivider {
    width: 1.5rem;
  }
  .panel-content .seperator {
    width: 2.5rem;
  }

  .time-picker-quick span {
    font-size: 0.7rem;
  }

  .panel-content div {
    font-size: 3rem;
    width: 4.9rem;
    color: black;
    text-align: center;
  }

  .panel-content input[type=number] {
    flex: 0 0 20%;
    font-size: inherit;
    text-align: center;
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
  .time-picker .modal {
    width: 298px;
  }
</style>