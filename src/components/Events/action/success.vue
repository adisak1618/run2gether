<template lang="html">
  <div v-if="[0,1,3].indexOf(ActivityData.curentTab) !== -1" class="ui segment">
    <table class="ui very basic celled table">
      <thead>
        <tr>
        <th class="ten wide">Name</th>
        <th class="two wide center aligned">สถานะการโอนเงิน</th>
        <th class="two wide center aligned">Age</th>
        <th class="two wide center aligned">action</th>
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
          <td class="center aligned">
            <h4 class="ui image header">
              <div class="content">
                <h4 v-if="Math.floor(Math.random()*10) > 5">เรียบร้อยแล้ว</h4>
                <button v-else @click="confirm_paid(1)" class="ui button">ยืนยัน</button>
              </div>
            </h4>
          </td>
          <td class="center aligned">
            {{runner.age}}
          </td>
          <td class="center aligned">
            <button v-if="Math.floor(Math.random()*10) > 5" @click="modal" class="ui inverted green button">จับคู่</button>
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
      EventData: state => state.data,
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
