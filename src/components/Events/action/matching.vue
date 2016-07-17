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
      <div id="abnormal" class="eight wide column">
        <div class="ui cards">
          <div v-for="runner in filter_abnormal(EventData.member)" class="ui fluid card">
            <div class="content">
              <div class="right floated meta">
                <h3>{{runner.mem_age}}</h3>
              </div>
              <div class="header">{{runner.mem_name + '' + runner.mem_surname}}</div>
              <div class="description">
                <div class="ui two column relaxed grid">
                  <div class="column">
                    {{runner.mem_disabled_type ? runner.mem_disabled_type : 'ไม่มีรายละเอียด'}}<br/>
                  </div>
                  <div class="column">
                    {{'ไซด์เสื้อ ' + runner.detail_size }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="normal" class="eight wide column">
        <div class="ui cards">
          <div v-for="runner in filter_normal(EventData.member)" @click="popup_match" class="ui fluid card">
            <div class="content">
              <div class="right floated meta">
                <h3>{{runner.mem_age}}</h3>
              </div>
              <div class="header">{{runner.mem_name + '' + runner.mem_surname}}</div>
              <div class="description">
                {{'ไซด์เสื้อ ' + runner.detail_size }}
              </div>
            </div>
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
          Jamie vardy กับ Cristiano Ronaldo
        </div>
      </div>
      <div class="extra content">
        <div class="ui two buttons">
          <div @click="popup_match" class="ui basic green button">Approve</div>
          <div @click="popup_match" class="ui basic red button">Decline</div>
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
export default {
  data: function () {
    return {
    }
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent,
      ActivityData: state => state.activityData
    }
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
    filter_normal: (data) => {
      if (data instanceof Array) {
        return data.filter(item => {
          console.log('RETURN LIST OF NORMAL PEOPLE THAT NOT MATCH YET');
          return item.mem_type === 'normal' && item.detail_match === 'active'
        })
      } else {
        alert('Respone from server went wrong try to refresh');
        return []
      }
    },
    filter_abnormal: (data) => {
      if (data instanceof Array){
        return data.filter(item => {
          console.log('RETURN LIST OF NORMAL PEOPLE THAT NOT MATCH YET');
          return item.mem_type === 'disabled' && item.detail_match === 'active'
        })
      } else {
        alert('Respone from server went wrong try to refresh');
        return []
      }
    },
    popup_match: () => {
      $('#match_button')
      .transition('fly up')
    },
    modal: () => {
      $('.ui.modal.matching').modal('show')
    },
    close: () => {
      $('.ui.modal.matching').modal('show')
      console.log('close')
    },
    confirm_paid: (id) => {
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
    matching_detail: (id) => {
      $('.ui.modal.detail')
      .modal('show')
    }
  },
  components: {}
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
    width: 100%;
    left: 0px;
    z-index: 999;
  }
</style>
