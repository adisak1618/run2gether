<template>
  <div id="detail" class="ui container">
    <br/>
<!-- DETAIL -->
    <div class="ui mobile equal center aligned stacked segment stackable width grid no_margin">
        <div class="eight wide computer column">
          <div id="event_data" class="ui no_margin">
            <h2 class="ui header flot_left no_margin">
              <i class="checked calendar icon"></i>
              <div class="content">
                {{EventData.event_name}}
              </div>

            </h2>
          </div>
        </div>
        <div class="doubling four wide computer column">
          <div class="ui horizontal statistic">
            <div class="value">
              {{EventData.member.length}}
            </div>
            <div class="label">
              จำนวนผู้สมัคร
            </div>
          </div>
        </div>
        <div class="doubling four wide computer column">
          <button v-link="{ path: '/event/' + $route.params.id + '/add'}" class="ui primary button">
            เพิ่มผู้สมัคร
          </button>
          <button class="ui green button">
            Export
          </button>
        </div>
    </div>
    <!-- STEP -->
    <div class="ui tablet mini stackable fluid steps">
      <div class="step" v-link="{ path: '/event/' + $route.params.id + '/member', activeClass: 'active'}">
        <i class="browser icon"></i>
        <div class="content">
          <div class="title">ทั้งหมด</div>
        </div>
      </div>
      <div class="step" v-link="{ path: '/event/' + $route.params.id + '/match', activeClass: 'active'}">
        <i class="users icon"></i>
        <div class="content">
          <div class="title">ยังไม่จับคู่</div>
        </div>
      </div>
      <div class="step" v-link="{ path: '/event/' + $route.params.id + '/payment', activeClass: 'active'}" v-bind:class="{ 'active': ActivityData.curentTab === 2 }">
        <i class="payment icon"></i>
        <div class="content">
          <div class="title">ยังไม่โอนเงิน</div>
        </div>
      </div>
      <div class="step" v-link="{ path: '/event/' + $route.params.id + '/success', activeClass: 'active'}">
        <i class="info icon"></i>
        <div class="content">
          <div class="title">เสร็จสมบูรณ์</div>
        </div>
      </div>
    </div>
    <!-- LIST -->

    <!-- Nested Route -->
    <!-- {{$route | json}} -->
    <router-view></router-view>

    <!-- Matching -->
    <div class="ui modal matching">
      <i class="close icon"></i>
      <div class="header">
        Modal Title
      </div>
      <div class="content">
        <table class="ui very basic celled table">
          <thead>
            <tr>
            <th class="twelve wide">Name</th>
            <th class="two wide">Age</th>
            <th class="two wide">action</th>
          </tr></thead>
          <tbody>
            <tr v-for="runner in EventData.abnormal_runner">
              <td>
                <h4 class="ui image header">
                  <div class="content">
                    <h4>{{runner.name}}</h4>
                  </div>
                </h4>
              </td>
              <td>
                {{runner.age}}
              </td>
              <td>
                <button @click="modal" class="ui inverted green button">จับคู่</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Detail -->
    <div class="ui modal detail ">
      <i class="close icon"></i>
      <div class="header center">
        รายละเอียด
      </div>
      <div class="content">
        <div class="ui grid">
          <div class="eight wide column">
            <h2>test</h2>
          </div>
          <div class="eight wide column">
            <h2>test</h2>
          </div>
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
    <!-- confirm_paid -->
    <div class="ui small basic confirm_paid modal ">
      <div class="ui icon header">
        <i class="archive icon"></i>
        Archive Old Messages
      </div>
      <div class="content">
        <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as actions from './../../actions/authen'
import * as event from './../../actions/event'
export default {
  data () {
    return {
      route: this.$route.path
    }
  },
  ready () {
    console.log('ROUTE DETAIL ')
    console.log(this.$route)
    this.getCurrentEventDetail(this.$route.params.id)
  },
  vuex: {
    getters: {
      EventData: state => state.CurentEvent,
      ActivityData: state => state.activityData
    },
    actions: Object.assign({}, actions, event)
  },
  methods: {
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
  }
}
</script>
<style>
.no_margin{
  margin: 0px !important;
  padding: 0px !important;
}
.flot_left{
  float: left;
  margin-right: 20px !important;
}
.flot_right{
  float: right;
  margin-right: 20px !important;
}
#event_data{
  overflow: hidden;
}
#event_data h2 .content{
  line-height: 40px;
}
body{
  background: #eee;
}
.runner_list p{
  line-height: 50px;
}
.runner_list h2{
  line-height: 50px;
}
.runner_list{
  overflow: hidden;
  height: 50px;
  background: #999;
}
.runner_list .runner_name{
  float: left;
}
.runner_list .runner_age{
  float: right;
}
.step{
  cursor: pointer;
}
#slip_list {
  margin: -10px;
  height: 500px;
  overflow: auto;
}
#slip_list > .item {
  padding: 10px 0px;
  cursor: pointer;
  margin: 0px !important;
  border-bottom: 1px #eee solid;
}
#slip_list > .item:hover {
  background: #eee;
}

#slip_list .content{
  padding: 0px 10px !important;
}

#slip_list .item.active {
  background: #eee;
}

</style>
