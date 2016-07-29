<template>
  <div class="ui container">
      <br/><br/>
      {{EventData.event_optional | json}}
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
                  <input v-model="regis.mem_gender" type="hidden" name="mem_gender">
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
          <div class="ui three column grid">
            <div class="column">
              <div class="field">
                <label>สังกัด</label>
                <input v-model="regis.mem_department" type="text" name="mem_department">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>ไซด์เสื้อ</label>
                <div class="ui selection dropdown">
                  <input v-model="regis.detail_size" type="hidden" name="detail_size">
                  <i class="dropdown icon"></i>
                  <div class="default text">ไซด์เสื้อ</div>
                  <div class="menu">
                    <div class="item" data-value="S">S</div>
                    <div class="item" data-value="M">M</div>
                    <div class="item" data-value="L">L</div>
                    <div class="item" data-value="XL">XL</div>
                    <div class="item" data-value="XXL">XXL</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>ราคา</label>
                <input v-model="regis.detail_price" type="text" name="detail_price">
              </div>
            </div>
          </div>
          <h3>ข้อมูลเพิ่มเติม</h3>
          <div class="field" v-for="item in optional_list">
            <label v-model="mem_discription[$index].title">{{item}} {{$index}}</label>
            <input type="hidden" value={{item}} v-model="regis.mem_discription[$index].title">
            <input type="text" name="optional" v-model="regis.mem_discription[$index].description">
          </div>
          <br/>
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
        mem_location: "60/5",
        mem_tel: "",
        mem_date: "",
        mem_pic: "",
        mem_discription: [],
        mem_department: "",
        mem_type: "normal",
        mem_disabled_type: 0,
        event_id:0,
        detail_size: "M",
        detail_price: 200
      },
      optional_list: [],
      optional_data: []
    }
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent
    },
    actions: Object.assign({}, actions)
  },
  watch: {
    'EventData': {
      handler: function (data, olddata) {
        if (this.EventData.data.event_optional) {
          this.optional_list = String(this.EventData.data.event_optional).split(",")
          console.log('SPRITE DATA')
          console.log(this.optional_list)
        }
      },
      deep: true
    }
  },
  ready () {
    console.log('ROUTE')
    console.log(this.$route)
    console.log(this.EventData.data.event_optional)
    this.getCurrentEventDetail(this.$route.params.id)

    console.log('show me')
    var that = this

    if (this.EventData.data.event_optional) {
      this.optional_list = String(this.EventData.data.event_optional).split(",")
      console.log('SPRITE DATA')
      console.log(String(this.EventData.data.event_optional).split(","))
    }

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

          that.add_member(that.$route, that.regis, that.addMember)
        }
      }
    })
    $('.ui.form')
    .form(
      {
      on: 'blur',
      fields: {
        optional: {
          identifier  : 'optional',
          rules: [
            {
              type   : 'empty',
              prompt : 'โปรดระบุข้อมูล'
            }
          ]
        },
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
        mem_id_num: {
          identifier  : 'mem_id_num',
          rules: [
            {
              type   : 'number',
              prompt : 'โปรดระบุบัตรประจำตัวประชาชนเป็นตัวเลข'
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
        mem_age: {
          identifier  : 'mem_age',
          rules: [
            {
              type   : 'number',
              prompt : 'โปรดระบุอายเป็นตัวเลขุ'
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
        mem_email: {
          identifier  : 'mem_email',
          rules: [
            {
              type   : 'email',
              prompt : 'โปรดระบุอีเมลให้ถูกต้อง'
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
    add_member (route, regisdata, addMember) {
      console.log(route.params.id)
      console.log(JSON.stringify(regisdata))
      var date = new Date()
      regisdata.mem_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      if (regisdata.mem_disabled_type === 0) {
        // alert(0)
        regisdata.mem_type = 'normal'
      } else {
        regisdata.mem_type = 'disabled'
      }
      regisdata.event_id = route.params.id
      regisdata.mem_discription = JSON.stringify(regisdata.mem_discription)

      console.log('REGIS DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      console.log(regisdata)
      addMember(regisdata, route)
      //this.regis.mem_discription = []
    }
  }
}
</script>

</style>
