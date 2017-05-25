<template>
  <div class="time-picker">
    <div class="input-field col s12">
      <input id="timePicker" type="text" @click="openModal" v-model="value">
      <label for="timePicker">期待完成时间</label>
    </div>
    <div id='modal1' class="modal">
      <div class="date-panel">
        <div class="panel-header">
          选择截止时间
        </div>
        <div class="panel-date">
          2017-04-01
        </div>
        <div class="panel-content">
          <div class="input-field">
            <input class="" type="text" placeholder="00" v-model="timeHour">
          </div>
          <div class="timeDivider">:</div>
          <div class="input-field">
            <input class="" type="text" placeholder="00" v-model="timeMinute">
          </div>
          <div class="seperator"><i class="material-icons">swap_horiz</i></div>
          <div class="time-picker-quick">
            <span>快捷选择</span>
            <button class="btn " @click='setTime("11:30")'>午饭前</button>
            <button class="btn " @click="setTime('17:30')">晚饭前</button>
            <button class="btn " @click="setTime('22:30')">临睡前</button>
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
    data () {
      return {
        showCancel: false,
        initTime: {},
        timeHour: 0,
        timeMinute: 0,
      }
    },
    methods: {
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
      clear () {

      }
    },
    computed: {
      value() {
        return this.timeHour + ":" + this.timeMinute
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
    width: 4rem;
    color: black;
    text-align: center;
  }

  .panel-content input[type=text] {
    flex: 0 0 25%;
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