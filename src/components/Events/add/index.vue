<template>
  <div class="ui container">
      <br/><br/>
      <div class="ui padded segment">
        <div class="header">
          <h1 style='text-align:center'>เพิ่มนักวิ่ง (สำหรับแอดมิน)</h1><br/>
        </div>
        <form class="ui form" action="" method="POST">
          <div class="ui three column grid">
            <div class="column">
              <div class="field">
                <label>เบอร์โทรศัพท์</label>
                <input v-model="regis.mem_tel" type="text" name="mem_tel">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>ชื่อ</label>
                <input v-model="regis.mem_name" type="text" name="mem_name">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>นามสกุล</label>
                <input v-model="regis.mem_surname" type="text" name="mem_surname">
              </div>
            </div>
          </div>
          <div class="ui three column grid">
            <div class="column">
              <div class="field">
                <label>ชื่อเล่น</label>
                <input v-model="regis.mem_nickname" type="text" name="mem_nickname">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>เลขบัตรประชาชน</label>
                <input v-model="regis.mem_id_num" type="text" name="mem_id_num">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>อีเมล</label>
                <input v-model="regis.mem_email" type="text" name="mem_email">
              </div>
            </div>
          </div>
          <div class="ui three column grid">
            <div class="column">
              <div class="field">
                <label>ประเพศความพิการ</label>
                <div class="ui selection dropdown">
                  <input v-model="regis.mem_disabled_type" type="hidden" name="mem_disabled_type" name="mem_surname">
                  <i class="dropdown icon"></i>
                  <div class="default text">Gender</div>
                  <div class="menu">
                    <div class="item" data-value="0">ปกติ</div>
                    <div class="item" data-value="1">พิการทางสายตา (ตาบอดสนิท)</div>
                    <div class="item" data-value="2">พิการทางสายตา (สายตาเลือนราง)</div>
                    <div class="item" data-value="3">พิการทางได้ยิน (หูหนวกสนิท)</div>
                    <div class="item" data-value="4">พิการทางการได้ยิน (หูตึง)</div>
                    <div class="item" data-value="5">พิการทางการเคลื่อนไหว (ไม่ได้นั่งรถวีลแชร์)</div>
                    <div class="item" data-value="6">พิการทางการเคลื่อนไหว (นั่งรถวีลแชร์)</div>
                    <div class="item" data-value="7">พิการทางการเรียนรู้</div>
                    <div class="item" data-value="8">พิการทางสติปัญญา</div>
                    <div class="item" data-value="9">พิการทางจิตใจหรือพฤติกรรม</div>
                    <div class="item" data-value="10">ออทิสติก</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>เพศ</label>
                <div class="ui selection dropdown">
                  <input v-model="regis.mem_gender" type="hidden" name="mem_gender" name="mem_surname">
                  <i class="dropdown icon"></i>
                  <div class="default text">Gender</div>
                  <div class="menu">
                    <div class="item" data-value="m">ชาย</div>
                    <div class="item" data-value="f">หญิง</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>อายุ</label>
                <input v-model="regis.mem_age" type="text" name="mem_age">
              </div>
            </div>
          </div>
          <br/>
          <div class="field">
            <label>รายละเอียด</label>
            <textarea v-model="regis.mem_discription" name="mem_discription" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 65px;"></textarea>
          </div>
          <div class="field">
            <label>สังกัด</label>
            <input v-model="regis.mem_department" type="text" name="mem_department">
          </div>
          <!-- <button @click="add_member($route.params.id, regis, addMember)" class="green ui button right big">เพิ่ม</button> -->
          <button class="ui teal button" type="submit">Submit</button>
          <div class="ui error message"></div>
        </form>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
</template>
<script>
import * as actions from './../../../actions/event'
export default {
  data () {
    return {
      regis: {
        mem_id_num: "",
        mem_name: "",
        mem_surname: "",
        mem_nickname: "",
        mem_gender: "m",
        mem_age: "0",
        mem_email: "",
        mem_tel: "",
        mem_date: "",
        mem_pic: "",
        mem_discription: "",
        mem_department: "",
        mem_type: "normal",
        mem_disabled_type: 0,
        event_id:0
      }
    }
  },
  vuex: {
    getters: {
    },
    actions: Object.assign({}, actions)
  },
  ready () {
    $('.dropdown')
    .dropdown({
      maxSelections: 11
    })
    //Validate form
    // $('.ui.form').api({
    //   beforeSend: function(settings) {
    //     return false;
    //   }
    // });
    // $route.params.id, regis, addMember
    // mem_id_num
    var that = this
    $(".ui.form").form({
      onSuccess: function(event, fields) {
        console.log(that.$route.params.id);
        event.preventDefault();
        if ($(".ui.form").form('is valid')) {

          that.add_member(that.$route.params.id, that.regis, that.addMember)
        }
      }
    })
    $('.ui.form')
    .form(
      {
      on: 'blur',
      fields: {
        mem_name: {
          identifier  : 'mem_name',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุชื่อ'
            }
          ]
        },
        mem_id_num: {
          identifier  : 'mem_id_num',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุบัตรประจำตัวประชาชน'
            }
          ]
        },
        mem_surname: {
          identifier  : 'mem_surname',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุนามสกุล'
            }
          ]
        },
        mem_nickname: {
          identifier  : 'mem_nickname',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุชื่อเล่น'
            }
          ]
        },
        mem_gender: {
          identifier  : 'mem_gender',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดเลือกเพศ'
            }
          ]
        },
        mem_age: {
          identifier  : 'mem_age',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุอายุ'
            }
          ]
        },
        mem_email: {
          identifier  : 'mem_email',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุอีเมล'
            }
          ]
        },
        mem_tel: {
          identifier  : 'mem_tel',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุเบอร์โทรศัพท์'
            }
          ]
        }
      }
    },
    {
      inline: true,
      onSuccess: function(event, fields) {

        event.preventDefault()
        return false
      }
    }
  )
    //Validate form
  },
  methods: {
    add_member: (eventid, regisdata, addMember) => {
      console.log(eventid)
      console.log(JSON.stringify(regisdata))
      var date = new Date()
      regisdata.mem_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      if (regisdata.mem_disabled_type === 0) {
        alert(0)
        regisdata.mem_type = 'normal'
      } else {
        regisdata.mem_type = 'disabled'
      }
      regisdata.event_id = eventid
      console.log('REGIS DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log(regisdata)
      addMember(regisdata)
    }
  }
}
</script>

</style>
