<template>
  <div>
    <div class="ui container">
      <br/>
      <div class="ui menu">
        <div class="right menu">
          <div class="item">
            <a class="ui button positive" v-link="{ path: '/add' }">เพิ่มกิจกรรม</a>
          </div>
        </div>
      </div>
      <div class="ui three stackable doubling cards">
        <div v-for="item in Event" class="card">
          <div class="content">
            <div class="header">{{item.event_name}}</div>
            <div class="description">
              ระยะทาง
              <span v-for="distance in item.event_distance">
                {{distance}}
              </span>
            </div>
          </div>
          <a v-link="{ path: '/event/' + item.event_id }">
            <div class="ui bottom attached button">
              <i class="setting icon"></i>
              จัดการ
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as actions from './../../actions/event'
export default {
  ready () {
    this.getEvent()
  },
  vuex: {
    getters: {
      Event: state => state.Event
    },
    actions: actions
  }
}
</script>

</style>
