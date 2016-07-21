<template lang="html">
  <div id="sticky" class="ui segment">
    <div id="match" class="ui grid">
      <div class="eight wide column">
        <div class="ui menu" >
          <div style="width:30%; text-align:center" class="ui dropdown item">
            <div style="width:100%" class="">
              เรียงตาม <i style="margin-right:0px" class="dropdown icon"></i>
            </div>

            <div class="menu">
              <a class="item">English</a>
              <a class="item">Russian</a>
              <a class="item">Spanish</a>
            </div>
          </div>
          <div class="item right menu" style="width:71%">
            <div class="ui transparent icon input">
              <input type="text" placeholder="Search...">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column">
        <div class="ui menu" >
          <div style="width:30%; text-align:center" class="ui dropdown item">
            <div style="width:100%" class="">
              เรียงตาม <i style="margin-right:0px" class="dropdown icon"></i>
            </div>

            <div class="menu">
              <a class="item">English</a>
              <a class="item">Russian</a>
              <a class="item">Spanish</a>
            </div>
          </div>
          <div class="item right menu" style="width:71%">
            <div class="ui transparent icon input">
              <input type="text" placeholder="Search...">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div id="abnormal" class="eight wide column clickable">
        <div class="ui cards">
          <div v-for="runner in filter_abnormal(EventData.member)" @click="match(runner)" class="ui fluid card">
            <item :data="runner"></item>
          </div>
        </div>
      </div>
      <div id="normal" class="eight wide column clickable">
        <div class="ui cards">
          <div v-for="runner in filter_normal(EventData.member)" @click="match(runner)" class="ui fluid card">
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

          <p v-for="item in Match_data">
            {{ item.mem_name + " " + item.mem_surname }}
          </p>
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
import Item from './match_item/item.vue'
import Normal_Item from './match_item/normal_item.vue'
export default {
  components: {
    'item': Item,
    'normal-item': Normal_Item
  },
  data: function () {
    return {
      popup: false,
      match_message: ""
    }
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent,
      ActivityData: state => state.activityData,
      Match_data: state => state.match
    },
    actions: action
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
  methods: {
    matching () {
      this.matcingRunner(this.$route.params.id)
    },
    match (runner) {
      this.appendMatch(runner)
      if (this.Match_data.length > 1) {
        console.log(this.popup)
        if (!this.popup) {
          this.popup_match()
        }
        this.popup = true
      } else {
        if (this.popup) {
          this.popup_match()
        }
        this.popup = false
      }
    },
    reset () {
      this.resetMatch()
      this.popup = false
      this.popup_match()
    },
    filter_normal (data) {
      if (data instanceof Array) {
        return data.filter(item => {
          console.log('RETURN LIST OF NORMAL PEOPLE THAT NOT MATCH YET');
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
