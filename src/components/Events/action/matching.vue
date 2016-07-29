<template lang="html">
  <div id="sticky" class="ui segment">
    <div id="match" class="ui grid">
      <div class="eight wide column">
        <div class="ui menu" >
          <div style="width:20%; text-align:center" class="ui dropdown item">
            <input v-model="filter.abnormal.type" type="hidden" name="filter_abnormal">
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
          <div style="width:15%; text-align:center" class="ui item">
            <div class="ui fitted toggle checkbox">
              <input type="checkbox" v-model="filter.abnormal.reverse">
              <label></label>
            </div>
          </div>
          <div class="item right menu" style="width:66%">
            <div class="ui transparent icon input">
              <input type="text" placeholder="Search..." v-model="filter.abnormal.text">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column">
        <div class="ui menu" >
          <div style="width:20%; text-align:center" class="ui dropdown item">
            <input v-model="filter.normal.type" type="hidden" name="filter_normal">
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
          <div style="width:15%; text-align:center" class="ui item">
            <div class="ui fitted toggle checkbox">
              <input type="checkbox" v-model="filter.normal.reverse">
              <label></label>
            </div>
          </div>
          <div class="item right menu" style="width:66%">
            <div class="ui transparent icon input">
              <input type="text" placeholder="Search..." v-model="filter.normal.text">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div id="abnormal" class="eight wide column clickable">
        <div class="ui cards">
          <div v-for="runner in FilterData(EventData.member, 'disabled', filter.abnormal.type, filter.abnormal.reverse, filter.abnormal.text, 'notMatch')" @click="match(runner)" class="ui fluid card">
            <item :data="runner"></item>
          </div>
        </div>
      </div>
      <div id="normal" class="eight wide column clickable">
        <div class="ui cards">
          <div v-for="runner in FilterData(EventData.member, 'normal', filter.normal.type, filter.normal.reverse, filter.normal.text, 'notMatch')" class="ui fluid card">
            <normal-item :data="runner"></normal-item>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="ui centered cards" style="display:none" id="match_button">
    <div class="card ">
      <div class="content">
        <div class="header center aligned">
          จับคู่เลย
        </div>
        <div class="description center aligned">

          <span v-for="item in Match_data">
            {{ item.mem_name + " " + item.mem_surname }}&nbsp;&nbsp;&nbsp;{{GT_two($index, Match_data.length)}}
          </span>
        </div>
      </div>
      <div class="extra content">
        <div class="ui two buttons">
          <div @click="matching" class="ui basic green button">Approve</div>
          <div @click="reset" class="ui basic red button">Decline</div>
        </div>
      </div>
    </div>
  </div>


  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
</template>

<script>
import * as action from './../../../actions/event'
import * as sort from './../../../actions/sort'
import Item from './match_item/item.vue'
import Normal_Item from './match_item/normal_item.vue'
export default {
  components: {
    'item': Item,
    'normal-item': Normal_Item
  },
  data () {
    return {
      popup: false,
      match_message: "",
      filter: {
        normal: {type: 0, reverse: false, text: ''},
        abnormal: {type: 0, reverse: false, text: ''}
      }
    }
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent,
      ActivityData: state => state.activityData,
      Match_data: state => state.match
    },
    actions: Object.assign({}, action, sort)
  },
  computed: {},
  ready: function () {
    $('.dropdown')
    .dropdown({
      maxSelections: 3
    })
  },
  attached: function () {
  },
  watch: {
    'Match_data': function (data, olddata) {
      if (data.length > 1) {
        if (this.popup === false) {
          this.popup_match()
        }
        this.popup = true

      } else {
        if (this.popup === true) {
          this.popup_match()
        }
        this.popup = false
      }
    }
  },
  methods: {
    GT_two (index, match_length) {
      return ((index + 1) < match_length) ? 'คู่กับ ': ''
    },
    matching () {
      this.matcingRunner(this.$route.params.id)
    },
    match (runner) {
    },
    reset () {
      this.resetMatch()
      this.popup = false
      this.popup_match()
    },
    filter_data (data, type, sort_type, invert, text) {
      let member_list = data
      let get_type = (type === 'disabled' ? 'disabled': 'normal')
      let sort_invert = invert === true ? -1 : 1
      switch (Number(sort_type)) {
        case 0 :
          member_list =  member_list.filter( item => {
            return item.mem_type == get_type && item.detail_match == 'unactive'
          }).sort(function(a, b){ return (Number(a.mem_age)-Number(b.mem_age))*sort_invert})
          break
        case 1 :
          member_list = member_list.filter( item => {
            return item.mem_type == get_type && item.detail_match == 'unactive'
          }).sort(function(a, b){

            return ((new Date(a.mem_date)).getTime()-(new Date(b.mem_date)).getTime())*-sort_invert
          })
          break
        case 2 :
          member_list = member_list.filter( item => {
            return item.mem_type == get_type && item.detail_match == 'unactive'
          }).sort(function(a, b){

            return (String(a.mem_gender).charCodeAt()-String(b.mem_gender).charCodeAt())*sort_invert
          })
          break
        default:

      }
      text = text.toLowerCase()
      if (text.length > 2) {
        member_list = member_list.filter(item => {

          return String(item.mem_nickname).toLowerCase().search(text) !== -1 ||
          String(item.mem_name).toLowerCase().search(text) !== -1 ||
          String(item.mem_surname).toLowerCase().search(text) !== -1 ||
          String(item.mem_email).toLowerCase().search(text) !== -1 ||
          String(item.mem_id_num).search(text) !== -1 ||
          String(item.mem_tel).search(text) !== -1
        })
      }
      return member_list
    },
    filter_normal (data) {
      if (data instanceof Array) {
        return data.filter(item => {

          return item.mem_type === 'normal' && item.detail_match !== 'active'
        })
      } else {
        alert('Respone from server went wrong try to refresh');
        return []
      }
    },
    filter_abnormal (data) {
      if (data instanceof Array){
        return data.filter(item => {
          console.log('RETURN LIST OF NORMAL PEOPLE THAT NOT MATCH YET');
          return item.mem_type === 'disabled' && item.detail_match !== 'active'
        })
      } else {
        alert('Respone from server went wrong try to refresh');
        return []
      }
    },
    popup_match () {
      $('#match_button')
      .transition('fly up')
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
  }
}
</script>

<style lang="css">
  #normal, #abnormal{
    height: 600px;
    overflow: auto;
  }

  #match_button{
    position: fixed;
    bottom: 10px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    z-index: 999;
  }
  .clickable {
    cursor: pointer;
  }
</style>
