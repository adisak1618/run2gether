<template lang="html">
  <div class="ui segment">
    <table class="ui very basic celled table">
      <thead>
        <tr>
        <th class="ten wide">Name</th>
        <th class="two wide center aligned">สถานะการโอนเงิน</th>
        <th class="two wide center aligned">Age</th>
        <th class="two wide center aligned">action</th>
      </tr></thead>
      <tbody>
        <tr v-for="runner in EventData.member">
          <td>
            <h4 class="ui image header">
              <div class="content">
                <h4>{{runner.mem_name + ' ' + runner.mem_surname}}</h4>
              </div>
            </h4>
          </td>
          <td class="center aligned">
            <h4 class="ui image header">
              <div class="content">
                <h4 v-if="runner.status_pay === 'register'">เรียบร้อยแล้ว</h4>
                <button v-else @click="confirm_paid(1)" class="ui button">ยืนยัน</button>
              </div>
            </h4>
          </td>
          <td class="center aligned">
            {{runner.mem_age}}
          </td>
          <td class="center aligned">
            <button v-if="runner.detail_match !== 'active'" @click="modal" class="ui inverted green button">จับคู่</button>
            <button v-else @click="matching_detail(1)" class="ui button">รายละเอียด</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
  ready: function () {},
  attached: function () {},
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
  },
  components: {}
}
</script>

<style lang="css">
</style>
