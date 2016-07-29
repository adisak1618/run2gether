<template>
  <div class="ui container">
    <div class="ui padded segment">
      {{event | json}}
    </div>
    <br/><br/>
      <div class="ui padded segment">
        <div class="header">
          <h1 style='text-align:center'>หัวข้อใหม่</h1>
        </div>
        <form class="ui form" action="" method="POST">
          <div class="field">
            <label>ชื่อกิจกรรม</label>
            <input v-model="event.event_name" type="text" name="event_name">
          </div>
          <div class="ui three column grid">
            <div class="column">
              <div class="field">
                <label>วันจัดกิจกรรม</label>
                <input v-model="event.event_date_start" type="date" name="event_date_start">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>เปิดรับสมัคร</label>
                <input v-model="event.event_date_open" type="date" name="event_date_open">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>ปิดรับสมัคร</label>
                <input v-model="event.event_date_close" type="date" name="event_date_close">
              </div>
            </div>
          </div>
          <div class="field">
            <label>สถานที่จัด</label>
            <textarea v-model="event.event_location" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 65px;" name="event_location"></textarea>
          </div>
          <div class="field">
            <label>ค่าสมัคร</label>
            <input v-model="event.event_price" type="text" name="event_price">
          </div>
          <div class="field">
            <div class="ui sub header">Multiple</div>
            <div class="ui fluid multiple search selection dropdown multidropdown">
              <input name="tags" type="hidden" v-model="event.event_distance" name="event_distance">
              <i class="dropdown icon"></i>
              <div class="default text">Skills</div>
              <div class="menu">
                <div class="item" data-value="1">1</div>
                <div class="item" data-value="2">2</div>
                <div class="item" data-value="3">3</div>
                <div class="item" data-value="4">4</div>
                <div class="item" data-value="5">5</div>
                <div class="item" data-value="6">6</div>
                <div class="item" data-value="7">7</div>
                <div class="item" data-value="8">8</div>
                <div class="item" data-value="9">9</div>
                <div class="item" data-value="10">10</div>
                <div class="item" data-value="11">11</div>
                <div class="item" data-value="12">12</div>
                <div class="item" data-value="13">13</div>
                <div class="item" data-value="14">14</div>
                <div class="item" data-value="15">15</div>
                <div class="item" data-value="16">16</div>
                <div class="item" data-value="17">17</div>
                <div class="item" data-value="18">18</div>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="ui sub header">Multiple</div>
            <div class="ui fluid multiple search selection dropdown multidropdown">
              <input name="event_optional" type="hidden" v-model="event.event_optional">
              <i class="dropdown icon"></i>
              <div class="default text">Skills</div>
              <div class="menu">
                <div class="item" data-value="กรุ๊ปเลือด">กรุ๊ปเลือด</div>
                <div class="item" data-value="จังหวัด">จังหวัด</div>
              </div>
            </div>
          </div>
          <div class="field">
            <label>จำนวนคนเข้าร่วม</label>
            <input v-model="event.event_size" type="text" name="event_size">
          </div>
          <button @click="addEvent(event)" class="green ui button right big">เพิ่ม</button>
          <div class="ui error message"></div>
        </form>
      </div>
  </div>
</template>
<script>
import * as actions from './../../actions/event'
export default {
  data () {
    return {
      event: {
        event_name:'',
        event_date_start: '',
        event_date_open: '',
        event_date_close: '',
        event_location: '',
        event_distance: '',
        event_optional: '',
        event_price: '',
        event_size: ''
      }
    }
  },
  ready () {
    // console.log(this.$route)
    //this.getCurrentEventDetail()

    $('.multidropdown')
    .dropdown({
      allowAdditions: true
    })

    $(".ui.form").form({
      onSuccess: function(event, fields) {
        event.preventDefault();
        if ($(".ui.form").form('is valid')) {
          alert('success')
        }
      }
    })

    $('.ui.form')
    .form(
      {
      on: 'blur',
      fields: {
        event_name: {
          identifier  : 'event_name',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุชื่อ'
            }
          ]
        },
        event_date_start: {
          identifier  : 'event_date_start',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดกำหนดวันเริ่ม'
            }
          ]
        },
        event_date_open: {
          identifier  : 'event_date_open',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุวัดเปิดรับสมัคร'
            }
          ]
        },
        event_date_close: {
          identifier  : 'event_date_close',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุวันปิดรับสมัคร'
            }
          ]
        },
        event_location: {
          identifier  : 'event_location',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุสถานที่จัดงาน'
            }
          ]
        },
        event_distance: {
          identifier  : 'event_distance',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุระยะทาง'
            }
          ]
        },
        event_price: {
          identifier  : 'event_price',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุค่าสมัคร'
            }
          ]
        },
        event_size: {
          identifier  : 'event_size',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุจำนวนคนร่วมงาน'
            }
          ]
        }
      }
    },
    {
      inline: true,
      onSuccess: function(event, fields) {
        alert('dasfdsfa')
        event.preventDefault()
        return false
      }
    }
  )
  },
  vuex: {
    getters: {
    },
    actions: actions
  }
}
</script>

</style>
