<template lang="html">
  <div class="ui segment">
    <div class="ui menu" >
      <div style="width:20%; text-align:center" class="ui dropdown item">
        <input v-model="filter.type" type="hidden" name="filter_normal">
        <div style="width:100%" class="">
          เรียงตาม <i style="margin-right:0px" class="dropdown icon"></i>
        </div>

        <div class="menu">
          <a class="item" data-value="0">อายุ</a>
          <a class="item" data-value="1">วันที่สมัคร</a>
          <a class="item" data-value="2">เพศ</a>
          <a class="item" data-value="3">ชื่อ</a>
        </div>
      </div>
      <div style="width:10%; text-align:center" class="ui item">
        <div class="ui fitted toggle checkbox">
          <input type="checkbox" v-model="filter.reverse">
          <label></label>
        </div>
      </div>
      <div class="item menu" style="width:70%">
        <div class="ui transparent icon input">
          <input type="text" placeholder="Search..." v-model="filter.text">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
    <table class="ui very basic celled table">
      <thead>
        <tr>
        <th class="ten wide">ชื่อ</th>
        <th class="two wide center aligned">สถานะการโอนเงิน</th>
        <th class="two wide center aligned">อายุ</th>
        <th class="two wide center aligned">สถานะการจับคู่</th>
      </tr></thead>
      <tbody>
        <tr v-for="runner in FilterData(EventData.member, 'all', filter.type, filter.reverse, filter.text, 'all')">
          <td>
            <h4 class="ui image header">
              <div class="content membername" @click="memberDetial(runner)">
                <h4>{{runner.mem_name + ' ' + runner.mem_surname}}</h4>
              </div>
            </h4>
          </td>
          <td class="center aligned">
            <h4 class="ui image header">
              <div class="content">
                <h4 v-if="runner.status_pay !== 'register'">เรียบร้อยแล้ว</h4>
                <button v-else @click="confirm_paid(1)" class="ui button">ยืนยัน</button>
              </div>
            </h4>
          </td>
          <td class="center aligned">
            {{runner.mem_age}}

          </td>
          <td class="center aligned">
            <button v-if="runner.detail_match !== 'active'" v-link="{ path: '/event/' + $route.params.id + '/match' }" class="ui inverted green button">จับคู่</button>
            <button v-else @click="matching_detail(runner.mem_id)" class="ui button">รายละเอียด</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Show Member Detail -->
  <div id="member_detial" class="ui modal">
    <i class="close icon"></i>
    <div class="header center">
      {{ member_detail.mem_name + " " + member_detail.mem_surname}}
    </div>
    <div class="content">
      <div class="ui grid">
        <div class="eight wide column">
          <p> <strong>ชื่อเล่น: </strong>{{ member_detail.mem_nickname }}</p>
          <p> <strong>อายุ: </strong>{{ member_detail.mem_age }}</p>
          <p> <strong>ไซด์เสื้อ: </strong>{{ member_detail.detail_size }}</p>
          <p> <strong>อีเมล: </strong>{{ member_detail.mem_email }}</p>
          <p> <strong>รายละเอียด: </strong>{{ member_detail.mem_discription }}</p>
        </div>
        <div class="eight wide column">
          <p> <strong>เบอร์: </strong>{{ member_detail.mem_tel }}</p>
          <p> <strong>ที่อยู่: </strong>{{ member_detail.mem_location }}</p>
          <p> <strong>สังกัด: </strong>{{ member_detail.mem_department }}</p>
          <p> <strong>เลขบัตรประชาชน: </strong>{{ member_detail.mem_id_num }}</p>
          <p> <strong>สถานะการจ่ายเงิน: </strong>{{ member_detail.status_pay }}</p>

        </div>
        <p v-if="member_detail.mem_type === 'normal' ? true : false"> <strong>ประเภท: </strong>ปรกติ</p>
        <p v-else> <strong>ประเภทความพิการ: </strong>{{ filter_disable(member_detail.mem_disabled_type) }}</p>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        ปิด
      </div>
      <div class="ui red right labeled icon button">
        ยกเลิกการจับคู่
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import * as sort from './../../../actions/sort'
export default {
  data: function () {
    return {
      member_detail: {},
      filter: {type: 0, reverse: false, text: ''}
    }
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent,
      ActivityData: state => state.activityData
    },
    actions: sort
  },
  computed: {},
  ready: function () {
    $('.dropdown')
    .dropdown({
      maxSelections: 3
    })
  },
  attached: function () {},
  methods: {
    filter_disable (data) {

      switch (Number(data)) {
        case 1:
          return 'พิการทางสายตา (ตาบอดสนิท)'
          break;
        case 2:
          return 'พิการทางสายตา (สายตาเลือนราง)'
          break;
        case 3:
          return 'พิการทางได้ยิน (หูหนวกสนิท)'
          break;
        case 4:
          return 'พิการทางการได้ยิน (หูตึง)'
          break;
        case 5:
          return 'พิการทางการเคลื่อนไหว (ไม่ได้นั่งรถวีลแชร์)'
          break;
        case 6:
          return 'พิการทางการเคลื่อนไหว (นั่งรถวีลแชร์)'
          break;
        case 7:
          return 'พิการทางการเรียนร'
          break;
        case 8:
          return 'พิการทางสติปัญญา'
          break;
        case 9:
          return 'พิการทางจิตใจหรือพฤติกรรม'
          break;
        case 10:
          return 'ออทิสติก'
          break;
        default:
          return 'ออทิสติก'
      }
    },
    memberDetial (runner) {
      this.member_detail = runner
      $('#member_detial').modal('show')
    },
    modal () {
      $('.ui.modal.matching').modal('show')
    },
    close () {
      $('.ui.modal.matching').modal('show')
      console.log('close')
    },
    confirm_paid (id) {
      $('.ui.basic.confirm_paid')
      .modal({
        closable  : false,
        onDeny    : function(){
          window.alert('Wait not yet!');
        },
        onApprove : function() {
          window.alert('Approved!');
        }
      })
      .modal('show')
    },
    matching_detail (id) {
      $('.ui.modal.detail')
      .modal('show')
    }
  },
  components: {}
}
</script>

<style lang="css">
  .membername:hover {
    cursor: pointer;
    color: rgb(15, 130, 187) !important;
  }
</style>
